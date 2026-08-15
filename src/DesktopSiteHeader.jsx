"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pagePaths } from "./routes";
import { assetPath } from "./sitePaths";

const navigationItems = [
  { label: "Home", href: pagePaths.home },
  { label: "About", href: pagePaths.about },
  { label: "Educational Services", href: pagePaths.services },
  { label: "Resources", href: pagePaths.blog },
  { label: "Student Showcase", href: pagePaths.essay },
];

function isCurrentPath(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DesktopSiteHeader({ revealOnScroll = false }) {
  const pathname = usePathname() || "/";
  const [visible, setVisible] = useState(!revealOnScroll);
  const contactActive = isCurrentPath(pathname, pagePaths.contact);

  useEffect(() => {
    if (!revealOnScroll) {
      setVisible(true);
      return undefined;
    }

    const handleScroll = () => setVisible(window.scrollY > 96);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [revealOnScroll]);

  return (
    <header
      className={`desktop-site-header ${visible ? "is-visible" : "is-hidden"}`}
      aria-label="Primary site header"
      aria-hidden={!visible}
    >
      <div className="desktop-site-header-inner">
        <Link href={pagePaths.home} className="desktop-site-brand" aria-label="Capturing Literacy home">
          <picture>
            <source srcSet={assetPath("/images/capturingLiteracy.avif")} type="image/avif" />
            <img
              src={assetPath("/images/capturingLiteracy.png")}
              alt=""
              width={54}
              height={54}
              decoding="async"
            />
          </picture>
          <span className="desktop-site-brand-copy">
            <strong>Capturing Literacy</strong>
            <small>Katie Lynch, CALT</small>
          </span>
        </Link>

        <nav className="desktop-site-nav" aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const active = isCurrentPath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={pagePaths.contact}
          className={`desktop-site-contact ${contactActive ? "is-active" : ""}`.trim()}
          aria-current={contactActive ? "page" : undefined}
        >
          Contact Katie
        </Link>
      </div>
    </header>
  );
}
