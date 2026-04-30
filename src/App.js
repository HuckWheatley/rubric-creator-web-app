import React, { useState } from 'react';
import './App.css';

const HKIS_LEVELS = [
  {
    name: 'Emerging',
    color: '#e8f4fd',
    borderColor: '#3498db',
    description: 'Demonstrates emerging proficiency in the standard.'
  },
  {
    name: 'Developing',
    color: '#fef9e7',
    borderColor: '#f39c12',
    description: 'Demonstrates foundational knowledge but not yet exhibiting proficiency.'
  },
  {
    name: 'Exhibiting',
    color: '#eafaf1',
    borderColor: '#27ae60',
    description: 'Exhibits proficiency — demonstrates targeted understanding of knowledge and skills.'
  },
  {
    name: 'Exhibiting Depth',
    color: '#f4ecf7',
    borderColor: '#8e44ad',
    description: 'Transfers learning to authentic situations with creativity and sophistication.'
  }
];

/* ══════════════════════════════════════════════════════════════
   HKIS Schoolwide ELA + SS Reporting Taxonomy descriptors.
   Keyed by Learning Outcome name. When a teacher picks a
   learning outcome, we auto-fill all four descriptor boxes.
   ══════════════════════════════════════════════════════════════ */
const TAXONOMY_DESCRIPTORS = {
  /* ── ELA: Comprehension and Analysis ── */
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

  /* ── ELA: Composition and Communication ── */
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

  /* ── SS: Understanding and Applying Concepts ── */
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

  /* ── SS: Inquiry and Action ── */
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

const createCriterion = (
  id,
  name,
  learningOutcome,
  _criterionString,
  reportingCategory = ''
) => ({
  id,
  name,
  reportingCategory,
  learningOutcome,
  // Auto-fill from taxonomy when we know the outcome; otherwise blank.
  descriptors: getDescriptorsForOutcome(learningOutcome)
});

const buildCriteriaFromAssessment = (type, course) => {
  const allOutcomes = course ? Object.values(course.outcomes).flat() : [];
  const startId = Date.now();

  if (type === 'Analytical Essay') {
    return [
      createCriterion(startId, 'Placeholder text', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Placeholder text', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Placeholder text', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Placeholder text', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Timed In-Class Writing') {
    return [
      createCriterion(startId, 'Response to Prompt', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Evidence Under Time', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Coherence & Control', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Language Conventions', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Research Project') {
    return [
      createCriterion(startId, 'Inquiry Question', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Source Integration', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Analysis & Conclusions', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Communication of Findings', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Oral Presentation') {
    return [
      createCriterion(startId, 'Content Knowledge', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Use of Evidence', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Organization & Clarity', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Delivery & Engagement', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Socratic Seminar') {
    return [
      createCriterion(startId, 'Preparation', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Speaking & Listening', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Reasoning & Evidence', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Depth of Inquiry', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Structured Debate') {
    return [
      createCriterion(startId, 'Claim & Position', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Evidence & Rebuttal', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Organization of Argument', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Delivery & Teamwork', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Multimedia Composition') {
    return [
      createCriterion(startId, 'Message & Purpose', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Use of Media Elements', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Evidence & Accuracy', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Technical & Design Quality', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Journal Response') {
    return [
      createCriterion(startId, 'Reflection & Insight', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Connection to Learning', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Reasoning & Support', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Writing Clarity', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Group Project') {
    return [
      createCriterion(startId, 'Contribution to Team', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Collaboration Skills', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Project Quality', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Process & Reflection', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Position Paper') {
    return [
      createCriterion(startId, 'Position & Focus', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Evidence & Counterargument', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Reasoning & Persuasion', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Writing Conventions', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Creative Writing') {
    return [
      createCriterion(startId, 'Originality & Voice', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Craft & Technique', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Structure & Flow', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Language Control', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Literary Analysis') {
    return [
      createCriterion(startId, 'Interpretation of Text', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Use of Quotations', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Analytical Reasoning', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Organization & Conventions', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Rhetorical Analysis') {
    return [
      createCriterion(startId, 'Rhetorical Situation', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Device Analysis', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Evidence & Explanation', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Clarity & Academic Style', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Argument Essay') {
    return [
      createCriterion(startId, 'Claim & Thesis', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Support & Evidence', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Counterclaim & Rebuttal', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Organization & Conventions', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  if (type === 'Synthesis Essay') {
    return [
      createCriterion(startId, 'Synthesis Thesis', getOutcomeByIndex(allOutcomes, 0), 'Placeholder text'),
      createCriterion(startId + 1, 'Source Integration', getOutcomeByIndex(allOutcomes, 1), 'Placeholder text'),
      createCriterion(startId + 2, 'Comparative Analysis', getOutcomeByIndex(allOutcomes, 2), 'Placeholder text'),
      createCriterion(startId + 3, 'Academic Writing Quality', getOutcomeByIndex(allOutcomes, 3), 'Placeholder text')
    ];
  }

  return [EMPTY_CRITERION];
};

function App() {
  const [activeTab, setActiveTab] = useState('build');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [rubricTitle, setRubricTitle] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [criteria, setCriteria] = useState([EMPTY_CRITERION]);
  const [autoFillReportingCategories, setAutoFillReportingCategories] = useState(true);

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

  /* ── Single handler so we can update outcome + category +
        auto-fill the 4 descriptors in one state set ── */
  const handleLearningOutcomeChange = (id, selectedOutcome) => {
    setCriteria((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;

        // If a descriptor was manually edited (anything nonempty that
        // doesn't match the previous taxonomy entry), keep it — otherwise
        // auto-fill from the taxonomy.
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
        reportingCategory: autoFillReportingCategories
          ? getReportingCategoryForOutcome(
              currentCourse,
              criterion.learningOutcome
            )
          : '',
        descriptors: getDescriptorsForOutcome(criterion.learningOutcome)
      }))
    );
  };

  return (
    <div>
      <div className="header"> 
        
        <h1>
          <img src="logohkis512.png" width="80" height="80" alt="HKIS Logo" />
          HKIS Rubric Creator
        </h1>
      </div>

      <div className="app-wrapper">
        {/* ── Tabs ── */}
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

        {/* ══════════════ BUILD TAB ══════════════ */}
        {activeTab === 'build' && (
          <div>
            {/* Course Selection */}
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

          {/* Rubric Details */}
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
                <label
                  title="Auto-fill reporting categories when selecting assessment"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '8px',
                    fontSize: '13px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={autoFillReportingCategories}
                    onChange={(e) => setAutoFillReportingCategories(e.target.checked)}
                  />
                  Auto-fill reporting categories
                </label>
              </div>
              <div className="field">
                <label>Teacher Name</label>
                <input
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="e.g., Mr. Zen"
                />
              </div>
            </div>
          </div>


            {/* Criteria */}
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
                  <span className="criterion-label">Criterion {index + 1}</span>
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

        {/* ══════════════ PREVIEW TAB ══════════════ */}
        {activeTab === 'preview' && (
          <div>
            <div className="preview-header">
              <h2 className="card-title" style={{ margin: 0 }}>
                Rubric Preview
              </h2>
              <button className="btn-dark" onClick={() => window.print()}>
                🖨️ Print Rubric
              </button>
            </div>

            <div className="card printable" id="printable-rubric">
              <div className="rubric-header-block">
                <div className="rubric-school-tag">HKIS Humanities Department</div>
                <h1 className="rubric-main-title">
                  {rubricTitle || 'Untitled Rubric'}
                </h1>
                <p className="rubric-meta">
                  {selectedCourse || 'No course selected'}
                  {assignmentType && ` · ${assignmentType}`}
                  {teacherName && ` · ${teacherName}`}
                </p>
              </div>

              <table className="rubric-table">
                <thead>
                  <tr>
                    <th className="th-criterion">Criterion</th>
                    {HKIS_LEVELS.map((level) => (
                      <th
                        key={level.name}
                        style={{ backgroundColor: level.borderColor }}
                      >
                        {level.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion, index) => (
                    <tr
                      key={criterion.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#faf8f5' : 'white'
                      }}
                    >
                      <td className="td-criterion">
                        <div className="criterion-name">
                          {criterion.name || `Criterion ${index + 1}`}
                        </div>
                        {criterion.reportingCategory && (
                          <div className="criterion-reporting">
                            Reporting Category: {criterion.reportingCategory}
                          </div>
                        )}
                        {criterion.learningOutcome && (
                          <div className="criterion-outcome">
                            {criterion.learningOutcome}
                          </div>
                        )}
                      </td>
                      {HKIS_LEVELS.map((level) => (
                        <td
                          key={level.name}
                          className="td-descriptor"
                          style={{ borderLeft: `3px solid ${level.borderColor}` }}
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