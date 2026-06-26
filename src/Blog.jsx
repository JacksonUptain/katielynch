import { useState } from 'react';
import './App.css';
import HeaderHero from './HeaderHero';
import capturingLiteracy from './capturingLiteracy.png';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useFirebaseSection } from './useFirebaseSection';

const truncateText = (text, maxLength = 300) => {
  if (text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");

  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + "...";
};

export default function Blog() {

  let BlogsData = [
    
  {
    title: "Loading",
    description: "Loading blog content...",
    date: "2026",
    image: '#empty',
    link: '#empty',
    readTime: 5,
    featured: true
  }

  ];

  BlogsData = useFirebaseSection("Blog").items;
  console.log("Raw blogs data from Firebase:", BlogsData);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const filteredBlogs = [...BlogsData]
    .filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div>

      <HeaderHero
        image={capturingLiteracy}
        title={"Blog"}
        description={"Explore insights, strategies, and stories about literacy"}
        currentPageName={"Blog"}
      />

      {/* 🔍 SEARCH + FILTER */}
      <div className="essay-controls">
        <input
          type="text"
          placeholder="Search blog posts..."
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