"use client";

import { useState } from 'react';
import HeaderHero from './HeaderHero';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useFirebaseSection } from './useFirebaseSection';
import { assetPath } from './sitePaths';

const truncateText = (text, maxLength = 300) => {
  text = String(text || "");
  if (text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");

  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + "...";
};

export default function Blog({ initialBlogs = [] }) {

  let BlogsData = [
    
  {
    title: "Loading",
    description: "Loading resource content...",
    date: "2026",
    image: '#empty',
    link: '#empty',
    readTime: 5,
    featured: true
  }

  ];

  BlogsData = useFirebaseSection("Blog", initialBlogs).items;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const filteredBlogs = [...BlogsData]
    .filter(b =>
      String(b.title || "").toLowerCase().includes(search.toLowerCase()) ||
      String(b.description || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "az":
          return String(a.title || "").localeCompare(String(b.title || ""));
        case "za":
          return String(b.title || "").localeCompare(String(a.title || ""));
        default:
          return 0;
      }
    });

  return (
    <div>

      <HeaderHero
        image={assetPath("/images/capturingLiteracy.png")}
        title={"Resources"}
        description={"Explore insights, strategies, and stories about literacy"}
        currentPageName={"Resources"}
      />

      {/* 🔍 SEARCH + FILTER */}
      <div className="essay-controls">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest → Oldest</option>
          <option value="oldest">Oldest → Newest</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      {/* 📰 BLOG LIST */}
      <div className="blog-grid">
  {filteredBlogs.map((blog, index) => (
    
    <div key={index} className="blog-card">
      
      {/* IMAGE BACKGROUND */}
      <div
        className="blog-card-image"
        id="weirdo"
        style={{
          backgroundColor: blog.color || "transparent",
          backgroundImage: blog.color
            ? "none"
            : `url("${blog.image}")`
        }}
      >
        

        {/* OVERLAY CONTENT */}
        <div className="blog-overlay" onDoubleClick={() => window.open(blog.file, "_blank")}>
          <h2 className="blog-title">
            <a
              href={blog.link}
              
              target="_blank"
              rel="noopener noreferrer"
            >
              {truncateText(blog.title, 90)}
            </a>
          </h2>
          <div className="blog-meta">
            <FontAwesomeIcon icon={faClock} /> {blog.readTime} Min Read
          </div>

         
          <p>{truncateText(blog.description, 280)}</p>

          
        </div>
       
      </div>
    </div>
  ))}
</div>

      <Footer />
    </div>
  );
}
