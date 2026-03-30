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
      'English Language Arts': [
        'Analyze literary and informational texts for theme, author\'s purpose, and point of view, citing textual evidence',
        'Interpret bias and perspective in texts and media, considering context and audience',
        'Compare and synthesize ideas across multiple texts to identify cultural values and patterns',
        'Communicate ideas effectively through multiple modes including analytical essays, oral presentations, and multimedia',
        'Apply conventions of academic writing, including MLA citation, formal tone, and varied sentence structures',
        'Engage in collaborative discussions and oral presentations, building on others\' ideas and expressing viewpoints clearly',
        'Conduct short research tasks, integrating credible sources into writing and presentations'
      ],
      'Social Studies': [
        'Explain how geography and migration patterns influence settlement and cultural development',
        'Investigate why societies create systems and analyze how these reflect values and ideologies',
        'Evaluate how systems adapt to changing needs and mediate interactions among competing worldviews',
        'Analyze major turning points in history for shifts in power and unintended consequences',
        'Assess alternative definitions of progress, including sustainability and social equity',
        'Interpret historical sources and connect them to conceptual themes (identity, systems, progress)',
        'Use case studies to understand continuity, change, and cause-effect relationships in global contexts'
      ]
    }
  },
  'Humanities 10: English & Social Studies': {
    grade: '10',
    outcomes: {
      'English Language Arts': [
        'Analyze complex literary and informational texts for themes of ethics, power, and identity',
        'Evaluate author\'s purpose, tone, and rhetorical strategies',
        'Compose thesis-driven analytical essays and position papers with counterclaims',
        'Create narrative and multimedia compositions using stylistic techniques',
        'Apply advanced academic writing conventions including MLA citation',
        'Engage in Socratic seminars and structured debates using evidence-based reasoning',
        'Conduct sustained research projects synthesizing credible sources'
      ],
      'Social Studies': [
        'Investigate how power and access shape historical narratives across cultures',
        'Interpret artistic expression as historical and cultural evidence',
        'Analyze ethical dilemmas in global decision-making',
        'Evaluate multiple perspectives on social change, activism, and policy-making',
        'Examine storytelling and art as tools for resistance and social movements',
        'Identify patterns of inequality through data and historical case studies',
        'Apply research and inquiry skills to explore global issues'
      ]
    }
  },
  'Junior English': {
    grade: '11',
    outcomes: {
      'Learning Outcomes': [
        'Connect literature to life',
        'Recognize the social/historical context of literature',
        'Learn to analyze a variety of literary texts',
        'Explain and defend a point of view by substantiating ideas with accurate and relevant detail',
        'Develop an understanding of the power of writing and images to transform human experience',
        'Work towards establishing a personal voice and writing style in a variety of media',
        'Contribute to and learn from class and group discussions',
        'Speak articulately and confidently to an audience'
      ]
    }
  },
  'Senior English': {
    grade: '12',
    outcomes: {
      'Learning Outcomes': [
        'Communicate clearly and strategically in writing and orally for a variety of audiences, contexts, and purposes',
        'Engage with challenging and diverse forms of text, and grapple with complex perspectives across time and place',
        'Construct logical, robust, and informed arguments, assess the validity of their own thinking, and consider the merits of others\' arguments',
        'Engage in the analysis of rhetorical and literary techniques and stylistic features employed by authors and speakers',
        'Engage in writing and text production as process, including self-reflection, peer-assessment, and revision'
      ]
    }
  },
  'AP English Language & Composition': {
    grade: '11, 12',
    outcomes: {
      'Learning Outcomes': [
        'Develop formal and informal writing in the forms of narrative, expository, analytical, and argumentative pieces',
        'Demonstrate independent response and critical thinking about various concepts',
        'Develop an understanding of nonfiction writing and how an author can use various rhetorical techniques to craft an argument',
        'Work toward establishing a personal voice and writing style by practicing the writing process (prewriting, drafting, editing, revising, and publishing)',
        'Develop research skills and the ability to evaluate, use, and cite primary and secondary sources'
      ]
    }
  },
  'AP English Literature & Composition': {
    grade: '11, 12',
    outcomes: {
      'Learning Outcomes': [
        'Write to understand, to explain, and to evaluate literature',
        'Demonstrate independent response and critical thinking about various texts and concepts',
        'Work towards establishing a personal voice and writing style by practicing the writing process; practice various genres of writing including imaginative, persuasive, reflective, descriptive, and analytical',
        'Develop skills of analysis, synthesis, and evaluation through the appreciation and examination of how language is used in poetry, fiction, and drama'
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

function App() {
  const [activeTab, setActiveTab] = useState('build');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [rubricTitle, setRubricTitle] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [criteria, setCriteria] = useState([
    {
      id: 1,
      name: '',
      learningOutcome: '',
      descriptors: {
        Emerging: '',
        Developing: '',
        Exhibiting: '',
        'Exhibiting Depth': ''
      }
    }
  ]);

  const currentCourse = COURSES[selectedCourse] || null;

  const addCriterion = () => {
    setCriteria([
      ...criteria,
      {
        id: Date.now(),
        name: '',
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

  return (
    <div className="app-wrapper">
      {/* ── Header ── */}
      <div className="header">
        <h1>HKIS Rubric Creator</h1>
        <p>Humanities Department</p>
      </div>

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
                <optgroup label="Grade 11">
                  <option>Junior English</option>
                </optgroup>
                <optgroup label="Grade 12">
                  <option>Senior English</option>
                </optgroup>
                <optgroup label="AP Courses (Grades 11–12)">
                  <option>AP English Language &amp; Composition</option>
                  <option>AP English Literature &amp; Composition</option>
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
                  onChange={(e) => setAssignmentType(e.target.value)}
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

          {/* Scale Reference */}
          <div className="card">
            <h2 className="card-title">HKIS General Academic Scale</h2>
            <div className="scale-grid">
              {HKIS_LEVELS.map((level) => (
                <div
                  key={level.name}
                  className="scale-box"
                  style={{
                    backgroundColor: level.color,
                    borderLeft: `4px solid ${level.borderColor}`
                  }}
                >
                  <div
                    className="scale-name"
                    style={{ color: level.borderColor }}
                  >
                    {level.name}
                  </div>
                  <div className="scale-desc">{level.description}</div>
                </div>
              ))}
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

              <div className="grid-2" style={{ marginBottom: '16px' }}>
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
                  <label>Linked Learning Outcome</label>
                  <select
                    value={criterion.learningOutcome}
                    onChange={(e) =>
                      updateCriterion(
                        criterion.id,
                        'learningOutcome',
                        e.target.value
                      )
                    }
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
  );
}

export default App;