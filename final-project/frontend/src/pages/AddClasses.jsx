import { useEffect, useState } from "react";
import Header from "../components/Header";
import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";
import FullscreenSpinner from "../components/FullscreenSpinner";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function AddClasses() {
  const [courses, setCourses] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/courses`);
        const data = await res.json();
        setCourses(data);
      } catch (e) {
        console.error("Load courses failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //Add class to cart
  const handleAdd = async (course) => {
    setLoading(true);
    try {
      if (!userId) {
        alert("You must be logged in to add classes.");
        return;
      }

      const courseId = course._id;
      const url = `${API_BASE}/api/users/${userId}/cart`;
      console.log("POST", url, { courseId });

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const body = await res.text();
      console.log("status", res.status, "body:", body);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("Class added to Cart!");
      navigate("/cart");
    } catch (err) {
      console.error("Add failed:", err);
      alert("Class not added. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FullscreenSpinner show={loading} />

      <Header />
      <div className="p">
        <SearchBar />
        <div className="d-flex align-items-center justify-content-center">
          <Button size="lg" variant="outline-dark" className="mt-3 mb-5">
            Search
          </Button>
        </div>
        <div style={{ paddingBottom: "10rem" }}>
          <CourseTable courses={courses} showAdd onAdd={handleAdd} />
        </div>
      </div>
    </>
  );
}
