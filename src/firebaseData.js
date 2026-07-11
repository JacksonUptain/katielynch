import { firebaseDatabaseUrl } from "./firebaseConfig";

export function firebaseObjectToArray(data) {
  if (!data || typeof data !== "object") return [];

  return Object.entries(data).map(([key, value]) => ({
    id: key,
    ...(value || {}),
  }));
}

export async function getFirebaseSectionResult(sectionName) {
  if (!sectionName || !firebaseDatabaseUrl) {
    return { items: [], ok: false, error: "Missing Firebase section or URL." };
  }

  const baseUrl = firebaseDatabaseUrl.replace(/\/$/, "");
  const sectionPath = encodeURIComponent(sectionName);

  try {
    const response = await fetch(`${baseUrl}/Pages/${sectionPath}.json`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return {
        items: [],
        ok: false,
        error: `Firebase returned ${response.status}.`,
      };
    }

    const data = await response.json();

    return {
      items: firebaseObjectToArray(data),
      ok: true,
      error: null,
    };
  } catch (error) {
    return {
      items: [],
      ok: false,
      error: error instanceof Error ? error.message : "Firebase request failed.",
    };
  }
}

export async function getFirebaseSection(sectionName) {
  const result = await getFirebaseSectionResult(sectionName);
  return result.items;
}
