import React from "react";
import "./styles.css";

const courseList = [
  { id: 1, title: "HTML & CSS Basics", lessons: 5 },
  { id: 2, title: "JavaScript for Beginners", lessons: 5 },
  { id: 3, title: "React Fundamentals", lessons: 5 },
  { id: 4, title: "Python Basics", lessons: 5 },
  { id: 5, title: "Database with MySQL", lessons: 5 },
  { id: 6, title: "Node.js & Express", lessons: 5 },
];

function Progress() {
  const data = courseList.map((c) => {
    const done = JSON.parse(localStorage.getItem(`completed_lessons_${c.id}`) || "[]").length;
    const assignments = JSON.parse(localStorage.getItem(`assignments_${c.id}`) || "[]").length;
    const points = done * 10 + assignments * 20;
    return { ...c, done, assignments, points };
  });

  const totalPoints = data.reduce((sum, c) => sum + c.points, 0);
  const totalLessons = data.reduce((sum, c) => sum + c.lessons, 0);
  const doneLessons = data.reduce((sum, c) => sum + c.done, 0);
  const totalAssignments = data.reduce((sum, c) => sum + c.assignments, 0);
  const overallPercent = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0;

  return (
    <div className="progress-page">
      <h2 className="progress-title">My Progress</h2>
      <p className="progress-sub">Track your learning journey across all courses.</p>

      <div className="progress-summary">
        <div className="summary-card">
          <p className="summary-number">{totalPoints}</p>
          <p className="summary-label">Total Points</p>
        </div>
        <div className="summary-card">
          <p className="summary-number">{overallPercent}%</p>
          <p className="summary-label">Overall Completion</p>
        </div>
        <div className="summary-card">
          <p className="summary-number">{doneLessons}</p>
          <p className="summary-label">Lessons Completed</p>
        </div>
        <div className="summary-card">
          <p className="summary-number">{totalAssignments}</p>
          <p className="summary-label">Assignments Submitted</p>
        </div>
      </div>

      <div className="progress-table-wrapper">
        <h3>Course-wise Progress</h3>
        <table className="progress-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Lessons Done</th>
              <th>Total Lessons</th>
              <th>Assignments</th>
              <th>Points</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const percent = item.lessons > 0 ? Math.round((item.done / item.lessons) * 100) : 0;
              return (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.done}</td>
                  <td>{item.lessons}</td>
                  <td>{item.assignments}</td>
                  <td>{item.points}</td>
                  <td>
                    <div className="table-bar-outer">
                      <div className="table-bar-inner" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="bar-percent">{percent}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Progress;
