import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import "./blog.css";

const Blog = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Fetch blog posts from Firebase Realtime Database
  useEffect(() => {
    const db = getDatabase();
    const blogRef = dbRef(db, "blogs");
    const unsubscribe = onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Use Object.entries to get key and post
        const posts = Object.entries(data)
          .map(([key, post]) => ({
            ...post,
            key, // Save the Firebase key
            // For backward compatibility: wrap images/text in sections if not present
            sections: post.sections
              ? post.sections
              : [
                {
                  images: post.images || [],
                  text: post.text || "",
                },
              ],
          }))
          .sort((a, b) => (a.key < b.key ? 1 : -1));
        setBlogPosts(posts);
      } else {
        setBlogPosts([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Always scroll to the top of the page when this component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Smooth scroll to the current article using scrollLeft animation
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const cards = container.querySelectorAll(".blog-article-card");
      const card = cards[currentIdx];
      if (card) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const scrollLeft =
          card.offsetLeft -
          container.offsetLeft -
          containerRect.width / 2 +
          cardRect.width / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [currentIdx, blogPosts.length]);

  // Manual next/prev
  const handleNext = () =>
    setCurrentIdx((prev) => (blogPosts.length ? (prev + 1) % blogPosts.length : 0));
  const handlePrev = () =>
    setCurrentIdx((prev) =>
      blogPosts.length ? (prev - 1 + blogPosts.length) % blogPosts.length : 0
    );

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Extract excerpt from text
  const getExcerpt = (text, maxLength = 120) => {
    if (!text) return "";
    const cleanText = text.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags
    return cleanText.length > maxLength 
      ? cleanText.substring(0, maxLength) + "..."
      : cleanText;
  };

  return (
    <div className="sprc__blog section__padding" id="blog">
      <div className="sprc__blog-heading mb-4">
        <h1
          className="gradient__text text-center"
          style={{ fontWeight: 700, fontSize: "2.2rem" }}
        >
          A lot is happening, We are blogging about it.
        </h1>
      </div>
      
      <div className="d-flex justify-content-center align-items-center mb-4" style={{ gap: "1rem" }}>
        <button
          className="blog-nav-button"
          onClick={handlePrev}
          aria-label="Previous Article"
          disabled={blogPosts.length === 0}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          className="blog-nav-button"
          onClick={handleNext}
          aria-label="Next Article"
          disabled={blogPosts.length === 0}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div
        className="sprc__blog-container"
        ref={scrollRef}
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
          gap: "2rem",
          paddingBottom: "1rem",
          scrollSnapType: "x mandatory",
        }}
      >
        {blogPosts.length === 0 ? (
          <div className="text-center w-100 py-5 text-muted">
            <div className="mb-3" style={{ fontSize: "3rem" }}>📝</div>
            <h3 className="h4 mb-2">No blog posts found.</h3>
            <p className="mb-0">Check back later for exciting updates!</p>
          </div>
        ) : (
          blogPosts.map((post, idx) => (
            <div
              key={post.key}
              className={`blog-article-card${currentIdx === idx ? " selected" : ""}`}
              onClick={() => navigate(`/blogpost/${post.key}`)}
              style={{
                minWidth: "280px",
                maxWidth: "370px",
                width: "90vw",
                height: "450px"
              }}
            >
              <div className="blog-card-content h-100">
                {/* Image Section */}
                <div 
                  className="blog-card-image"
                  style={{ height: "200px" }}
                >
                  {post.sections[0]?.images && post.sections[0].images.length > 0 ? (
                    <img
                      src={post.sections[0].images[0]}
                      alt={post.title || post.heading || "Blog post"}
                      className="img-fluid w-100 h-100"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="blog-card-image-placeholder d-flex align-items-center justify-content-center w-100 h-100"
                    style={{ 
                      display: post.sections[0]?.images && post.sections[0].images.length > 0 ? 'none' : 'flex'
                    }}
                  >
                    <i className="bi bi-newspaper" style={{ fontSize: "2rem" }}></i>
                  </div>
                </div>

                {/* Text Content */}
                <div className="blog-card-text p-3 p-md-4">
                  <div>
                    <div className="blog-card-date small text-muted fw-medium mb-2">
                      {formatDate(post.date)}
                    </div>
                    <h3 className="blog-card-title h5 fw-semibold mb-3 lh-sm">
                      {post.title || post.heading || "Untitled Post"}
                    </h3>
                    <p className="blog-card-excerpt text-muted mb-3 lh-base">
                      {getExcerpt(post.sections[0]?.text || post.text)}
                    </p>
                  </div>
                  <button 
                    className="blog-card-button btn btn-sm fw-semibold text-uppercase"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/blogpost/${post.key}`);
                    }}
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="text-center mt-4" style={{ color: "#888" }}>
        <span style={{ fontSize: "1rem" }}>
          <i className="bi bi-arrow-left-right"></i> Scroll horizontally or use the arrows to explore more stories!
        </span>
      </div>
    </div>
  );
};

export default Blog;