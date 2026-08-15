import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const outputDirectory = resolve("out");
const errors = [];

const optimizedAssets = [
  { path: "images/capturingLiteracy.avif", maxBytes: 150_000 },
  { path: "images/educational-services.avif", maxBytes: 150_000 },
  { path: "images/IEW.avif", maxBytes: 60_000 },
];

for (const asset of optimizedAssets) {
  const filePath = resolve(outputDirectory, asset.path);
  if (!existsSync(filePath)) {
    errors.push(`Missing optimized asset: ${asset.path}`);
    continue;
  }

  const size = statSync(filePath).size;
  if (size > asset.maxBytes) {
    errors.push(`${asset.path} is ${size} bytes; expected no more than ${asset.maxBytes}.`);
  }
}

const homeHtml = readFileSync(resolve(outputDirectory, "index.html"), "utf8");
const resourcesHtml = readFileSync(
  resolve(outputDirectory, "resources/index.html"),
  "utf8"
);

for (const belowFoldImage of [
  "educational-services.png",
  "IEW.png",
  "ALTA.jpg",
]) {
  const imageTag = homeHtml.match(
    new RegExp(`<img[^>]+src="[^"]*${belowFoldImage.replace(".", "\\.")}"[^>]*>`, "i")
  )?.[0];

  if (!imageTag || !/loading="lazy"/i.test(imageTag)) {
    errors.push(`Homepage image must remain lazy-loaded: ${belowFoldImage}`);
  }
}

if (!/fetchPriority="high"/i.test(homeHtml)) {
  errors.push("The homepage hero image is missing high fetch priority.");
}

if (!/capturingLiteracy\.avif/i.test(homeHtml)) {
  errors.push("The homepage is missing its AVIF logo source.");
}

if (/background-image:\s*url\(/i.test(resourcesHtml)) {
  errors.push("Resource-card images should use lazy-loaded image elements, not inline backgrounds.");
}

const resourceBackgrounds = [
  ...resourcesHtml.matchAll(/<img[^>]+class="blog-card-background"[^>]*>/gi),
].map((match) => match[0]);

if (resourceBackgrounds.some((tag) => !/loading="lazy"/i.test(tag))) {
  errors.push("Every resource-card image must remain lazy-loaded.");
}

if (errors.length) {
  console.error(`Performance check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const optimizedBytes = optimizedAssets.reduce(
  (total, asset) => total + statSync(resolve(outputDirectory, asset.path)).size,
  0
);
console.log(
  `Performance check passed. Optimized core images total ${Math.round(optimizedBytes / 1024)} KB.`
);
