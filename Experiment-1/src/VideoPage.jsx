import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

const courseVideos = {
  1: [
    { id: 1, title: "HTML Introduction", duration: "12:00", url: "https://www.youtube.com/embed/qz0aGYrrlhU" },
    { id: 2, title: "CSS Basics", duration: "14:30", url: "https://www.youtube.com/embed/yfoY53QXEnI" },
    { id: 3, title: "CSS Flexbox", duration: "18:00", url: "https://www.youtube.com/embed/fYq5PXgSsbE" },
    { id: 4, title: "CSS Grid", duration: "20:00", url: "https://www.youtube.com/embed/EiNiSFIPIQE" },
    { id: 5, title: "Responsive Design", duration: "16:00", url: "https://www.youtube.com/embed/srvUrASNj0s" },
  ],
  2: [
    { id: 1, title: "JS Introduction", duration: "10:00", url: "https://www.youtube.com/embed/W6NZfCO5SIk" },
    { id: 2, title: "Variables & Data Types", duration: "13:00", url: "https://www.youtube.com/embed/edlFjlzxkSI" },
    { id: 3, title: "Functions", duration: "15:00", url: "https://www.youtube.com/embed/xUI5Tsl2JpY" },
    { id: 4, title: "DOM Manipulation", duration: "18:00", url: "https://www.youtube.com/embed/0ik6X4DJKCc" },
    { id: 5, title: "Events", duration: "12:00", url: "https://www.youtube.com/embed/XF1_MlZ5l6M" },
  ],
  3: [
    { id: 1, title: "React Introduction", duration: "11:00", url: "https://www.youtube.com/embed/Tn6-PIqc4UM" },
    { id: 2, title: "JSX & Components", duration: "14:00", url: "https://www.youtube.com/embed/RVFAyFWO4go" },
    { id: 3, title: "State & Props", duration: "17:00", url: "https://www.youtube.com/embed/4pO-HcG2igk" },
    { id: 4, title: "useEffect Hook", duration: "15:00", url: "https://www.youtube.com/embed/0ZJgIjIuY7U" },
    { id: 5, title: "React Router", duration: "19:00", url: "https://www.youtube.com/embed/Law7wfdg_ls" },
  ],
  4: [
    { id: 1, title: "Python Introduction", duration: "10:00", url: "https://www.youtube.com/embed/_uQrJ0TkZlc" },
    { id: 2, title: "Variables & Types", duration: "12:00", url: "https://www.youtube.com/embed/khKv-8q7YmY" },
    { id: 3, title: "Loops & Conditions", duration: "14:00", url: "https://www.youtube.com/embed/DZwmZ8Usvnk" },
    { id: 4, title: "Functions", duration: "13:00", url: "https://www.youtube.com/embed/9Os0o3wzS_I" },
    { id: 5, title: "File Handling", duration: "16:00", url: "https://www.youtube.com/embed/Uh2ebFW8OYM" },
  ],
  5: [
    { id: 1, title: "MySQL Introduction", duration: "11:00", url: "https://www.youtube.com/embed/7S_tz1z_5bA" },
    { id: 2, title: "CREATE & INSERT", duration: "13:00", url: "https://www.youtube.com/embed/HXV3zeQKqGY" },
    { id: 3, title: "SELECT Queries", duration: "15:00", url: "https://www.youtube.com/embed/p3qvj9hO_Bo" },
    { id: 4, title: "JOINs", duration: "18:00", url: "https://www.youtube.com/embed/9yeOJ0ZMUYw" },
    { id: 5, title: "Indexes & Optimization", duration: "14:00", url: "https://www.youtube.com/embed/wR0jg0eQsZA" },
  ],
  6: [
    { id: 1, title: "Node.js Introduction", duration: "12:00", url: "https://www.youtube.com/embed/TlB_eWDSMt4" },
    { id: 2, title: "Express Setup", duration: "14:00", url: "https://www.youtube.com/embed/L72fhGm1tfE" },
    { id: 3, title: "REST API Basics", duration: "17:00", url: "https://www.youtube.com/embed/pKd0Rpw7O48" },
    { id: 4, title: "Middleware", duration: "13:00", url: "https://www.youtube.com/embed/lY6icfhap2o" },
    { id: 5, title: "Connecting to MongoDB", duration: "20:00", url: "https://www.youtube.com/embed/-0exw-9YJBo" },
  ],
};

function getStorageKey(courseId) {
  return `completed_lessons_${courseId}`;
}

function VideoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const lessons = course ? (courseVideos[course.id] || []) : [];
  const [activeLesson, setActiveLesson] = useState(lessons[0]);

  const [completed, setCompleted] = useState(() => {
    if (!course) return [];
    return JSON.parse(localStorage.getItem(getStorageKey(course.id)) || "[]");
  });

  useEffect(() => {
    if (course) {
      localStorage.setItem(getStorageKey(course.id), JSON.stringify(completed));
    }
  }, [completed, course]);

  function markDone(lessonId) {
    if (!completed.includes(lessonId)) {
      setCompleted((prev) => [...prev, lessonId]);
    }
  }

  if (!course) {
    return (
      <div className="video-error">
        <p>No course selected.</p>
        <button onClick={() => navigate("/courses")}>Go to Courses</button>
      </div>
    );
  }

  return (
    <div className="video-page">
      <div className="lesson-sidebar">
        <h3 className="sidebar-title">{course.title}</h3>
        <p className="sidebar-sub">{course.instructor}</p>
        <hr className="sidebar-hr" />
        <ul className="lesson-list">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              className={`lesson-item ${activeLesson?.id === lesson.id ? "active-lesson" : ""}`}
              onClick={() => setActiveLesson(lesson)}
            >
              <div className="lesson-info">
                <span className="lesson-title">
                  {completed.includes(lesson.id) ? "✅ " : "▶ "}
                  {lesson.title}
                </span>
                <span className="lesson-duration">{lesson.duration}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="sidebar-progress">
          <p>{completed.length} / {lessons.length} completed</p>
          <div className="progress-bar-outer">
            <div
              className="progress-bar-inner"
              style={{ width: `${(completed.length / lessons.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="video-main">
        {activeLesson && (
          <>
            <div className="video-player">
              <iframe
                src={`${activeLesson.url}?autoplay=0&rel=0`}
                title={activeLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-details">
              <h3>{activeLesson.title}</h3>
              <p className="video-course-name">Course: {course.title} &nbsp;|&nbsp; Duration: {activeLesson.duration}</p>
              <button
                className="mark-done-btn"
                onClick={() => markDone(activeLesson.id)}
                disabled={completed.includes(activeLesson.id)}
              >
                {completed.includes(activeLesson.id) ? "Completed ✅" : "Mark as Done"}
              </button>
            </div>

            <div className="video-description">
              <h4>About this Lesson</h4>
              <p>
                This lesson covers key concepts from {course.title}. Follow along with the
                instructor and practice what you learn. Use the lesson list on the left to
                navigate between topics.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoPage;
