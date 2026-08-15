import { getFirebaseSection } from "../src/firebaseData";
import { absoluteUrl, getPageSeo, seoConfig } from "../src/seo";
import { servicePath } from "../src/routes";

export const dynamic = "force-static";

const staticPageKeys = ["home", "about", "services", "blog", "essay", "contact"];

function validLastModified(value, fallback) {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : value;
}

function sitemapImage(image) {
  const fallback = absoluteUrl(seoConfig.defaultImage);
  if (!image) return fallback;

  const url = absoluteUrl(image);
  const hostname = new URL(url).hostname;
  const trustedHostname =
    hostname === new URL(seoConfig.siteUrl).hostname ||
    hostname === "firebasestorage.googleapis.com" ||
    hostname === "storage.googleapis.com";

  return (trustedHostname ? url : fallback).replace(/&/g, "&amp;");
}

export default async function sitemap() {
  const contentLastModified = seoConfig.contentLastModified;
  const staticRoutes = staticPageKeys.map((key) => {
    const page = getPageSeo(key);

    return {
      url: absoluteUrl(page.path || "/"),
      lastModified: page.lastModified || contentLastModified,
      changeFrequency: key === "home" ? "weekly" : "monthly",
      priority: key === "home" ? 1 : 0.8,
      images: [sitemapImage(page.image)],
    };
  });

  const services = await getFirebaseSection("Services");
  const serviceRoutes = services.map((service) => ({
    url: absoluteUrl(servicePath(service)),
    lastModified: validLastModified(
      service.updatedAt || service.lastModified || service.date,
      contentLastModified
    ),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [sitemapImage(service.image)],
  }));

  return [...staticRoutes, ...serviceRoutes];
}
