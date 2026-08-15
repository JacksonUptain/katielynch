import seoConfig from "./seo.config.json";
import { absoluteUrl } from "./seo";
import { pagePaths, servicePath } from "./routes";

const business = seoConfig.business || {};

function cleanText(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function markdownLabel(value = "") {
  return cleanText(value).replace(/[\[\]]/g, "");
}

function validExternalUrl(value = "") {
  try {
    const url = new URL(String(value));
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
}

function serviceLines(services = [], includeDescription = false) {
  if (!services.length) return ["- Current offerings are listed on the services page."];

  return services.map((service) => {
    const title = markdownLabel(service.title || service.id || "Educational service");
    const url = absoluteUrl(servicePath(service));
    const description = cleanText(
      service["short-description"] || service.description || ""
    );
    return `- [${title}](${url})${includeDescription && description ? `: ${description}` : ""}`;
  });
}

function resourceLines(resources = [], includeDescription = false) {
  if (!resources.length) return ["- Current resources are listed on the resources page."];

  return resources.map((resource) => {
    const title = markdownLabel(resource.title || resource.id || "Literacy resource");
    const url = validExternalUrl(resource.link) || absoluteUrl(pagePaths.blog);
    const description = cleanText(resource.description || "");
    const date = cleanText(resource.date || "");
    const details = [date, includeDescription ? description : ""].filter(Boolean).join(" — ");
    return `- [${title}](${url})${details ? `: ${details}` : ""}`;
  });
}

function essayLines(essays = [], includeDescription = false) {
  if (!essays.length) return ["- Current student work is listed on the student showcase page."];

  return essays.map((essay) => {
    const title = markdownLabel(essay.title || essay.id || "Student writing");
    const url = validExternalUrl(essay.file) || absoluteUrl(pagePaths.essay);
    const description = cleanText(essay.description || essay.preview || "");
    const date = cleanText(essay.date || "");
    const details = [date, includeDescription ? description : ""].filter(Boolean).join(" — ");
    return `- [${title}](${url})${details ? `: ${details}` : ""}`;
  });
}

export function buildLlmsText({ services = [], resources = [], essays = [] } = {}) {
  return [
    "# Capturing Literacy",
    "",
    "> Capturing Literacy is Katie Lynch's literacy education practice. Katie is a Certified Academic Language Therapist (CALT), dyslexia and dysgraphia specialist, and Institute for Excellence in Writing (IEW) Experienced Instructor. She offers in-person support in Manassas and Northern Virginia and live virtual instruction for students across the United States.",
    "",
    "Use the canonical URLs below when citing this site. For current course dates, prices, availability, and enrollment details, consult the linked service page because offerings can change.",
    "",
    "## Primary pages",
    "",
    `- [Home](${absoluteUrl(pagePaths.home)}): Overview of Katie Lynch, Capturing Literacy, credentials, teaching philosophy, and services.`,
    `- [About Katie Lynch](${absoluteUrl(pagePaths.about)}): Education, professional certifications, experience, and teaching approach.`,
    `- [Educational Services](${absoluteUrl(pagePaths.services)}): Current dyslexia remediation, structured literacy, writing, and grammar offerings.`,
    `- [Literacy Resources](${absoluteUrl(pagePaths.blog)}): Curated resources for parents and students.`,
    `- [Student Writing Showcase](${absoluteUrl(pagePaths.essay)}): Featured student writing and highlights.`,
    `- [Contact Katie Lynch](${absoluteUrl(pagePaths.contact)}): Current contact details and service area.`,
    "",
    "## Current service pages",
    "",
    ...serviceLines(services),
    "",
    "## Current literacy resources",
    "",
    ...resourceLines(resources),
    "",
    "## Current student showcase",
    "",
    ...essayLines(essays),
    "",
    "## Contact and identity",
    "",
    `- Business: ${business.legalName || "Capturing Literacy LLC"}`,
    `- Educator: ${business.founderName || "Katie Lynch"}`,
    `- Email: ${business.email || "KatieLynchTutor@gmail.com"}`,
    `- Phone: ${business.telephone || "+18084897886"}`,
    `- Location: ${business.locationName || "Manassas, Virginia"}, United States`,
    ...(business.sameAs || []).map((url) => `- Professional profile: ${url}`),
    "",
    "## Optional",
    "",
    `- [Expanded site summary](${absoluteUrl("/llms-full.txt")})`,
    `- [XML sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
  ].join("\n");
}

export function buildLlmsFullText({ services = [], resources = [], essays = [] } = {}) {
  return [
    "# Capturing Literacy: expanded site summary",
    "",
    "## Canonical identity",
    "",
    "Capturing Literacy LLC is the education practice of Katie Lynch. Katie is a Certified Academic Language Therapist (CALT), a certified therapist with the Academic Language Therapy Association, and an accredited Experienced Instructor with the Institute for Excellence in Writing (IEW). She holds a Master of Science in Counseling Psychology and a Bachelor of Arts in Psychology and Child Development and Family Relations.",
    "",
    "Katie has worked as a high school counselor, college instructor, and homeschooling parent. Since 2017, she has provided personalized tutoring and small-group writing instruction. Her training includes Sounds In Syllables, an Orton-Gillingham-based structured literacy program.",
    "",
    `Canonical home page: ${absoluteUrl(pagePaths.home)}`,
    "",
    "## Services and teaching approach",
    "",
    "Capturing Literacy provides personalized, evidence-based literacy instruction for students who need explicit, systematic, diagnostic, and multisensory teaching. In-person services are based in Manassas, Virginia and serve families in Prince William County and Northern Virginia. Virtual services are available to students in the United States.",
    "",
    ...serviceLines(services, true),
    "",
    `Current schedules, tuition, availability, and enrollment details are maintained at ${absoluteUrl(pagePaths.services)}.`,
    "",
    "## Current literacy resources",
    "",
    ...resourceLines(resources, true),
    "",
    "## Current student showcase",
    "",
    ...essayLines(essays, true),
    "",
    "## Contact",
    "",
    `- ${business.founderName || "Katie Lynch"}`,
    `- ${business.legalName || "Capturing Literacy LLC"}`,
    `- ${business.email || "KatieLynchTutor@gmail.com"}`,
    `- ${business.telephone || "+18084897886"}`,
    `- ${business.locationName || "Manassas, Virginia"}, United States`,
    `- ${absoluteUrl(pagePaths.contact)}`,
    "",
    "## Citation guidance",
    "",
    `Use ${absoluteUrl(pagePaths.home)} URLs as canonical. Do not treat legacy /services/, /blog/, /essay/, /contact/, /home/, or /katielynch/ paths as separate content. Do not infer diagnoses, guaranteed outcomes, prices, openings, or course dates that are not stated on the current canonical page.`,
    "",
  ].join("\n");
}
