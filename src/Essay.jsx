"use client";

import { useState } from 'react';
import HeaderHero from './HeaderHero';
import Footer from './Footer';
import { useFirebaseSection } from './useFirebaseSection';
import { assetPath } from './sitePaths';



export default function Essay({ initialEssays = [] }) {
  

const essaysData = useFirebaseSection("Essays", initialEssays).items || [];

const featuredEssay = essaysData.find(e => e.featured) || {
  title: "Loading",
  description: "Loading...",
  preview: "",
  file: "#",
  date: "",
};

const otherEssays = essaysData.filter(e => !e.featured);

  




  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");




  const filteredEssays = [...otherEssays]
  .filter(e =>
    String(e.title || "").toLowerCase().includes(search.toLowerCase()) ||
    String(e.description || "").toLowerCase().includes(search.toLowerCase())
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
        title={"Student Showcase"}
        description={"Explore featured student writing and recent highlights"}
        currentPageName={"Student Showcase"}
      />

      
      <section className="essay-hero">
        <div className="essay-preview">
          <a
            href={featuredEssay.file}
            target="_blank"
            rel="noopener noreferrer"
            className="preview-link"
          >
            <div className="preview-text">
              {featuredEssay.preview}
            </div>

            <div className="preview-overlay">
              <span>View Student Work</span>
            </div>
          </a>
        </div>

        <div className="essay-info">
          <h2>{featuredEssay.title}</h2>
          <p>{featuredEssay.description}</p>
        </div>
      </section>

      {/* 🔍 SEARCH + FILTER */}
      <div className="essay-controls">
        <input
          type="text"
          placeholder="Search student work..."
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

      
      <div className="essay-container">
       
        {filteredEssays.map((essay, index) => (
          
          <a
            key={index}
            href={essay.file}
            target="_blank"
            rel="noopener noreferrer"
            className="essay-card-link"
          >
            
            <div className="essay-card">
              <div className="essay-title">{essay.title}</div>
              <div className="essay-date">{essay.date}</div>

              <p className="essay-preview-text">
                {essay.preview}
              </p>

              <div className="essay-hover">
                View Student Work
              </div>
            </div>
          </a>
        ))}
      </div>

      <Footer />

    </div>
  );
}
