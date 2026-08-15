import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const outputDirectory = resolve("out");
const errors = [];

function read(relativePath) {
  const filePath = resolve(outputDirectory, relativePath);
  if (!existsSync(filePath)) {
    errors.push(`Missing exported file: ${relativePath}`);
    return "";
  }
  return readFileSync(filePath, "utf8");
}

function matchOne(content, pattern) {
  return content.match(pattern)?.[1] || "";
}

function pathToHtml(url) {
  const pathname = new URL(url).pathname;
  return pathname === "/" ? "index.html" : `${pathname.replace(/^\//, "")}index.html`;
}

function internalTargetToFile(target) {
  const pathname = target.split(/[?#]/)[0];
  if (!pathname || pathname === "/") return "index.html";
  if (pathname.endsWith("/")) return `${pathname.replace(/^\//, "")}index.html`;
  const finalSegment = pathname.split("/").at(-1) || "";
  return finalSegment.includes(".")
    ? pathname.replace(/^\//, "")
    : `${pathname.replace(/^\//, "")}/index.html`;
}

const robots = read("robots.txt");
const sitemap = read("sitemap.xml");
const llms = read("llms.txt");
const contentVersion = read("content-version.json");
read("llms-full.txt");
read("humans.txt");

if (!/User-Agent:\s*\*/i.test(robots) || !/Allow:\s*\//i.test(robots)) {
  errors.push("robots.txt must allow the public site for the wildcard user agent.");
}
if (!/Sitemap:\s*https:\/\/capturingliteracy\.com\/sitemap\.xml/i.test(robots)) {
  errors.push("robots.txt is missing the canonical sitemap URL.");
}

const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const uniqueSitemapUrls = new Set(sitemapUrls);

if (sitemapUrls.length < 6 || sitemapUrls.length !== uniqueSitemapUrls.size) {
  errors.push("sitemap.xml is empty, incomplete, or contains duplicate URLs.");
}

for (const url of sitemapUrls) {
  const parsed = new URL(url);
  if (parsed.origin !== "https://capturingliteracy.com") {
    errors.push(`Non-canonical sitemap origin: ${url}`);
  }
  if (parsed.pathname !== "/" && !parsed.pathname.endsWith("/")) {
    errors.push(`Sitemap page URL must use the trailing-slash canonical: ${url}`);
  }
  if (/\/(services|blog|essay|contact|home|katielynch)\//.test(parsed.pathname)) {
    errors.push(`Legacy URL found in sitemap: ${url}`);
  }

  const html = read(pathToHtml(url));
  const title = matchOne(html, /<title>(.*?)<\/title>/s);
  const description = matchOne(
    html,
    /<meta name="description" content="([^"]+)"\s*\/?>/s
  );
  const canonical = matchOne(
    html,
    /<link rel="canonical" href="([^"]+)"\s*\/?>/s
  );
  const h1Count = (html.match(/<h1\b/gi) || []).length;

  if (!title) errors.push(`Missing title: ${url}`);
  if (!description) errors.push(`Missing meta description: ${url}`);
  if (canonical !== url) {
    errors.push(`Canonical mismatch for ${url}: received ${canonical || "none"}`);
  }
  if (h1Count !== 1) errors.push(`Expected one H1 on ${url}; found ${h1Count}.`);
  if (!/name="robots" content="index, follow/i.test(html)) {
    errors.push(`Canonical page is not indexable: ${url}`);
  }

  const internalTargets = [
    ...html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g),
  ].map((match) => match[1]);

  for (const target of internalTargets) {
    if (target.startsWith("/_next/") || target.startsWith("/#")) continue;
    const targetFile = internalTargetToFile(target);
    if (!existsSync(resolve(outputDirectory, targetFile))) {
      errors.push(`Broken internal reference on ${url}: ${target}`);
    }
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      JSON.parse(match[1]);
    } catch {
      errors.push(`Invalid JSON-LD on ${url}`);
    }
  }
}

const legacyPages = [
  "home/index.html",
  "katielynch/index.html",
  "about-katie-lynch/index.html",
  "services/index.html",
  "blog/index.html",
  "essay/index.html",
  "contact/index.html",
];

for (const legacyPage of legacyPages) {
  const html = read(legacyPage);
  if (!/name="robots" content="noindex, follow/i.test(html)) {
    errors.push(`Legacy page must be noindex, follow: ${legacyPage}`);
  }
}

if (!llms.startsWith("# Capturing Literacy")) {
  errors.push("llms.txt must begin with the site's canonical H1.");
}
if (!llms.includes("https://capturingliteracy.com/educational-services/")) {
  errors.push("llms.txt is missing the canonical services directory.");
}

try {
  const parsedContentVersion = JSON.parse(contentVersion);
  if (!/^[a-f0-9]{64}$/.test(parsedContentVersion.version || "")) {
    errors.push("content-version.json must include a SHA-256 Firebase content version.");
  }
} catch {
  errors.push("content-version.json must be valid JSON.");
}

if (/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-f]+;)/i.test(sitemap)) {
  errors.push("sitemap.xml contains an unescaped ampersand and is not valid XML.");
}

if (errors.length) {
  console.error(`SEO check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO check passed for ${sitemapUrls.length} canonical pages.`);
