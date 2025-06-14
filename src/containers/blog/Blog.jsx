import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Article } from "../../components";
import {
  blog011, blog012, blog013, blog21, blog22, blog23, blog31, blog32, blog33, blog41, blog42, blog43, blog44,
  blogbg1, blogbg2, blogbg3, blogbg4, blogpsis11, blogpsis12, blogpsis13, blogpsis14, blogpsis15, blogpsis16, blogpsis17,
  blogrd11, blogrd12, blogrd13, blogrd14, blogrd15
} from "./imports";
import "./blog.css";


// Updated blogPosts: sections is an array of {images, text}
const blogPosts = [
  {
    date: "June 16, 2024",
    heading: "Stroke Awareness Program 1",
    sections: [
      {
        images: [blog011, blog012, blog013],
        text: "John Tilak Sarkar, General Secretary of the organization, discussed health awareness among the lay members of the Barisal Catholic Church. The program was organized by the Catholic Health Commission and supported by Sales. About 18 people attended the program, which was held on June 16, 2024"
      }
    ],
  },
  {
    date: "Sep 10, 2024",
    heading: "Stroke Awareness Program 2",
    sections: [
      {
        images: [blog21, blog22, blog23],
        text: "General Secretary John Tilak Sarkar, through the Catholic Church Health Commission, held a discussion on stroke awareness among its members. Medical personnel working in various hospitals in Barisal were present at the time. This program held September 2024"
      }
    ],
  },
  {
    date: "May 20 2025 ",
    heading: "Stroke Awareness Program 3",
    sections: [
      {
        images: [blog31, blog32, blog33],
        text: "In our monthly awareness program, we have arranged this program at 20 may 2025 with 20 young youth at SPRC, Barishal where we were shared how to prevent stroke and how can we can make a magical change in our society"
      }
    ],
  },
  {
    date: "May 26, 2025",
    heading: "Stroke Awareness Program 4",
    sections: [
      {
        images: [blog41, blog42, blog43, blog44],
        text: "For our monthly program on stroke prevention, our representatives organized an awareness session and distributed awareness leaflets at the Catholic Church. The event was attended by priests, sisters, nurses, volunteers, clerks and many others. The program was held on 26th May 2025."
      }
    ],
  },
  {
    date: "Mar 15, 2024",
    heading: "Program with Shomota Inclusive School",
    sections: [
      {
        images: [blogpsis11, blogpsis12, blogpsis13, blogpsis14],
        text: "Helping to poor and disable children those who studying in Shomoto Inclusive school is our regular project. With addition by the support of generation Bangladesh we were provide 85 gift boxes to those students. In this program there were present chair person Mery jonson, Mr Liton Da, Maneger, world vision, Bangladesh, John Tilock, General Secretary, Prantos Boddo,Founder, Somota inclusive school and other volunteers. This program was held march 2024."
      },
      {
        images: [blogpsis15, blogpsis16, blogpsis17],
        text: "We always want everyone to be well, to have a good time, so to spread the joy of Christmas 2024, Sales volunteers and Samata School teachers gifted new clothes to disabled and helpless children at Samata School. Samata's head doctor, Prants Baidya, was present at the time."
      }
    ],
  },
  {
    date: "Dec 15, 2024",
    heading: "Blood Grouping Camp",
    sections: [
      {
        images: [blogbg1, blogbg2, blogbg3, blogbg4],
        text: "In December 2024, about 85 disabled and poor children of Shomata School along with 25 of their parents, a total of 110 people, underwent blood group testing, with the support of BBDC, SPRC Barishal. The program was organized by Sales."
      }
    ],
  },
  {
    date: "Dec 15, 2024",
    heading: "Rehabilitation and Disability awareness program with SPRC, Barishal",
    sections: [
      {
        images: [blogrd11, blogrd12, blogrd13, blogrd14, blogrd15],
        text: "An awareness program about disability and Rehabilitation was arranged by Church of Bangladesh collaboration with Bangladesh, John Tilak Sarkar, Secretary, Sales Barisal, held a discussion on awareness and treatment among disabled patients. The event was attended by Father, members of World Vision and 25 disabled children and their parents were present. Under our rehabilitation program, this patient named Vijay Sarkar underwent physiotherapy treatment after brain tumor surgery at SPRC, Barishal. After receiving treatment for about 14 days, he is now able to work normally."
      }
    ],
  },
];

// ...existing imports and code...

const Blog = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);

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
  }, [currentIdx]);

  // Manual next/prev
  const handleNext = () => setCurrentIdx((prev) => (prev + 1) % blogPosts.length);
  const handlePrev = () => setCurrentIdx((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);

  return (
    <div className="sprc__blog section__padding" id="blog">
      <div className="sprc__blog-heading mb-4">
        <h1 className="gradient__text text-center" style={{ fontWeight: 700, fontSize: "2.2rem" }}>
          A lot is happening, We are blogging about it.
        </h1>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-2" style={{ gap: "1rem" }}>
        <button
          className="btn btn-outline-success btn-sm"
          onClick={handlePrev}
          aria-label="Previous Article"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          className="btn btn-outline-success btn-sm"
          onClick={handleNext}
          aria-label="Next Article"
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
        {blogPosts.map((post, idx) => (
          <div
            key={post.heading}
            className={`blog-article-card${currentIdx === idx ? " selected" : ""}`}
            style={{
              display: "inline-block",
              minWidth: 320,
              maxWidth: 370,
              width: "90vw",
              verticalAlign: "top",
              scrollSnapAlign: "center",
              border: currentIdx === idx ? "2px solid #4CB572" : "2px solid transparent",
              borderRadius: "1rem",
              transition: "border 0.2s, box-shadow 0.2s, transform 0.2s",
              background: "#fff",
              boxShadow: currentIdx === idx ? "0 4px 24px rgba(76,181,114,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
              transform: currentIdx === idx ? "scale(1.06)" : "scale(1)",
              zIndex: currentIdx === idx ? 2 : 1,
            }}
          >
            <Article
              imageUrl={post.sections[0].images[0]}
              date={post.date}
              title={post.heading}
              onReadMore={() =>
                navigate("/blogpost", {
                  state: {
                    heading: post.heading,
                    date: post.date,
                    sections: post.sections,
                  },
                })
              }
            />
          </div>
        ))}
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