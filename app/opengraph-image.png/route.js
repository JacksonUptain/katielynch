import { ImageResponse } from "next/og";

const imageSize = { width: 1200, height: 630 };

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#fdfaf2",
          color: "#17345e",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: 480,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fffdf8",
          }}
        >
          <img
            src="https://capturingliteracy.com/images/capturingLiteracy.png"
            width={420}
            height={420}
            alt=""
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "52px 58px 52px 54px",
            borderLeft: "8px solid #e9b949",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#c56a31",
              fontFamily: "Arial, sans-serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Capturing Literacy
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.03,
            }}
          >
            Katie Lynch
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              color: "#2f567b",
              fontFamily: "Arial, sans-serif",
              fontSize: 29,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            Certified Academic Language Therapist
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              color: "#344b62",
              fontFamily: "Arial, sans-serif",
              fontSize: 24,
              lineHeight: 1.45,
            }}
          >
            Dyslexia · Structured Literacy · IEW Writing
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 9,
              color: "#567086",
              fontFamily: "Arial, sans-serif",
              fontSize: 20,
            }}
          >
            Northern Virginia · Live Virtual Classes
          </div>
        </div>
      </div>
    ),
    imageSize
  );
}
