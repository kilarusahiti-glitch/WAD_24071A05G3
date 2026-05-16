import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const courseList = [
  { id: 1, title: "HTML & CSS Basics", instructor: "John Smith", category: "Web Development" },
  { id: 2, title: "JavaScript for Beginners", instructor: "Sarah Lee", category: "Web Development" },
  { id: 3, title: "React Fundamentals", instructor: "Mike Davis", category: "Web Development" },
  { id: 4, title: "Python Basics", instructor: "Emily Clark", category: "Programming" },
  { id: 5, title: "Database with MySQL", instructor: "David Brown", category: "Database" },
  { id: 6, title: "Node.js & Express", instructor: "Chris Wilson", category: "Backend" },
];

const TOTAL_LESSONS = 5;

function Dashboard() {
  const navigate = useNavigate();

  const courseData = courseList.map((c) => {
    const done = JSON.parse(localStorage.getItem(`completed_lessons_${c.id}`) || "[]").length;
    const assignments = JSON.parse(localStorage.getItem(`assignments_${c.id}`) || "[]").length;
    const points = done * 10 + assignments * 20;
    const percent = Math.round((done / TOTAL_LESSONS) * 100);
    return { ...c, done, assignments, points, percent };
  });

  const totalLessons = courseList.length * TOTAL_LESSONS;
  const doneLessons = courseData.reduce((s, c) => s + c.done, 0);
  const totalAssignments = courseData.reduce((s, c) => s + c.assignments, 0);
  const totalPoints = courseData.reduce((s, c) => s + c.points, 0);
  const overallPct = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0;
  const activeCourses = courseData.filter((c) => c.done > 0).length;

  const quickLinks = [
    { label: "Courses", icon: "📚", desc: "Browse & watch all courses", path: "/courses" },
    { label: "Progress", icon: "📈", desc: "Track your learning journey", path: "/progress" },
    { label: "Contact", icon: "📧", desc: "Get help from our team", path: "/contact" },
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="greeting-small">DASHBOARD</p>
          <h2 className="greeting-name">Welcome back, Student 👋</h2>
          <p className="greeting-sub">Here's a summary of your learning activity on Tutly.</p>
        </div>
        <div className="batch-label">HTML CSS JS (Batch 1)</div>
      </div>

      {/* Top stats */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div>
            <p className="stat-number">{totalPoints}</p>
            <p className="stat-label">Total Points</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <div>
            <p className="stat-number">{overallPct}%</p>
            <p className="stat-label">Overall Completion</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div>
            <p className="stat-number">{doneLessons}</p>
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
        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <div>
            <p className="stat-number">{activeCourses}</p>
            <p className="stat-label">Active Courses</p>
          </div>
        </div>
      </div>

      <div className="dashboard-body">
        {/* Course progress cards */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h3>Course Progress</h3>
            <button className="dash-link-btn" onClick={() => navigate("/courses")}>View All →</button>
          </div>
          <div className="course-cards-grid">
            {courseData.map((c) => (
              <div key={c.id} className="course-card">
                <div className="course-card-top">
                  <div>
                    <p className="course-card-title">{c.title}</p>
                    <p className="course-card-sub">{c.instructor} · {c.category}</p>
                  </div>
                  <span className={`course-badge ${c.percent === 100 ? "badge-done" : c.percent > 0 ? "badge-active" : "badge-new"}`}>
                    {c.percent === 100 ? "Completed" : c.percent > 0 ? "In Progress" : "Not Started"}
                  </span>
                </div>
                <div className="course-card-bar-row">
                  <div className="progress-bar-outer">
                    <div className="progress-bar-inner" style={{ width: `${c.percent}%` }}></div>
                  </div>
                  <span className="bar-percent">{c.percent}%</span>
                </div>
                <div className="course-card-stats">
                  <span>📖 {c.done}/{TOTAL_LESSONS} lessons</span>
                  <span>📝 {c.assignments} assignments</span>
                  <span>🏆 {c.points} pts</span>
                </div>
                <button className="watch-btn course-card-btn" onClick={() => navigate("/video", { state: { course: courseList.find((x) => x.id === c.id) } })}>
                  Continue →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h3>Quick Links</h3>
          </div>
          <div className="quick-links-grid">
            {quickLinks.map((q) => (
              <div key={q.path} className="quick-card" onClick={() => navigate(q.path)}>
                <span className="quick-icon">{q.icon}</span>
                <p className="quick-label">{q.label}</p>
                <p className="quick-desc">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
