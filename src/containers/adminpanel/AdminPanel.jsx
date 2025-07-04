import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../footer/Footer";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [blog, setBlog] = useState({
    title: "",
    date: "",
    text: "",
    images: []
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");

  // Handle login
  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setLoginError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, login.username, login.password);
      setIsAuthenticated(true);
      setLoginError("");
    } catch (error) {
      setLoginError("Invalid email or password");
    }
  };

  // Handle blog form
  const handleBlogChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setBlog({ ...blog, images: files });
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle blog upload (structured: title, date, text, images[])
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadSuccess("");
    setUploadError("");

    try {
      // 1. Upload all images to Firebase Storage and collect their URLs
      const imageUrls = [];
      for (const file of blog.images) {
        const storageRef = ref(
          storage,
          `blog_images/${blog.date}_${Date.now()}_${file.name}`
        );
        await uploadBytesResumable(storageRef, file);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }

      // 2. Structure the blog post object
      const blogData = {
        title: blog.title,
        date: blog.date,
        text: blog.text,
        images: imageUrls,
        createdAt: new Date().toISOString()
      };

      // 3. Push the blog post to Realtime Database under "blogs"
      const db = getDatabase();
      const blogRef = dbRef(db, "blogs");
      await push(blogRef, blogData);

      setUploadSuccess("Blog post uploaded successfully!");
      setBlog({ title: "", date: "", text: "", images: [] });
      setImagePreviews([]);
    } catch (err) {
      setUploadError("Failed to upload blog post. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Prevent entering the admin page without login
  if (!isAuthenticated) {
    return (
      <div className="admin-login-modal d-flex align-items-center justify-content-center vh-100 bg-light position-fixed top-0 start-0 w-100" style={{ zIndex: 1050 }}>
        <form className="admin-login-form card shadow p-4" style={{ minWidth: 320, maxWidth: 380 }} onSubmit={handleLoginSubmit}>
          <h2 className="mb-3 text-center">Admin Login</h2>
          <div className="mb-3">
            <input
              type="email"
              name="username"
              className="form-control"
              placeholder="Email"
              value={login.username}
              onChange={handleLoginChange}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={login.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          {loginError && <div className="alert alert-danger py-1 mb-2">{loginError}</div>}
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="admin-panel container py-5">
        <h2 className="mb-4">Blog Uploader</h2>
        <form className="admin-blog-form card shadow p-4 mx-auto" style={{ maxWidth: 600 }} onSubmit={handleBlogSubmit}>
          <div className="mb-3">
            <label className="form-label">Section Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={blog.title}
              onChange={handleBlogChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={blog.date}
              onChange={handleBlogChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Text</label>
            <textarea
              className="form-control"
              name="text"
              rows={5}
              value={blog.text}
              onChange={handleBlogChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Images</label>
            <input
              type="file"
              className="form-control"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            {imagePreviews.length > 0 && (
              <div className="image-preview-list mt-3 d-flex gap-2 flex-wrap">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="img-thumbnail"
                    style={{ maxWidth: 120, maxHeight: 120 }}
                  />
                ))}
              </div>
            )}
          </div>
          {uploadSuccess && <div className="alert alert-success">{uploadSuccess}</div>}
          {uploadError && <div className="alert alert-danger">{uploadError}</div>}
          <button type="submit" className="btn btn-success mt-2 w-100" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;