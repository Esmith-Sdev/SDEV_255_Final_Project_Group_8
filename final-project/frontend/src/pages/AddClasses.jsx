import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";

import { Button } from "react-bootstrap";
export default function AddClasses() {
  const [courses, setCourses] = useState([]);
  const studentId = "68e5bb88a9e6e78e1721688f"; //Test placeholder replace with dynamic login student ID
  const API_BASE = "https://sdev-255-final-project-group-8.onrender.com"; //Once deployed replace with render URL

  //Fetch all courses
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_BASE}/api/courses`);
      const data = await res.json();
      setCourses(data);
    })();
  }, []);

  //Add class to myclasses
  const handleAdd = async (course) => {
    const res = await fetch(`${API_BASE}/api/myclasses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: course._id }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    setMyClasses(data); // server returns updated list
  };

  return (
    <>
      <h2 className="text-center p-5">Add Classes</h2>
      <div className="p">
        <SearchBar />
        <div className="d-flex align-items-center justify-content-center">
          <Button size="lg" variant="primary" className="mt-3 mb-5">
            Search
          </Button>
        </div>
        <CourseTable courses={courses} showAdd onAdd={handleAdd} />
      </div>
    </>
  );
}
