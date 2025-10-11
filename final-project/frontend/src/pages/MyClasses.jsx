import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";

import { Button } from "react-bootstrap";
export default function MyClasses() {
  const [myClasses, setMyClasses] = useState([]);
  const studentId = "68e5bb88a9e6e78e1721688f"; //Test placeholder replace with dynamic login student ID
  const API_BASE = "https://sdev-255-final-project-group-8.onrender.com"; //Once deployed replace with render URL

  //Load students current classes
  useEffect(() => {
    const fetchMyClasses = async () => {
      const res = await fetch(`${API_BASE}/api/myclasses`);
      const data = await res.json();
      setMyClasses(data);
    };
    fetchMyClasses();
  }, []);

  //Drop class
  const handleDrop = async (course) => {
    const courseId = course._id;
    await fetch(`${API_BASE}/api/myclasses/${courseId}`, {
      method: "DELETE",
    });
    setMyClasses((prev) => prev.filter((c) => c._id !== courseId));
  };

  return (
    <>
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
