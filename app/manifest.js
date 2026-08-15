import { assetPath } from "../src/sitePaths";

export const dynamic = "force-static";

export default function manifest() {
  return {
    id: assetPath("/"),
    short_name: "Katie Lynch",
    name: "Katie Lynch | Capturing Literacy",
    description:
      "Dyslexia remediation, structured literacy tutoring, and IEW writing instruction in Northern Virginia and online.",
    start_url: assetPath("/"),
    scope: assetPath("/"),
    display: "standalone",
    orientation: "any",
    lang: "en-US",
    categories: ["education", "tutoring", "literacy"],
    theme_color: "#fdfaf2",
    background_color: "#fdfaf2",
    icons: [
      {
        src: assetPath("/favicon.ico"),
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon",
      },
      {
        src: assetPath("/images/capturingLiteracy.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
