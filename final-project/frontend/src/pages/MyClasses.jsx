import { useEffect, useState } from "react";

import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";
import FullscreenSpinner from "../components/FullscreenSpinner";
import { Button } from "react-bootstrap";
export default function MyClasses() {
  const [myClasses, setMyClasses] = useState([]);
  const studentId = "68e5bb88a9e6e78e1721688f"; //Test placeholder replace with dynamic login student ID
  const [loading, setLoading] = useState(false);
  const API_BASE = "https://sdev-255-final-project-group-8.onrender.com";

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/myclasses`);
        const data = await res.json();
        setMyClasses(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Load courses failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //Drop class
  const handleDrop = async (course) => {
    setLoading(true);
    try {
      const courseId = course._id;
      await fetch(`${API_BASE}/api/myclasses/${courseId}`, {
        method: "DELETE",
      });
      setMyClasses((prev) => prev.filter((c) => c._id !== courseId));
      if (!res.ok)
        throw (
          new Error("Class not dropped") &&
          alert("Course not dropped. Please contact an ADMIN or try again.")
        );
      alert("Class Dropped");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FullscreenSpinner show={loading} />
      <h2 className="text-center p-5">My Classes</h2>
      <div className="p">
        <SearchBar />
        <div className="d-flex align-items-center justify-content-center">
          <Button size="lg" variant="primary" className="mt-3 mb-5">
            Search
          </Button>
        </div>
        <div style={{ paddingBottom: "10rem" }}>
          <CourseTable
            courses={myClasses}
            showDanger
            onDanger={handleDrop}
            style={{ paddingBottom: "10rem" }}
          />
        </div>
      </div>
    </>
  );
}
