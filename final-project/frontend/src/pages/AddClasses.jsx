import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";
import FullscreenSpinner from "../components/FullscreenSpinner";
import { Button } from "react-bootstrap";
export default function AddClasses() {
  const [courses, setCourses] = useState([]);
  const studentId = "68e5bb88a9e6e78e1721688f"; //Test placeholder replace with dynamic login student ID
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

  //Add class to myclasses
  const handleAdd = async (course) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/myclasses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course._id }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok)
        throw (
          new Error(`HTTP ${res.status}`) &&
          alert("Class not added. Please contact an ADMIN or try again.")
        );
      alert("Class Added!");
      const data = await res.json();
      setMyClasses(data); // server returns updated list
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FullscreenSpinner show={loading} />
      <h2 className="text-center p-5">Add Classes</h2>
      <div className="p">
        <SearchBar />
        <div className="d-flex align-items-center justify-content-center">
          <Button size="lg" variant="primary" className="mt-3 mb-5">
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
