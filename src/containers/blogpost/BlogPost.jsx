import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./blogpost.css";
import Footer from "../footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Helmet } from "react-helmet-async";
import { getDatabase, ref as dbRef, get } from "firebase/database";

// Helper: Split array into chunks
function chunkArray(arr, chunkSize) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

// Helper: Split text into sentences (handles English punctuation)
function splitTextIntoSentences(text) {
  if (!text) return [];
  // Split on . ! ? followed by space or end of string, but keep the punctuation
  return text
    .replace(/\r\n|\r|\n/g, " ") // Remove line breaks
    .split(/(?<=[.?!])\s+(?=[A-Z])/)
    .map(s => s.trim())
    .filter(Boolean);
}

const BlogPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    const fetchPost = async () => {
      setLoading(true);
      try {
        const db = getDatabase();
        const postRef = dbRef(db, `blogs/${postId}`);
        const snapshot = await get(postRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
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

  // Meta description
  const metaDescription =
    post.sections && post.sections.length > 0 && post.sections[0].text
      ? post.sections[0].text.substring(0, 150) +
        (post.sections[0].text.length > 150 ? "..." : "")
      : "Read the latest blog post from SALES – Social Advancement for Livelihood and Educational Support.";

  // Main rendering
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

        {post.sections.map((section, idx) => {
          // Split images and sentences into chunks
          const images = Array.isArray(section.images) ? section.images : [];
          const sentences = splitTextIntoSentences(section.text);

          const imageChunks = chunkArray(images, 3);
          const sentenceChunks = chunkArray(sentences, 5);

          // The number of rows to render is the max of imageChunks and sentenceChunks
          const rows = Math.max(imageChunks.length, sentenceChunks.length);

          return (
            <div key={idx} className="mb-4">
              {[...Array(rows)].map((_, rowIdx) => (
                <div key={rowIdx} className="mb-3">
                  {/* Images row */}
                  {imageChunks[rowIdx] && imageChunks[rowIdx].length > 0 && (
                    <div className="d-flex flex-row flex-nowrap overflow-auto gap-3 mb-2">
                      {imageChunks[rowIdx].map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`${post.title} section ${idx + 1} image ${rowIdx * 3 + i + 1}`}
                          className="img-fluid blogpost-image shadow"
                          style={{ maxWidth: 300, height: "auto" }}
                        />
                      ))}
                    </div>
                  )}
                  {/* Text chunk */}
                  {sentenceChunks[rowIdx] && sentenceChunks[rowIdx].length > 0 && (
                    <div className="fs-5 mb-2" style={{ whiteSpace: "pre-line" }}>
                      {sentenceChunks[rowIdx].join(" ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;
