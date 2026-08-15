import { fetchFirebaseSeoContent } from "../src/firebaseContent.mjs";

try {
  const { version } = await fetchFirebaseSeoContent();
  console.log(version);
} catch (error) {
  console.error(
    error instanceof Error ? error.message : "Unable to fingerprint Firebase content."
  );
  process.exit(1);
}
