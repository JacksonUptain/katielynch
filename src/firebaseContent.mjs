import { createHash } from "node:crypto";

export const firebaseContentSections = ["Services", "Blog", "Essays"];

const defaultFirebaseDatabaseUrl =
  "https://katielynch-63c34-default-rtdb.firebaseio.com";

export const firebaseContentDatabaseUrl =
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || defaultFirebaseDatabaseUrl;

function sortStable(value) {
  if (Array.isArray(value)) return value.map(sortStable);

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = sortStable(value[key]);
        return sorted;
      }, {});
  }

  return value;
}

export function selectFirebaseSeoContent(pages = {}) {
  return firebaseContentSections.reduce((selected, section) => {
    selected[section] = pages?.[section] || null;
    return selected;
  }, {});
}

export function hashFirebaseSeoContent(content = {}) {
  const stableJson = JSON.stringify(sortStable(content));
  return createHash("sha256").update(stableJson).digest("hex");
}

export async function fetchFirebaseSeoContent() {
  const baseUrl = firebaseContentDatabaseUrl.replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/Pages.json`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Firebase content request failed with ${response.status}.`);
  }

  const pages = await response.json();
  const content = selectFirebaseSeoContent(pages);

  return {
    content,
    version: hashFirebaseSeoContent(content),
  };
}
