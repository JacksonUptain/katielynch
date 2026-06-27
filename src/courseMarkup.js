function makePrettyLabel(tag) {
  return tag
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function extractLinkUrl(attrText = '') {
  const match = attrText.match(/\b(?:to|href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  return match ? (match[1] || match[2] || match[3] || '') : '';
}

export function parseCourseMarkup(text = '', sectionDefinitions = {}) {
  if (!text || typeof text !== 'string') return [];

  const sectionMap = {
    description: {
      label: 'Course Description',
      icon: null,
      colorClass: 'blue',
      layout: 'detail',
    },
    price: {
      label: 'Price',
      icon: null,
      colorClass: 'green',
      layout: 'quick',
    },
    dates: {
      label: 'Dates',
      icon: null,
      colorClass: 'orange',
      layout: 'quick',
    },
    schedule: {
      label: 'Schedule',
      icon: null,
      colorClass: 'purple',
      layout: 'quick',
    },
    'grade-level': {
      label: 'Grade Level',
      icon: null,
      colorClass: 'blue',
      layout: 'quick',
    },
    grade: {
      label: 'Grade Level',
      icon: null,
      colorClass: 'blue',
      layout: 'quick',
    },
    homework: {
      label: 'Homework',
      icon: null,
      colorClass: 'yellow',
      layout: 'detail',
    },
    material: {
      label: 'Class Materials',
      icon: null,
      colorClass: 'teal',
      layout: 'detail',
    },
    materials: {
      label: 'Class Materials',
      icon: null,
      colorClass: 'teal',
      layout: 'detail',
    },
    technology: {
      label: 'Technology & Platforms',
      icon: null,
      colorClass: 'purple',
      layout: 'detail',
    },
    platforms: {
      label: 'Technology & Platforms',
      icon: null,
      colorClass: 'purple',
      layout: 'detail',
    },
    policies: {
      label: 'Payment Terms and Policies',
      icon: null,
      colorClass: 'red',
      layout: 'detail',
    },
    policy: {
      label: 'Payment Terms and Policies',
      icon: null,
      colorClass: 'red',
      layout: 'detail',
    },
    'class-format': {
      label: 'Class Format',
      icon: null,
      colorClass: 'orange',
      layout: 'detail',
    },
    feedback: {
      label: 'Feedback & Resubmissions',
      icon: null,
      colorClass: 'green',
      layout: 'detail',
    },
    vocabulary: {
      label: 'Vocabulary',
      icon: null,
      colorClass: 'teal',
      layout: 'detail',
    },
    grading: {
      label: 'Grading',
      icon: null,
      colorClass: 'blue',
      layout: 'detail',
    },
  };

  const sections = [];
  let currentSection = null;
  let currentBullets = [];

  const flushBullets = () => {
    if (currentSection && currentBullets.length > 0) {
      currentSection.blocks.push({
        type: 'bullets',
        items: [...currentBullets],
      });

      currentBullets = [];
    }
  };

  const startSection = (tag, value = '') => {
    flushBullets();

    const settings = sectionDefinitions[tag] || sectionMap[tag] || {
      label: makePrettyLabel(tag),
      icon: null,
      colorClass: 'blue',
      layout: 'detail',
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
        type: 'paragraph',
        text: value.trim(),
      });
    }
  };

  const ensureSection = () => {
    if (!currentSection) {
      startSection('description');
    }
  };

  const addParagraph = (value) => {
    const cleaned = value.trim();
    if (!cleaned) return;

    flushBullets();
    ensureSection();

    currentSection.blocks.push({
      type: 'paragraph',
      text: cleaned,
    });
  };

  const addBullet = (value) => {
    const cleaned = value.trim();
    if (!cleaned) return;

    ensureSection();
    currentBullets.push(cleaned);
  };

  const tagRegex = /<\s*(\/)?([a-zA-Z][\w:-]*)([^>]*)>/g;
  const matches = [...text.matchAll(tagRegex)];

  if (matches.length === 0) {
    startSection('description', text);
    flushBullets();
    return sections;
  }

  matches.forEach((match, index) => {
    const isClosingTag = Boolean(match[1]);
    if (isClosingTag) return;

    const tagRaw = match[2].trim();
    const attrText = match[3] || '';
    const tag = tagRaw.toLowerCase();
    const nextMatch = matches[index + 1];
    const contentStart = match.index + match[0].length;
    const contentEnd = nextMatch ? nextMatch.index : text.length;
    const value = text.slice(contentStart, contentEnd).trim();

    if (tag === 'paragraph' || tag === 'p') {
      addParagraph(value);
      return;
    }

    if (tag === 'bullet' || tag === 'li') {
      addBullet(value);
      return;
    }

    if (tag === 'link') {
      const url = extractLinkUrl(attrText);

      flushBullets();
      ensureSection();

      currentSection.blocks.push({
        type: 'link',
        text: value,
        url,
      });

      return;
    }

    startSection(tag, value);
  });

  flushBullets();
  return sections;
}
