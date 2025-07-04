import React, { useEffect, useRef, useState } from "react";
import { listAll, getDownloadURL, ref as storageRef } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import "./ScrollPhoto.css";

function shuffleArray(array) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ScrollPhoto = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        // Change 'gallery' to your folder name in Firebase Storage
        const listRef = storageRef(storage, "blog_images");
        const res = await listAll(listRef);
        const urlPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
        let urls = await Promise.all(urlPromises);
        urls = shuffleArray(urls); // Randomize order
        setGalleryImages(urls);
      } catch (err) {
        setGalleryImages([]);
      }
      setLoading(false);
    };
    fetchImages();
  }, []);

  return (
    <div className="scroll-photo-gallery-section" style={{ backgroundColor: "#CCDCDB" }}>
      <h2 className="gallery-title" style={{
        textAlign: "center",
        marginBottom: "1.5rem",
        color: "#4CB572",
        fontWeight: 700,
        letterSpacing: "1px",
        fontSize: "2.2rem",
        textShadow: "0 2px 8px rgba(76,181,114,0.08)"
      }}>
        Photo Gallery
      </h2>
      <div className="scroll-photo-gallery" ref={scrollRef}>
        {loading ? (
          <div className="w-100 text-center py-5">
            <span className="spinner-border text-success" role="status" aria-hidden="true"></span>
            <div>Loading photos...</div>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="w-100 text-center py-5 text-muted">No photos found.</div>
        ) : (
          galleryImages.map((img, idx) => (
            <div className="scroll-photo-card" key={idx}>
              <img src={img} alt={`Gallery ${idx + 1}`} className="gallery-img" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScrollPhoto;
