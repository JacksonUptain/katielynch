import { getFirebaseSection } from "../src/firebaseData";
import { absoluteUrl, getPageSeo } from "../src/seo";
import { servicePath } from "../src/routes";

const staticPageKeys = ["home", "about", "services", "blog", "essay", "contact"];

export default async function sitemap() {
  const staticRoutes = staticPageKeys.map((key) => {
    const page = getPageSeo(key);

    return {
      url: absoluteUrl(page.path || "/"),
      lastModified: new Date(),
      changeFrequency: key === "home" ? "weekly" : "monthly",
      priority: key === "home" ? 1 : 0.8,
    };
  });

  const services = await getFirebaseSection("Services");
  const serviceRoutes = services.map((service) => ({
    url: absoluteUrl(servicePath(service)),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
