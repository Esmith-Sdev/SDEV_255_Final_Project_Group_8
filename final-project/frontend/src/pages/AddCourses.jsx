import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddClassForm from "../components/AddCourseForm";
import Header from "../components/Header";
import FullscreenSpinner from "../components/FullscreenSpinner";
export default function AddCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

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
  async function handleCreateCourse(payload) {
    setLoading(true);
    try {
      if (!userId) {
        alert("You must be logged in to create a course");
        return;
      }

      const res = await fetch(`${API_BASE}/api/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, teacher: userId }),
      });

      const msg = await res.text();
      if (!res.ok) throw new Error(msg || res.status);

      alert("Course created!");
      navigate("/mycourses");
    } catch (err) {
      console.error("Create course failed:", err);
      alert("Please fill out all fields");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <FullscreenSpinner show={loading} />
      <Header />
      <div style={{ paddingBottom: "10rem" }}>
        <AddClassForm onSubmit={handleCreateCourse} />
      </div>
    </>
  );
}
