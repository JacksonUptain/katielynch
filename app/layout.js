import "bootstrap/dist/css/bootstrap.min.css";
import "../src/index.css";
import "../src/App.css";
import "../src/service.css";
import "../src/ServiceCard.css";
import JsonLd from "../src/JsonLd";
import { buildMetadata, seoConfig } from "../src/seo";
import { siteStructuredData } from "../src/structuredData";

export const metadata = {
  ...buildMetadata("home"),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
};

export const viewport = {
  themeColor: "#fdfaf2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={siteStructuredData()} />
        <div className="App">{children}</div>
      </body>
    </html>
  );
}
