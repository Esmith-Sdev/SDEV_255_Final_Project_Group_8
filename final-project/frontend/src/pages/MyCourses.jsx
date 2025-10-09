import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";
import { Modal } from "react-bootstrap";
import AddCourseForm from "../components/AddCourseForm";
export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const API_BASE = "https://sdev-255-final-project-group-8.onrender.com";

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_BASE}/api/courses`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCourses(data);
    })();
  }, []);

  const openEdit = (course) => {
    setEditing(course);
    setShowEdit(true);
  };
  const closeEdit = () => {
    setShowEdit(false);
    setEditing(null);
  };

  const saveEdit = async (updatedFields) => {
    const res = await fetch(`${API_BASE}/api/courses/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const updated = await res.json();
    setCourses((prev) =>
      prev.map((c) => (c._id === updated._id ? updated : c))
    );
    closeEdit();
  };

  return (
    <>
      <h2 className="text-center p-5">My Courses (Teacher)</h2>
      <CourseTable courses={courses} showEdit onEdit={openEdit} />
      <Modal
        show={showEdit}
        onHide={closeEdit}
        size="lg"
        fullscreen="lg-down"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editing && (
            <AddCourseForm
              initialData={{
                subject: editing.subject,
                course: editing.course,
                info: editing.info,
                credits: String(editing.credits ?? "0"),
              }}
              submitLabel="Save changes"
              onSubmit={saveEdit}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
