import { assetPath } from "../src/sitePaths";

export const dynamic = "force-static";

export default function manifest() {
  return {
    short_name: "Katie Lynch",
    name: "Katie Lynch | Capturing Literacy",
    start_url: assetPath("/"),
    display: "standalone",
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
