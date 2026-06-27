import { parseCourseMarkup } from './courseMarkup';

describe('parseCourseMarkup', () => {
  it('extracts a link URL from a <link to="..."> tag', () => {
    const sections = parseCourseMarkup('<link to="https://example.com">Read more</link>');

    expect(sections).toHaveLength(1);
    expect(sections[0].blocks).toEqual([
      {
        type: 'link',
        text: 'Read more',
        url: 'https://example.com',
      },
    ]);
  });

  it('also supports href attributes for compatibility', () => {
    const sections = parseCourseMarkup('<link href="https://example.org">Visit</link>');

    expect(sections[0].blocks[0]).toEqual({
      type: 'link',
      text: 'Visit',
      url: 'https://example.org',
    });
  });

  it('parses Firebase-style opening-only tags into separate sections', () => {
    const sections = parseCourseMarkup('<description><paragraph>Intro paragraph<paragraph>Second paragraph<grade-level>9th-11th grade<schedule>Tuesdays');

    expect(sections.map((section) => section.tag)).toEqual(['description', 'grade-level', 'schedule']);
    expect(sections[0].blocks).toEqual([
      { type: 'paragraph', text: 'Intro paragraph' },
      { type: 'paragraph', text: 'Second paragraph' },
    ]);
    expect(sections[1].blocks).toEqual([{ type: 'paragraph', text: '9th-11th grade' }]);
    expect(sections[2].blocks).toEqual([{ type: 'paragraph', text: 'Tuesdays' }]);
  });
});
