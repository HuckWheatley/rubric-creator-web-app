import React, { useState } from 'react';
import './App.css';

const HKIS_LEVELS = [
  {
    name: 'Emerging',
    color: '#fbeaea',
    borderColor: '#8b1a1a'
  },
  {
    name: 'Developing',
    color: '#fbf3c8',
    borderColor: '#c99a2e'
  },
  {
    name: 'Exhibiting',
    color: '#ececec',
    borderColor: '#6b7280'
  },
  {
    name: 'Exhibiting Depth',
    color: '#e6f0fa',
    borderColor: '#1e5fa8'
  }
];

// Distinct color for the Criterion column (warm earthy tone — sits apart from the 4 scale colors)
const CRITERION_COLOR = {
  header: '#5a4a3a',     // dark warm brown for header bar
  accent: '#8a6d4a',     // medium warm tan for left accent / labels
  wash:   '#f5efe6'      // soft cream wash for the cell background
};

// Black divider between scale columns
const COLUMN_DIVIDER = '2px solid #000000';

/* ══════════════════════════════════════════════════════════════
   HKIS Schoolwide ELA + SS Reporting Taxonomy descriptors.
   ══════════════════════════════════════════════════════════════ */
const TAXONOMY_DESCRIPTORS = {
  'Analyzing Ideas and Themes': {
    Emerging:
      "Begins to identify or describe the text's ideas, themes, and/or arguments in ways that are lacking in accuracy, specificity, and/or comprehension of the text's or author's purpose, intended audience, and/or broader context.",
    Developing:
      "Provides a limited explanation of the text's ideas, themes, and/or arguments that is in need of further elaboration, specificity, and/or more coherent connections to the text's purpose, author, audience, and/or broader context.",
    Exhibiting:
      "Exhibits an accurate understanding of the text's purpose, ideas, themes, and/or arguments with adequate clarity or specificity and/or with plausible connections to the text's author, audience, and/or broader context.",
    'Exhibiting Depth':
      "Consistently demonstrates a precise, nuanced, and/or comprehensive understanding of the text's purpose, ideas, themes, and/or arguments and their implications for the text's author, audience, and/or broader context."
  },
  'Analyzing Text Organization and Structure': {
    Emerging:
      "Begins to identify or describe aspects of the text's formal conventions, organization, and/or structure in ways that are lacking in accuracy, specificity, and/or convincing explanations as to how they contribute to the text's ideas, themes, and/or arguments.",
    Developing:
      "Provides a limited explanation of the text's formal conventions, organization, and/or structural features that is in need of further elaboration, specificity, and/or more plausible connections to the text's ideas, themes, and/or arguments.",
    Exhibiting:
      "Exhibits an accurate understanding of the formal conventions, organization, and/or structure of the text with adequate clarity and specificity in explaining how they contribute to the development of the text's ideas, themes, and/or arguments.",
    'Exhibiting Depth':
      "Consistently demonstrates a precise and persuasive understanding of how the text's formal conventions, organization, and/or structural features contribute to the development of significant ideas, themes, and/or arguments."
  },
  'Analyzing Language': {
    Emerging:
      'Begins to identify or describe stylistic features, rhetorical strategies, and/or literary techniques in ways that are lacking in accuracy, specificity, and/or convincing explanations as to how they contribute to the purpose and development of the text.',
    Developing:
      'Provides a limited explanation of stylistic features, rhetorical strategies, and/or literary techniques that is in need of further elaboration, specificity, and/or more plausible connections to the purpose and development of the text.',
    Exhibiting:
      'Exhibits an accurate understanding of stylistic features, rhetorical strategies, and/or literary techniques and explains with adequate clarity and specificity ways they contribute to the purpose and development of the text.',
    'Exhibiting Depth':
      'Consistently demonstrates a precise and persuasive understanding of significant stylistic features, rhetorical strategies, and/or literary techniques and how they contribute to the purpose and development of the text.'
  },
  'Generating Text Organization and Structure': {
    Emerging:
      'Begins to adhere to or apply formal conventions and structural features in ways that lack consistency, resulting in a text or product in need of greater clarity and cohesion.',
    Developing:
      'Adherence to or application of formal conventions and structural features are evident in places and would benefit from more consistent or cohesive organizational choices.',
    Exhibiting:
      'Makes appropriate choices in adhering to or applying formal conventions and structural elements to create a text or product that is clear and adequately organized.',
    'Exhibiting Depth':
      'Makes consistently effective or inventive choices in adhering to or applying formal conventions and structural elements to create a cohesively organized and unified text or product.'
  },
  'Generating Claims, Evidence, and Reasoning': {
    Emerging:
      'Central claim (thesis) and supporting claims may not be defensible or may be lacking in relevance, with evidence and reasoning that is in need of greater specificity, detail, and/or accuracy.',
    Developing:
      'Central claim (thesis) and supporting claims are generally relevant and/or defensible with evidence and reasoning that would benefit from more consistency, specificity, detail, and/or accuracy.',
    Exhibiting:
      'Central claim (thesis) and supporting claims are relevant and defensible with substantive evidence and reasoning that is plausible and adequately detailed.',
    'Exhibiting Depth':
      'Central claim (thesis) and supporting claims are relevant, precise, and/or complex and consistently developed with substantive and/or specific evidence and coherent and/or persuasive reasoning.'
  },
  'Style and Revision': {
    Emerging:
      "Language use is in need of further editing and revision as it is lacking in range, accuracy and/or the employment of rhetorical strategies or stylistic techniques that would support the purpose of the work. The tone, level of formality, and/or adherence to style guidelines for referencing and citations (if needed) may be inappropriate or inconsistent.",
    Developing:
      "Language use would benefit from a more careful process of outlining, editing, and/or revision to ensure greater accuracy and that the employment of rhetorical strategies and/or stylistic techniques are effective for the work's purpose. The tone, level of formality, and/or adherence to style guidelines for referencing and citations (if needed) may also need to be more consistently maintained throughout the work.",
    Exhibiting:
      "Language use is generally accurate, employing rhetorical strategies and/or stylistic techniques in ways that contribute to the work's purpose and that is achieved through adequate engagement with a process of outlining, editing, and revision. An appropriate tone, level of formality, and/or adherence to style guidelines for referencing and citations (if needed) is adequately maintained throughout the work.",
    'Exhibiting Depth':
      "Consistently uses language with accuracy, range, and precision, employing rhetorical strategies and/or stylistic techniques in ways that are effective for the work's purpose and that is achieved through a process of outlining, editing, and revision. An appropriate tone, level of formality, and/or adherence to style guidelines for referencing and citations (if needed) is expertly maintained throughout the work."
  },
  'Civics and Citizenship': {
    Emerging:
      'Begins to demonstrate a cursory or foundational understanding of the targeted areas of knowledge of Civics and Citizenship that is lacking in accuracy, specificity, and/or relevance to the assessment task or in applying concepts to authentic or atypical situations.',
    Developing:
      'Demonstrates some understanding of the targeted areas of knowledge of Civics and Citizenship that is in need of greater accuracy, specificity, elaboration, and/or relevance to the assessment task or in applying concepts to authentic or atypical situations.',
    Exhibiting:
      'Exhibits and applies an accurate and sufficiently detailed understanding of areas of knowledge of Civics and Citizenship relevant to the assessment task and/or to authentic or atypical contexts.',
    'Exhibiting Depth':
      'Skillfully applies and consistently demonstrates a precise, nuanced, and/or comprehensive understanding of areas of knowledge of Civics and Citizenship relevant to the assessment task and/or to authentic or atypical contexts.'
  },
  'Economics, Trade, and Markets': {
    Emerging:
      'Begins to demonstrate a cursory or foundational understanding of the targeted areas of knowledge of Economics, Trade, and Markets that is lacking in accuracy, specificity, and/or relevance to the assessment task or in applying concepts to authentic or atypical situations.',
    Developing:
      'Demonstrates some understanding of the targeted areas of knowledge of Economics, Trade, and Markets that is in need of greater accuracy, specificity, elaboration, and/or relevance to the assessment task or in applying concepts to authentic or atypical situations.',
    Exhibiting:
      'Exhibits and applies an accurate and sufficiently detailed understanding of areas of knowledge of Economics, Trade, and Markets relevant to the assessment task and/or to authentic or atypical contexts.',
    'Exhibiting Depth':
      'Skillfully applies and consistently demonstrates a precise, nuanced, and/or comprehensive understanding of areas of knowledge of Economics, Trade, and Markets relevant to the assessment task and/or to authentic or atypical contexts.'
  },
  'Place, Space, and Human - Environment Interaction': {
    Emerging:
      'Begins to demonstrate a cursory or foundational understanding of the targeted areas of knowledge of Place, Space, and Human-Environment Interaction that is lacking in accuracy, specificity, and/or relevance to the assessment task or in applying concepts to authentic or atypical situations.',
    Developing:
      'Demonstrates some understanding of the targeted areas of knowledge of Place, Space, and Human-Environment Interaction that is in need of greater accuracy, specificity, elaboration, and/or relevance to the assessment task or in applying concepts to authentic or atypical situations.',
    Exhibiting:
      'Exhibits and applies an accurate and sufficiently detailed understanding of areas of knowledge of Place, Space, and Human-Environment Interaction relevant to the assessment task and/or to authentic or atypical contexts.',
    'Exhibiting Depth':
      'Skillfully applies and consistently demonstrates a precise, nuanced, and/or comprehensive understanding of areas of knowledge of Place, Space, and Human-Environment Interaction relevant to the assessment task and/or to authentic or atypical contexts.'
  },
  'Change, Continuity, and Perspectives': {
    Emerging:
      'Begins to demonstrate a cursory or foundational understanding of the targeted areas of knowledge of Change, Continuity, and Perspective that is lacking in accuracy, specificity, and/or relevance to the assessment task or in applying concepts to authentic or atypical situations.',
    Developing:
      'Demonstrates some understanding of the targeted areas of knowledge of Change, Continuity, and Perspective that is in need of greater accuracy, specificity, elaboration, and/or relevance to the assessment task or in applying concepts to authentic or atypical situations.',
    Exhibiting:
      'Exhibits and applies an accurate and sufficiently detailed understanding of areas of knowledge of Change, Continuity, and Perspective relevant to the assessment task and/or to authentic or atypical contexts.',
    'Exhibiting Depth':
      'Skillfully applies and consistently demonstrates a precise, nuanced, and/or comprehensive understanding of areas of knowledge of Change, Continuity, and Perspective relevant to the assessment task and/or to authentic or atypical contexts.'
  },
  'Researching and Inquiring': {
    Emerging:
      'Documents or demonstrates skills required for inquiry and research in limited ways with research questions that may be lacking in relevance or precision, sources that may be limited in range or credibility, and/or the need to include multiple or conflicting perspectives from which plausible conclusions can be drawn or with which a process for continued research could be proposed.',
    Developing:
      'Partially documents or demonstrates skills required for inquiry and research with areas for growth, including the need to craft more precise or compelling questions, to select or further evaluate a greater range of sources for their credibility and corroborative value, and/or to further consider and synthesize multiple or conflicting perspectives from which more plausible conclusions could be drawn or with which a process for continued research could be revised and refined.',
    Exhibiting:
      'Adequately documents or demonstrates skills required for inquiry and research, which may include the crafting of relevant questions, the selection and evaluation of appropriate sources for their credibility and corroborative value, and/or the inclusion of multiple or conflicting perspectives from which conclusions can be drawn or with which a process for continued research can be revised and refined.',
    'Exhibiting Depth':
      'Consistently and carefully documents or demonstrates skills required for inquiry and research, which may include the crafting of compelling questions, the selection and evaluation of a range of sources for their credibility and corroborative value, and/or the consideration of multiple or conflicting perspectives from which conclusions are persuasively synthesized or with which a process for continued research is revised and refined.'
  },
  'Communicating Conclusions and Taking Action': {
    Emerging:
      'Begins to make use of discursive strategies and oral, print, and/or digital technologies in the presentation of arguments, ideas, and/or calls to action that are limited by a lack of consideration for the audience or rhetorical situation and/or the lack of connections to relevant disciplinary lenses or interdisciplinary knowledge and understanding.',
    Developing:
      'Attempts to use discursive strategies and oral, print, and/or digital technologies in the presentation of ideas, arguments, and/or calls to action that would benefit from greater consideration of the needs of the audience or rhetorical situation and/or more precise connections to disciplinary lenses or interdisciplinary knowledge and understanding.',
    Exhibiting:
      'Makes appropriate use of discursive strategies and oral, print, and/or digital technologies in the presentation of well-developed ideas, arguments, and/or options for individual or collective action that show consideration for the audience or rhetorical situation and that are adequately informed by disciplinary lenses or interdisciplinary knowledge and understanding.',
    'Exhibiting Depth':
      'Makes skillful use of discursive strategies and oral, print, and/or digital technologies in presenting evocative ideas, arguments, and/or compelling options for individual or collective action that are persuasively tailored for the audience or rhetorical situation and that are convincingly informed by disciplinary lenses or interdisciplinary knowledge and understanding.'
  }
};

const EMPTY_DESCRIPTORS = {
  Emerging: '',
  Developing: '',
  Exhibiting: '',
  'Exhibiting Depth': ''
};

const getDescriptorsForOutcome = (outcome) =>
  TAXONOMY_DESCRIPTORS[outcome]
    ? { ...TAXONOMY_DESCRIPTORS[outcome] }
    : { ...EMPTY_DESCRIPTORS };

const COURSES = {
  'Humanities 9: English & Social Studies': {
    grade: '9',
    outcomes: {
      'Comprehension and Analysis': [
        'Analyzing Ideas and Themes',
        'Analyzing Text Organization and Structure',
        'Analyzing Language'
      ],
      'Composition and Communication': [
        'Generating Text Organization and Structure',
        'Generating Claims, Evidence, and Reasoning',
        'Style and Revision'
      ],
      'Understanding and Applying Concepts': [
        'Civics and Citizenship',
        'Economics, Trade, and Markets',
        'Place, Space, and Human - Environment Interaction',
        'Change, Continuity, and Perspectives'
      ],
      'Inquiry and Action': [
        'Researching and Inquiring',
        'Communicating Conclusions and Taking Action'
      ]
    }
  },
  'Humanities 10: English & Social Studies': {
    grade: '10',
    outcomes: {
      'Comprehension and Analysis': [
        'Analyzing Ideas and Themes',
        'Analyzing Text Organization and Structure',
        'Analyzing Language'
      ],
      'Composition and Communication': [
        'Generating Text Organization and Structure',
        'Generating Claims, Evidence, and Reasoning',
        'Style and Revision'
      ],
      'Understanding and Applying Concepts': [
        'Civics and Citizenship',
        'Economics, Trade, and Markets',
        'Place, Space, and Human - Environment Interaction',
        'Change, Continuity, and Perspectives'
      ],
      'Inquiry and Action': [
        'Researching and Inquiring',
        'Communicating Conclusions and Taking Action'
      ]
    }
  }
};

const ASSESSMENT_TYPES = [
  'Analytical Essay',
  'Timed In-Class Writing',
  'Research Project',
  'Oral Presentation',
  'Socratic Seminar',
  'Structured Debate',
  'Multimedia Composition',
  'Journal Response',
  'Group Project',
  'Position Paper',
  'Creative Writing',
  'Literary Analysis',
  'Rhetorical Analysis',
  'Argument Essay',
  'Synthesis Essay'
];

const EMPTY_CRITERION = {
  id: 1,
  name: '',
  reportingCategory: '',
  learningOutcome: '',
  descriptors: { ...EMPTY_DESCRIPTORS }
};

const getOutcomeByIndex = (allOutcomes, index) => allOutcomes[index] || '';

const getReportingCategoryForOutcome = (course, learningOutcome) => {
  if (!course || !learningOutcome) return '';
  const categories = Object.entries(course.outcomes);
  for (let i = 0; i < categories.length; i += 1) {
    const [category, outcomes] = categories[i];
    if (outcomes.includes(learningOutcome)) return category;
  }
  return '';
};

const createCriterion = (id, name, learningOutcome) => ({
  id,
  name,
  reportingCategory: '',
  learningOutcome,
  descriptors: getDescriptorsForOutcome(learningOutcome)
});

const buildCriteriaFromAssessment = (type, course) => {
  const allOutcomes = course ? Object.values(course.outcomes).flat() : [];
  const startId = Date.now();

  const map = {
    'Analytical Essay': ['Thesis & Insight', 'Evidence & Analysis', 'Organization & Style', 'Conventions & Citation'],
    'Timed In-Class Writing': ['Response to Prompt', 'Evidence Under Time', 'Coherence & Control', 'Language Conventions'],
    'Research Project': ['Inquiry Question', 'Source Integration', 'Analysis & Conclusions', 'Communication of Findings'],
    'Oral Presentation': ['Content Knowledge', 'Use of Evidence', 'Organization & Clarity', 'Delivery & Engagement'],
    'Socratic Seminar': ['Preparation', 'Speaking & Listening', 'Reasoning & Evidence', 'Depth of Inquiry'],
    'Structured Debate': ['Claim & Position', 'Evidence & Rebuttal', 'Organization of Argument', 'Delivery & Teamwork'],
    'Multimedia Composition': ['Message & Purpose', 'Use of Media Elements', 'Evidence & Accuracy', 'Technical & Design Quality'],
    'Journal Response': ['Reflection & Insight', 'Connection to Learning', 'Reasoning & Support', 'Writing Clarity'],
    'Group Project': ['Contribution to Team', 'Collaboration Skills', 'Project Quality', 'Process & Reflection'],
    'Position Paper': ['Position & Focus', 'Evidence & Counterargument', 'Reasoning & Persuasion', 'Writing Conventions'],
    'Creative Writing': ['Originality & Voice', 'Craft & Technique', 'Structure & Flow', 'Language Control'],
    'Literary Analysis': ['Interpretation of Text', 'Use of Quotations', 'Analytical Reasoning', 'Organization & Conventions'],
    'Rhetorical Analysis': ['Rhetorical Situation', 'Device Analysis', 'Evidence & Explanation', 'Clarity & Academic Style'],
    'Argument Essay': ['Claim & Thesis', 'Support & Evidence', 'Counterclaim & Rebuttal', 'Organization & Conventions'],
    'Synthesis Essay': ['Synthesis Thesis', 'Source Integration', 'Comparative Analysis', 'Academic Writing Quality']
  };

  const names = map[type];
  if (!names) return [EMPTY_CRITERION];

  return names.map((n, i) =>
    createCriterion(startId + i, n, getOutcomeByIndex(allOutcomes, i))
  );
};

/* ══════════════════════════════════════════════════════════════
   Build a Google-Docs-friendly HTML table from current rubric.
   ══════════════════════════════════════════════════════════════ */
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildRubricHtml = ({
  rubricTitle,
  selectedCourse,
  assignmentType,
  teacherName,
  criteria
}) => {
  const titleBlock = `
    <div style="font-family:Arial,sans-serif;margin-bottom:12px;">
      <div style="font-size:10pt;letter-spacing:1.5px;color:#888;text-transform:uppercase;">
        HKIS Humanities Department
      </div>
      <div style="font-size:18pt;color:${CRITERION_COLOR.header};font-weight:bold;margin-top:4px;">
        ${escapeHtml(rubricTitle || 'Untitled Rubric')}
      </div>
      <div style="font-size:10pt;color:#666;margin-top:4px;">
        ${escapeHtml(selectedCourse || 'No course selected')}${
    assignmentType ? ' · ' + escapeHtml(assignmentType) : ''
  }${teacherName ? ' · ' + escapeHtml(teacherName) : ''}
      </div>
    </div>
  `;

  // Criterion header gets its own warm-brown color, then BLACK divider, then the four scale headers
  // each separated from the next by another BLACK divider.
  const headerRow = `
    <tr>
      <th style="background-color:${CRITERION_COLOR.header};color:#ffffff;padding:8px;border:1px solid #000000;border-right:2px solid #000000;text-align:left;font-family:Arial,sans-serif;font-size:11pt;width:18%;">Criterion</th>
      ${HKIS_LEVELS.map(
        (l, idx) => `
        <th style="background-color:${l.borderColor};color:#ffffff;padding:8px;border:1px solid #000000;${
          idx < HKIS_LEVELS.length - 1 ? 'border-right:2px solid #000000;' : ''
        }text-align:center;font-family:Arial,sans-serif;font-size:11pt;">
          ${escapeHtml(l.name)}
        </th>`
      ).join('')}
    </tr>
  `;

  const bodyRows = criteria
    .map((c, idx) => {
      const stripeBg = idx % 2 === 0 ? '#ffffff' : '#fafafa';
      const criterionCell = `
        <td style="background-color:${CRITERION_COLOR.wash};padding:10px;border:1px solid #000000;border-right:2px solid #000000;border-left:4px solid ${CRITERION_COLOR.accent};vertical-align:top;font-family:Arial,sans-serif;font-size:10pt;width:18%;">
          <div style="font-weight:bold;color:${CRITERION_COLOR.header};margin-bottom:4px;">
            ${escapeHtml(c.name || `Criterion ${idx + 1}`)}
          </div>
          ${
            c.reportingCategory
              ? `<div style="font-size:9pt;color:${CRITERION_COLOR.accent};font-weight:bold;margin-bottom:2px;">Reporting Category: ${escapeHtml(
                  c.reportingCategory
                )}</div>`
              : ''
          }
          ${
            c.learningOutcome
              ? `<div style="font-size:9pt;color:#777;font-style:italic;">${escapeHtml(
                  c.learningOutcome
                )}</div>`
              : ''
          }
        </td>
      `;

      const descriptorCells = HKIS_LEVELS.map((l, levelIdx) => {
        const text = c.descriptors[l.name] || '—';
        return `
          <td style="background-color:${stripeBg};padding:10px;border:1px solid #000000;${
            levelIdx < HKIS_LEVELS.length - 1 ? 'border-right:2px solid #000000;' : ''
          }vertical-align:top;font-family:Arial,sans-serif;font-size:10pt;line-height:1.45;">
            ${escapeHtml(text)}
          </td>
        `;
      }).join('');

      return `<tr>${criterionCell}${descriptorCells}</tr>`;
    })
    .join('');

  const table = `
    <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;border:2px solid #000000;" cellspacing="0" cellpadding="0">
      <thead>${headerRow}</thead>
      <tbody>${bodyRows}</tbody>
    </table>
  `;

  const footer = `
    <div style="margin-top:10px;padding:8px 10px;background-color:#f4f4f4;font-family:Arial,sans-serif;font-size:9pt;color:#555;">
      <b>HKIS General Academic Scale:</b> Emerging → Developing → Exhibiting → Exhibiting Depth
    </div>
  `;

  return `<div>${titleBlock}${table}${footer}</div>`;
};

const buildRubricPlainText = ({
  rubricTitle,
  selectedCourse,
  assignmentType,
  teacherName,
  criteria
}) => {
  const lines = [];
  lines.push('HKIS HUMANITIES DEPARTMENT');
  lines.push((rubricTitle || 'Untitled Rubric').toUpperCase());
  const meta = [selectedCourse, assignmentType, teacherName].filter(Boolean).join(' · ');
  if (meta) lines.push(meta);
  lines.push('');

  criteria.forEach((c, idx) => {
    lines.push(`CRITERION ${idx + 1}: ${c.name || ''}`);
    if (c.reportingCategory) lines.push(`  Reporting Category: ${c.reportingCategory}`);
    if (c.learningOutcome) lines.push(`  Learning Outcome: ${c.learningOutcome}`);
    HKIS_LEVELS.forEach((l) => {
      lines.push(`  • ${l.name}: ${c.descriptors[l.name] || '—'}`);
    });
    lines.push('');
  });

  lines.push('HKIS General Academic Scale: Emerging → Developing → Exhibiting → Exhibiting Depth');
  return lines.join('\n');
};

function App() {
  const [activeTab, setActiveTab] = useState('build');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [rubricTitle, setRubricTitle] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [criteria, setCriteria] = useState([EMPTY_CRITERION]);
  const [copyStatus, setCopyStatus] = useState('');

  const currentCourse = COURSES[selectedCourse] || null;

  const addCriterion = () => {
    setCriteria([
      ...criteria,
      {
        id: Date.now(),
        name: '',
        reportingCategory: '',
        learningOutcome: '',
        descriptors: { ...EMPTY_DESCRIPTORS }
      }
    ]);
  };

  const removeCriterion = (id) => {
    if (criteria.length > 1) setCriteria(criteria.filter((c) => c.id !== id));
  };

  const updateCriterion = (id, field, value) => {
    setCriteria(criteria.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const updateDescriptor = (id, level, value) => {
    setCriteria(
      criteria.map((c) =>
        c.id === id
          ? { ...c, descriptors: { ...c.descriptors, [level]: value } }
          : c
      )
    );
  };

  const handleLearningOutcomeChange = (id, selectedOutcome) => {
    setCriteria((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const previousTaxonomy = getDescriptorsForOutcome(c.learningOutcome);
        const newTaxonomy = getDescriptorsForOutcome(selectedOutcome);
        const mergedDescriptors = { ...c.descriptors };
        HKIS_LEVELS.forEach((level) => {
          const currentVal = c.descriptors[level.name] || '';
          const wasAutoFilled =
            currentVal === '' || currentVal === previousTaxonomy[level.name];
          if (wasAutoFilled) {
            mergedDescriptors[level.name] = newTaxonomy[level.name];
          }
        });
        return {
          ...c,
          learningOutcome: selectedOutcome,
          reportingCategory:
            c.reportingCategory ||
            getReportingCategoryForOutcome(currentCourse, selectedOutcome),
          descriptors: mergedDescriptors
        };
      })
    );
  };

  const handleAssessmentTypeChange = (value) => {
    setAssignmentType(value);
    if (!value) {
      setCriteria([EMPTY_CRITERION]);
      return;
    }
    const generatedCriteria = buildCriteriaFromAssessment(value, currentCourse);
    setCriteria(
      generatedCriteria.map((criterion) => ({
        ...criterion,
        reportingCategory: getReportingCategoryForOutcome(
          currentCourse,
          criterion.learningOutcome
        ),
        descriptors: getDescriptorsForOutcome(criterion.learningOutcome)
      }))
    );
  };

  const handleCopyForGoogleDocs = async () => {
    const payload = {
      rubricTitle,
      selectedCourse,
      assignmentType,
      teacherName,
      criteria
    };
    const html = buildRubricHtml(payload);
    const text = buildRubricPlainText(payload);

    try {
      if (
        typeof window !== 'undefined' &&
        window.ClipboardItem &&
        navigator.clipboard &&
        navigator.clipboard.write
      ) {
        const item = new window.ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' })
        });
        await navigator.clipboard.write([item]);
      } else {
        const container = document.createElement('div');
        container.contentEditable = 'true';
        container.innerHTML = html;
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        document.body.appendChild(container);

        const range = document.createRange();
        range.selectNodeContents(container);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');
        selection.removeAllRanges();
        document.body.removeChild(container);
      }

      setCopyStatus('copied');
      setTimeout(() => setCopyStatus(''), 2500);
    } catch (err) {
      console.error('Copy failed:', err);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus(''), 3000);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>HKIS Rubric Creator</h1>
      </div>

      <div className="app-wrapper">
        <div className="tabs">
          {['build', 'preview'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            >
              {tab === 'build' ? '📝 Build Rubric' : '👁️ Preview & Print'}
            </button>
          ))}
        </div>

        {activeTab === 'build' && (
          <div>
            <div className="card">
              <h2 className="card-title">Select Course</h2>
              <div className="field">
                <label>Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="course-select"
                >
                  <option value="">Choose a course…</option>
                  <optgroup label="Grade 9">
                    <option>Humanities 9: English &amp; Social Studies</option>
                  </optgroup>
                  <optgroup label="Grade 10">
                    <option>Humanities 10: English &amp; Social Studies</option>
                  </optgroup>
                </select>
              </div>
              {selectedCourse && (
                <div className="course-badge">
                  <span className="badge-dot" />
                  <span>
                    <strong>{selectedCourse}</strong>
                    <span className="badge-grade"> · Grade {currentCourse.grade}</span>
                  </span>
                </div>
              )}
            </div>

            <div className="card">
              <h2 className="card-title">Rubric Details</h2>
              <div className="grid-3">
                <div className="field">
                  <label>Assignment / Task Title</label>
                  <input
                    value={rubricTitle}
                    onChange={(e) => setRubricTitle(e.target.value)}
                    placeholder="e.g., Analytical Essay: Power & Identity"
                  />
                </div>
                <div className="field">
                  <label>Assessment Type</label>
                  <select
                    value={assignmentType}
                    onChange={(e) => handleAssessmentTypeChange(e.target.value)}
                  >
                    <option value="">Select type…</option>
                    {ASSESSMENT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Teacher Name</label>
                  <input
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="e.g., Ms. Chan"
                  />
                </div>
              </div>
            </div>

            <div className="criteria-header">
              <h2 className="card-title" style={{ margin: 0 }}>
                Assessment Criteria
              </h2>
              <button className="btn-primary" onClick={addCriterion}>
                + Add Criterion
              </button>
            </div>

            {criteria.map((criterion, index) => (
              <div key={criterion.id} className="card criterion-card">
                <div className="criterion-top">
                  <span
                    className="criterion-label"
                    style={{ color: CRITERION_COLOR.header }}
                  >
                    Criterion {index + 1}
                  </span>
                  {criteria.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={() => removeCriterion(criterion.id)}
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>

                <div className="grid-3" style={{ marginBottom: '16px' }}>
                  <div className="field">
                    <label>Criterion Name</label>
                    <input
                      value={criterion.name}
                      onChange={(e) =>
                        updateCriterion(criterion.id, 'name', e.target.value)
                      }
                      placeholder="e.g., Thesis & Argument, Use of Evidence…"
                    />
                  </div>
                  <div className="field">
                    <label>Reporting Category</label>
                    <select
                      value={criterion.reportingCategory || ''}
                      onChange={(e) =>
                        updateCriterion(
                          criterion.id,
                          'reportingCategory',
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        {selectedCourse
                          ? 'Select a reporting category…'
                          : '← Select a course first'}
                      </option>
                      {currentCourse &&
                        Object.keys(currentCourse.outcomes).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      <option value="Interdisciplinary">Interdisciplinary</option>
                      <option value="Process & Skills">Process & Skills</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Linked Learning Outcome</label>
                    <select
                      value={criterion.learningOutcome}
                      onChange={(e) =>
                        handleLearningOutcomeChange(criterion.id, e.target.value)
                      }
                    >
                      <option value="">
                        {selectedCourse
                          ? 'Select a learning outcome…'
                          : '← Select a course first'}
                      </option>
                      {currentCourse &&
                        (criterion.reportingCategory &&
                        currentCourse.outcomes[criterion.reportingCategory]
                          ? currentCourse.outcomes[
                              criterion.reportingCategory
                            ].map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))
                          : Object.entries(currentCourse.outcomes).map(
                              ([category, outcomes]) => (
                                <optgroup key={category} label={category}>
                                  {outcomes.map((o) => (
                                    <option key={o} value={o}>
                                      {o}
                                    </option>
                                  ))}
                                </optgroup>
                              )
                            ))}
                    </select>
                  </div>
                </div>

                <div className="descriptor-grid">
                  {HKIS_LEVELS.map((level) => (
                    <div key={level.name}>
                      <label
                        className="level-label"
                        style={{ color: level.borderColor }}
                      >
                        {level.name}
                      </label>
                      <textarea
                        value={criterion.descriptors[level.name]}
                        onChange={(e) =>
                          updateDescriptor(
                            criterion.id,
                            level.name,
                            e.target.value
                          )
                        }
                        placeholder={`What does ${level.name} look like here?`}
                        rows={7}
                        style={{
                          backgroundColor: level.color,
                          borderColor: level.borderColor
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="center-btn">
              <button
                className="btn-primary btn-large"
                onClick={() => setActiveTab('preview')}
              >
                Preview Rubric →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div>
            <div className="preview-header">
              <h2 className="card-title" style={{ margin: 0 }}>
                Rubric Preview
              </h2>
              <div className="preview-actions">
                <button
                  className="btn-primary"
                  onClick={handleCopyForGoogleDocs}
                  title="Copy rubric as a formatted table — paste directly into Google Docs"
                >
                  📋 Copy for Google Docs
                </button>
                <button className="btn-dark" onClick={() => window.print()}>
                  🖨️ Print Rubric
                </button>
              </div>
            </div>

            {copyStatus === 'copied' && (
              <div className="copy-toast copy-toast-success">
                ✅ Copied! Open your Google Doc and paste with <b>Ctrl/Cmd + V</b>.
              </div>
            )}
            {copyStatus === 'error' && (
              <div className="copy-toast copy-toast-error">
                ⚠️ Couldn't access the clipboard. Try again, or use Print → Save as PDF.
              </div>
            )}

            <div className="card printable" id="printable-rubric">
              <div className="rubric-header-block">
                <div className="rubric-school-tag">HKIS Humanities Department</div>
                <h1
                  className="rubric-main-title"
                  style={{ color: CRITERION_COLOR.header }}
                >
                  {rubricTitle || 'Untitled Rubric'}
                </h1>
                <p className="rubric-meta">
                  {selectedCourse || 'No course selected'}
                  {assignmentType && ` · ${assignmentType}`}
                  {teacherName && ` · ${teacherName}`}
                </p>
              </div>

              <table
                className="rubric-table"
                style={{ border: '2px solid #000000', borderCollapse: 'collapse' }}
              >
                <thead>
                  <tr>
                    <th
                      className="th-criterion"
                      style={{
                        backgroundColor: CRITERION_COLOR.header,
                        color: '#ffffff',
                        border: '1px solid #000000',
                        borderRight: COLUMN_DIVIDER
                      }}
                    >
                      Criterion
                    </th>
                    {HKIS_LEVELS.map((level, idx) => (
                      <th
                        key={level.name}
                        style={{
                          backgroundColor: level.borderColor,
                          color: '#ffffff',
                          border: '1px solid #000000',
                          borderRight:
                            idx < HKIS_LEVELS.length - 1
                              ? COLUMN_DIVIDER
                              : '1px solid #000000'
                        }}
                      >
                        {level.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion, index) => (
                    <tr key={criterion.id}>
                      <td
                        className="td-criterion"
                        style={{
                          backgroundColor: CRITERION_COLOR.wash,
                          borderLeft: `4px solid ${CRITERION_COLOR.accent}`,
                          borderTop: '1px solid #000000',
                          borderBottom: '1px solid #000000',
                          borderRight: COLUMN_DIVIDER
                        }}
                      >
                        <div
                          className="criterion-name"
                          style={{ color: CRITERION_COLOR.header }}
                        >
                          {criterion.name || `Criterion ${index + 1}`}
                        </div>
                        {criterion.reportingCategory && (
                          <div
                            className="criterion-reporting"
                            style={{ color: CRITERION_COLOR.accent }}
                          >
                            Reporting Category: {criterion.reportingCategory}
                          </div>
                        )}
                        {criterion.learningOutcome && (
                          <div className="criterion-outcome">
                            {criterion.learningOutcome}
                          </div>
                        )}
                      </td>
                      {HKIS_LEVELS.map((level, levelIdx) => (
                        <td
                          key={level.name}
                          className="td-descriptor"
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? '#ffffff' : '#fafafa',
                            borderTop: '1px solid #000000',
                            borderBottom: '1px solid #000000',
                            borderRight:
                              levelIdx < HKIS_LEVELS.length - 1
                                ? COLUMN_DIVIDER
                                : '1px solid #000000'
                          }}
                        >
                          {criterion.descriptors[level.name] || (
                            <span className="empty-descriptor">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="scale-footer">
                <strong>HKIS General Academic Scale:</strong> Emerging →
                Developing → Exhibiting → Exhibiting Depth
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;