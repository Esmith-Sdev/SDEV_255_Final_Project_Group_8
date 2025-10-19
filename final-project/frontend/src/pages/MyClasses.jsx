import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";
import FullscreenSpinner from "../components/FullscreenSpinner";
import { Button } from "react-bootstrap";
export default function MyClasses() {
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}/myclasses`);
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
      const res = await fetch(
        `${API_BASE}/api/users/${userId}/myclasses/${courseId}`,
        {
          method: "DELETE",
        }
      );
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
      <Header />
      <div className="p">
        <SearchBar />
        <div className="d-flex align-items-center justify-content-center">
          <Button size="lg" variant="outline-dark" className="mt-3 mb-5">
            Search
          </Button>
        </div>
        <div
          style={{
            paddingBottom: "10rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CourseTable
            courses={myClasses}
            showDanger
            onDanger={handleDrop}
            style={{ paddingBottom: "10rem" }}
          />
          <Button
            size="lg"
            variant="primary"
            className="mt-3 mb-5"
            style={{ width: "25vw" }}
            as={Link}
            to="/addclasses"
          >
            Add Classes
          </Button>
        </div>
      </div>
    </>
  );
}
