"use client";

import { useRouter } from "next/navigation";

export default function ServiceCard({ title, description, image, link, reverse, className = '', style = {} }) {
  const router = useRouter();

  return (
    <div
      className={`service-card ${reverse ? "reverse" : ""} ${className}`}
      style={style}
      onClick={() => {
        if (link) {
          router.push(link);
        }
      }}
    >
      <div className="service-image">
        {image && <img src={image} alt={title} />}
      </div>

      <div className="service-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
