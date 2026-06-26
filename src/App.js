import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Services from "./Services.jsx";
import Blog from "./Blog.jsx";
import Essay from "./Essay.jsx";
import NotFound from "./NotFound.jsx";
import Service from "./Service.jsx";
import Contact from "./Contact.jsx";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/katielynch" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/essay" element={<Essay />} />
      <Route path="/services/:service" element={<Service />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  );
}

export default App;
