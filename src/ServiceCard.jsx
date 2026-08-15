"use client";

import { useRouter } from "next/navigation";
import { scheduleScrollToPageTop } from "./RouteScrollReset";

export default function ServiceCard({ title, description, image, link, reverse, className = '', style = {} }) {
  const router = useRouter();

  return (
    <div
      className={`service-card ${reverse ? "reverse" : ""} ${className}`}
      style={style}
      onClick={() => {
        if (link) {
          scheduleScrollToPageTop();
          router.push(link, { scroll: true });
        }
      }}
    >
      <div className="service-image">
        {image && (
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className="service-content">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <span className="service-card-cta">View Details</span>
      </div>
    </div>
  );
}
