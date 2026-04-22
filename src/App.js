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
        'Change, Continuity, and Perspectives',,
      ],
      'Inquiry and Action':[
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
        'Change, Continuity, and Perspectives',,
      ],
      'Inquiry and Action':[
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
  descriptors: {
    Emerging: '',
    Developing: '',
    Exhibiting: '',
    'Exhibiting Depth': ''
  }
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
  criterionString,
  reportingCategory = ''
) => ({
  id,
  name,
  reportingCategory,
  learningOutcome,
  descriptors: {
    Emerging: `Beginning level: ${criterionString}`,
    Developing: `Developing level: ${criterionString}`,
    Exhibiting: `Proficient level: ${criterionString}`,
    'Exhibiting Depth': `Advanced level: ${criterionString}`
  }
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

  const currentCourse = COURSES[selectedCourse] || null;

  const addCriterion = () => {
    setCriteria([
      ...criteria,
      {
        id: Date.now(),
        name: '',
        reportingCategory: '',
        learningOutcome: '',
        descriptors: {
          Emerging: '',
          Developing: '',
          Exhibiting: '',
          'Exhibiting Depth': ''
        }
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
        )
      }))
    );
  };

  return (
    
<div> 
    <div className="header">
        <h1>HKIS Rubric Creator</h1>
      </div>


    <div className="app-wrapper">
      {/* ── Header ── */}

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
                    <option value="Interdisciplinary">Interdisciplinary</option>
                    <option value="Process & Skills">Process & Skills</option>
                  </select>
                </div>
                <div className="field">
                  <label>Linked Learning Outcome</label>
                  <select
                    value={criterion.learningOutcome}
                    onChange={(e) => {
                      const selectedOutcome = e.target.value;
                      updateCriterion(
                        criterion.id,
                        'learningOutcome',
                        selectedOutcome
                      );

                      if (!criterion.reportingCategory) {
                        updateCriterion(
                          criterion.id,
                          'reportingCategory',
                          getReportingCategoryForOutcome(
                            currentCourse,
                            selectedOutcome
                          )
                        );
                      }
                    }}
                  >
                    <option value="">
                      {selectedCourse
                        ? 'Select a learning outcome…'
                        : '← Select a course first'}
                    </option>
                    {currentCourse &&
                      Object.entries(currentCourse.outcomes).map(
                        ([category, outcomes]) => (
                          <optgroup key={category} label={category}>
                            {outcomes.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </optgroup>
                        )
                      )}
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
                      rows={5}
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
            {/* Rubric Header */}
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

            {/* Table */}
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