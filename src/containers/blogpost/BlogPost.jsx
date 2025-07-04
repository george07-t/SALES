import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./blogpost.css";
import Footer from "../footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Helmet } from "react-helmet-async";
import { getDatabase, ref as dbRef, get } from "firebase/database";

const BlogPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Try to get postId from location.state or URL param
  const { postId: paramPostId } = useParams();
  const postId = location.state?.postId || paramPostId;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!postId) {
      navigate("/#blog", { replace: true });
      return;
    }
    // Fetch the blog post from Firebase
    const fetchPost = async () => {
      setLoading(true);
      try {
        const db = getDatabase();
        const postRef = dbRef(db, `blogs/${postId}`);
        const snapshot = await get(postRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Ensure sections structure for backward compatibility
          setPost({
            ...data,
            sections: data.sections
              ? data.sections
              : [
                  {
                    images: data.images || [],
                    text: data.text || "",
                  },
                ],
          });
        } else {
          setPost(null);
        }
      } catch {
        setPost(null);
      }
      setLoading(false);
    };
    fetchPost();
  }, [postId, navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-success" role="status"></div>
          <div>Loading article...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="alert alert-danger">
            Blog post not found.
            <button className="btn btn-link" onClick={() => navigate("/#blog")}>
              Go back to blog
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Generate a meta description from the first section or a default
  const metaDescription =
    post.sections && post.sections.length > 0 && post.sections[0].text
      ? post.sections[0].text.substring(0, 150) +
        (post.sections[0].text.length > 150 ? "..." : "")
      : "Read the latest blog post from SALES – Social Advancement for Livelihood and Educational Support.";

  return (
    <>
      <Helmet>
        <title>{post.title} | SALES Blog</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content="SALES, Blog, Updates, Stories, Nonprofit, Bangladesh, Social Advancement, Livelihood, Educational Support"
        />
        <meta property="og:title" content={post.title + " | SALES Blog"} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <Navbar />
      <div className="blogpost-container py-5" style={{ marginTop: "90px" }}>
        <button
          className="btn btn-outline-success mb-4"
          onClick={() => navigate(-1)}
        >
          &larr; Back to Blog
        </button>
        <h1 className="gradient__text mb-2">{post.title}</h1>
        {post.date && <p className="text-muted mb-4">{post.date}</p>}
        {post.sections.map((section, idx) => (
          <div key={idx} className="mb-4">
            {section.images && section.images.length > 0 && (
              <div className="d-flex flex-row flex-nowrap overflow-auto gap-3 mb-3">
                {section.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={post.title + " " + (idx + 1) + " image " + (i + 1)}
                    className="img-fluid blogpost-image shadow"
                    style={{ maxWidth: 300, height: "auto" }}
                  />
                ))}
              </div>
            )}
            {section.text && (
              <div className="fs-5" style={{ whiteSpace: "pre-line" }}>
                {section.text}
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;