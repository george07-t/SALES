import React from "react";
import "./article.css";

const Article = ({ imageUrl, date, title, onReadMore }) => {
  return (
    <div className="card h-100 bg-footer text-white border-0 shadow-sm">
      <div className="ratio ratio-16x9">
        <img src={imageUrl} alt="blog" className="card-img-top object-fit-cover rounded-top" />
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <p className="mb-2 fw-semibold small">{date}</p>
        <h3 className="card-title fs-5 fw-bold mb-4" style={{ cursor: "pointer" }}>{title}</h3>
        <p
          className="mt-auto mb-0 text-decoration-underline"
          style={{ cursor: "pointer" }}
          onClick={onReadMore}
        >
          Read Full Article
        </p>
      </div>
    </div>
  );
};

export default Article;