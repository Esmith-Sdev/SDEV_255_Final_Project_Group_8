import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import AddClassForm from "../components/AddCourseForm";
import FullscreenSpinner from "../components/FullscreenSpinner";
export default function AddCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = "https://sdev-255-final-project-group-8.onrender.com";

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/courses`);
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Load courses failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddCourse = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok)
        throw (
          new Error("Failed to add course") &&
          alert("Please fill out each field and try again.")
        );
      alert("Course Added!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FullscreenSpinner show={loading} />
      <h2 className="text-center p-5">Add Course (Teacher)</h2>
      <div style={{ paddingBottom: "10rem" }}>
        <AddClassForm onSubmit={handleAddCourse} />
      </div>
    </>
  );
}
