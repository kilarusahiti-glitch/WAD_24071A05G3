import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const courseList = [
  { id: 1, title: "HTML & CSS Basics", instructor: "John Smith", lessons: 5, duration: "4 hours", category: "Web Development" },
  { id: 2, title: "JavaScript for Beginners", instructor: "Sarah Lee", lessons: 5, duration: "6 hours", category: "Web Development" },
  { id: 3, title: "React Fundamentals", instructor: "Mike Davis", lessons: 5, duration: "8 hours", category: "Web Development" },
  { id: 4, title: "Python Basics", instructor: "Emily Clark", lessons: 5, duration: "5 hours", category: "Programming" },
  { id: 5, title: "Database with MySQL", instructor: "David Brown", lessons: 5, duration: "3 hours", category: "Database" },
  { id: 6, title: "Node.js & Express", instructor: "Chris Wilson", lessons: 5, duration: "5 hours", category: "Backend" },
];

function getCompletedCount(courseId) {
  return JSON.parse(localStorage.getItem(`completed_lessons_${courseId}`) || "[]").length;
}

function getAssignmentCount(courseId) {
  return JSON.parse(localStorage.getItem(`assignments_${courseId}`) || "[]").length;
}

function Courses() {
  const [search, setSearch] = useState("");
  const [assignModal, setAssignModal] = useState(null); // course object
  const [file, setFile] = useState(null);
  const [submitMsg, setSubmitMsg] = useState("");
  const [, forceUpdate] = useState(0);
  const navigate = useNavigate();

  const totalCompleted = courseList.reduce((sum, c) => sum + getCompletedCount(c.id), 0);
  const totalLessons = courseList.reduce((sum, c) => sum + c.lessons, 0);
  const completionPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  const totalAssignments = courseList.reduce((sum, c) => sum + getAssignmentCount(c.id), 0);

  const filtered = courseList.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  function openAssignment(course) {
    setAssignModal(course);
    setFile(null);
    setSubmitMsg("");
  }

  function handleSubmitAssignment(e) {
    e.preventDefault();
    if (!file) {
      setSubmitMsg("Please select a file.");
      return;
    }
    const existing = JSON.parse(localStorage.getItem(`assignments_${assignModal.id}`) || "[]");
    existing.push({ name: file.name, submittedAt: new Date().toLocaleString() });
    localStorage.setItem(`assignments_${assignModal.id}`, JSON.stringify(existing));
    setSubmitMsg(`✅ "${file.name}" submitted successfully!`);
    setFile(null);
    forceUpdate((n) => n + 1);
  }

  return (
    <div className="courses-page">
      <div className="courses-header">
        <div>
          <p className="greeting-small">GOOD MORNING</p>
          <h2 className="greeting-name">Hi, Student 👋</h2>
          <p className="greeting-sub">Welcome to Tutly</p>
        </div>
        <div className="batch-label">HTML CSS JS (Batch 1)</div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <div>
            <p className="stat-number">{completionPct}%</p>
            <p className="stat-label">Course Completion</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div>
            <p className="stat-number">{totalCompleted}</p>
            <p className="stat-label">Lessons Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📝</span>
          <div>
            <p className="stat-number">{totalAssignments}</p>
            <p className="stat-label">Assignments Submitted</p>
          </div>
        </div>
      </div>

      <div className="courses-section">
        <div className="courses-top">
          <h3>All Courses</h3>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <table className="courses-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Title</th>
              <th>Instructor</th>
              <th>Lessons</th>
              <th>Duration</th>
              <th>Category</th>
              <th>Watch</th>
              <th>Assignment</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td>{course.title}</td>
                <td>{course.instructor}</td>
                <td>{course.lessons}</td>
                <td>{course.duration}</td>
                <td>{course.category}</td>
                <td>
                  <button className="watch-btn" onClick={() => navigate("/video", { state: { course } })}>
                    Watch
                  </button>
                </td>
                <td>
                  <button className="assign-btn" onClick={() => openAssignment(course)}>
                    Assignment
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>No courses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Assignment Modal */}
      {assignModal && (
        <div className="modal-overlay" onClick={() => setAssignModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Assignment — {assignModal.title}</h3>
            <p className="modal-sub">Upload your assignment file below.</p>

            <form onSubmit={handleSubmitAssignment}>
              <div className="form-group">
                <label>Select File</label>
                <input
                  type="file"
                  onChange={(e) => { setFile(e.target.files[0]); setSubmitMsg(""); }}
                />
              </div>
              {submitMsg && <p className="submit-msg">{submitMsg}</p>}
              <div className="modal-actions">
                <button type="submit" className="login-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={() => setAssignModal(null)}>Cancel</button>
              </div>
            </form>

            {/* Previously submitted */}
            {JSON.parse(localStorage.getItem(`assignments_${assignModal.id}`) || "[]").length > 0 && (
              <div className="submitted-list">
                <h4>Submitted Files</h4>
                <ul>
                  {JSON.parse(localStorage.getItem(`assignments_${assignModal.id}`) || "[]").map((a, i) => (
                    <li key={i}>📄 {a.name} <span className="submit-date">— {a.submittedAt}</span></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
