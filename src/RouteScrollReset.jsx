"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function scheduleScrollToPageTop() {
  scrollToPageTop();
  window.requestAnimationFrame(scrollToPageTop);
  window.setTimeout(scrollToPageTop, 0);
  window.setTimeout(scrollToPageTop, 80);
  window.setTimeout(scrollToPageTop, 180);
}

export default function RouteScrollReset() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest?.("a[href]");
      if (!link) return;

      const target = link.getAttribute("target");
      const download = link.getAttribute("download");
      if (target && target !== "_self") return;
      if (download !== null) return;

      const nextUrl = new URL(link.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;
      if (nextUrl.hash) return;

      scheduleScrollToPageTop();
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    scheduleScrollToPageTop();
  }, [pathname]);

  return null;
}
