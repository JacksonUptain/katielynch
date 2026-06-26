import { useParams, Link } from 'react-router-dom';
import './App.css';
import HeaderHero from './HeaderHero';

import Footer from './Footer';
import { useFirebaseSection } from './useFirebaseSection';
function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H9l2 2.5h7.5A2.5 2.5 0 0 1 21 9v8.5A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11Z" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 20l4.5-1 10.8-10.8a2.4 2.4 0 0 0-3.4-3.4L5.1 15.6 4 20Z" />
      <path d="M14.5 6.2l3.3 3.3" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v18h4.5A2.5 2.5 0 0 0 20 18.5v-13Z" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 5h14v10H5V5Z" />
      <path d="M3 17h18l-1.2 2H4.2L3 17Z" />
    </svg>
  );
}

function AnnouncementIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 11v2a2 2 0 0 0 2 2h2l8 4V5l-8 4H6a2 2 0 0 0-2 2Z" />
      <path d="M8 15l1 5" />
      <path d="M18 9a4 4 0 0 1 0 6" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" />
      <path d="M3 7h18v5H3V7Z" />
      <path d="M12 7v14" />
      <path d="M12 7c-2.5 0-3.5-4-1-4 1.5 0 2 2 2 4Z" />
      <path d="M12 7c2.5 0 3.5-4 1-4-1.5 0-2 2-2 4Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M16 20v-2a4 4 0 0 0-8 0v2" />
      <circle cx="12" cy="8" r="4" />
      <path d="M20 20v-2.5a3.5 3.5 0 0 0-3-3.4" />
      <path d="M4 20v-2.5a3.5 3.5 0 0 1 3-3.4" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

function CourseDetailsMarkup({ text }) {
  const sections = parseCourseMarkup(text);

  if (!sections.length) return null;

  const quickFacts = sections.filter((section) => section.layout === "quick");
  const detailSections = sections.filter((section) => section.layout !== "quick");

  return (
    <div className="course-page-card">
      {quickFacts.length > 0 && (
        <div className="course-quick-facts">
          {quickFacts.map((section, index) => {
            const Icon = section.icon;

            return (
              <div
                className={`course-quick-card ${section.colorClass}`}
                key={`${section.tag}-${index}`}
              >
                <div className="course-quick-icon">
                  <Icon />
                </div>

                <div>
                  <div className="course-quick-label">{section.label}</div>
                  <div className="course-quick-value">
                    {renderBlocks(section.blocks)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="course-section-list">
        {detailSections.map((section, index) => {
          const Icon = section.icon;

          return (
            <details
              className={`course-section ${section.colorClass}`}
              key={`${section.tag}-${index}`}
              open={index === 0}
            >
              <summary>
                <span className="course-section-icon">
                  <Icon />
                </span>
                <span>{section.label}</span>
              </summary>

              <div className="course-section-content">
                {renderBlocks(section.blocks)}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}

function renderBlocks(blocks) {
  if (!blocks || blocks.length === 0) {
    return <p>-</p>;
  }

  return blocks.map((block, index) => {
    if (block.type === "paragraph") {
      return <p key={index}>{block.text}</p>;
    }

    if (block.type === "bullets") {
      return (
        <ul key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      );
    }

    return null;
  });
}

function parseCourseMarkup(text = "") {
  if (!text || typeof text !== "string") return [];

 const sectionMap = {
  description: {
    label: "Course Description",
    icon: FolderIcon,
    colorClass: "blue",
    layout: "detail",
  },
  price: {
    label: "Price",
    icon: PriceIcon,
    colorClass: "green",
    layout: "quick",
  },
  dates: {
    label: "Dates",
    icon: CalendarIcon,
    colorClass: "orange",
    layout: "quick",
  },
  schedule: {
    label: "Schedule",
    icon: CalendarIcon,
    colorClass: "purple",
    layout: "quick",
  },
  "grade-level": {
    label: "Grade Level",
    icon: UsersIcon,
    colorClass: "blue",
    layout: "quick",
  },
  grade: {
    label: "Grade Level",
    icon: UsersIcon,
    colorClass: "blue",
    layout: "quick",
  },
  homework: {
    label: "Homework",
    icon: PencilIcon,
    colorClass: "yellow",
    layout: "detail",
  },
  material: {
    label: "Class Materials",
    icon: BookIcon,
    colorClass: "teal",
    layout: "detail",
  },
  materials: {
    label: "Class Materials",
    icon: BookIcon,
    colorClass: "teal",
    layout: "detail",
  },
  technology: {
    label: "Technology & Platforms",
    icon: LaptopIcon,
    colorClass: "purple",
    layout: "detail",
  },
  platforms: {
    label: "Technology & Platforms",
    icon: LaptopIcon,
    colorClass: "purple",
    layout: "detail",
  },
  policies: {
    label: "Payment Terms and Policies",
    icon: AnnouncementIcon,
    colorClass: "red",
    layout: "detail",
  },
  policy: {
    label: "Payment Terms and Policies",
    icon: AnnouncementIcon,
    colorClass: "red",
    layout: "detail",
  },
  "class-format": {
    label: "Class Format",
    icon: UsersIcon,
    colorClass: "orange",
    layout: "detail",
  },
  feedback: {
    label: "Feedback & Resubmissions",
    icon: PencilIcon,
    colorClass: "green",
    layout: "detail",
  },
  vocabulary: {
    label: "Vocabulary",
    icon: BookIcon,
    colorClass: "teal",
    layout: "detail",
  },
  grading: {
    label: "Grading",
    icon: PencilIcon,
    colorClass: "blue",
    layout: "detail",
  },
};

  const sections = [];
  let currentSection = null;
  let currentBullets = [];

  const flushBullets = () => {
    if (currentSection && currentBullets.length > 0) {
      currentSection.blocks.push({
        type: "bullets",
        items: [...currentBullets],
      });

      currentBullets = [];
    }
  };

  const startSection = (tag, value = "") => {
    flushBullets();

    const settings = sectionMap[tag] || {
  label: makePrettyLabel(tag),
  icon: InfoIcon,
  colorClass: "blue",
  layout: "detail",
};
    currentSection = {
      tag,
      label: settings.label,
      icon: settings.icon,
      colorClass: settings.colorClass,
      layout: settings.layout,
      blocks: [],
    };

    sections.push(currentSection);

    if (value.trim()) {
      currentSection.blocks.push({
        type: "paragraph",
        text: value.trim(),
      });
    }
  };

  const ensureSection = () => {
    if (!currentSection) {
      startSection("description");
    }
  };

  const addParagraph = (value) => {
    const cleaned = value.trim();
    if (!cleaned) return;

    flushBullets();
    ensureSection();

    currentSection.blocks.push({
      type: "paragraph",
      text: cleaned,
    });
  };

  const addBullet = (value) => {
    const cleaned = value.trim();
    if (!cleaned) return;

    ensureSection();
    currentBullets.push(cleaned);
  };

  const tagRegex = /<([^>]+)>([^<]*)/g;
  const matches = [...text.matchAll(tagRegex)];

  if (matches.length === 0) {
    startSection("description", text);
    flushBullets();
    return sections;
  }

  matches.forEach((match) => {
    const tag = match[1].trim().toLowerCase();
    const value = match[2].trim();

    if (tag === "paragraph" || tag === "p") {
      addParagraph(value);
      return;
    }

    if (tag === "bullet" || tag === "li") {
      addBullet(value);
      return;
    }

    startSection(tag, value);
  });

  flushBullets();
  return sections;
}

function makePrettyLabel(tag) {
  return tag
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}


export default function Service() {
  const { service } = useParams();

  // You can replace this with real data or fetch from JSON/API
  const servicesData = useFirebaseSection("Services").items || [];

  const currentService = servicesData.find(
  (s) => s.title?.toLowerCase() === service?.toLowerCase()
);
  console.log(service, currentService, servicesData);

  if (!currentService) {
    return (
      <div style={{ padding: '2rem' }}>
        
        <HeaderHero
          image="/images/capturingLiteracy.png"
          title={"Service not found"}
          description={"The requested service was not found."}
          currentPageName={"Service not found"}
        />
        <Link to="/services" >Back to Services</Link>
        
        <p style={{margin: "50px"}}>Service "{service}" not found.</p>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <HeaderHero
          image='/images/capturingLiteracy.png'
          title={`${currentService.title}`}
          description={currentService.description}
          currentPageName={currentService.title}
        />

        
        <Link to="/services">Back to Services</Link>
        
        <section className="course-description">
          <h2>Course Details</h2>
          <CourseDetailsMarkup text={currentService['course-description']} />

        </section>

        <Footer />
      </div>
    );
  }
}