import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";
import { Modal, Spinner } from "react-bootstrap";
import AddCourseForm from "../components/AddCourseForm";
import FullscreenSpinner from "../components/FullscreenSpinner";
export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
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

  const openEdit = (course) => {
    setEditing(course);
    setShowEdit(true);
  };
  const closeEdit = () => {
    setShowEdit(false);
    setEditing(null);
  };

  //Drop class
  const handleDrop = async (course) => {
    setLoading(true);
    try {
      const courseId = course._id;
      await fetch(`${API_BASE}/api/courses/${courseId}`, {
        method: "DELETE",
      });
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
      alert("Class Dropped");
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = async (updatedFields) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/courses/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (!res.ok)
        throw (
          new Error(`HTTP ${res.status}`) &&
          alert("Class not updated. Please make sure all fields are completed.")
        );
      const updated = await res.json();
      setCourses((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );
      closeEdit();
      alert("Class Updated");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FullscreenSpinner show={loading} />
      <h2 className="text-center p-5">My Courses (Teacher)</h2>
      <CourseTable
        courses={courses}
        showEdit
        onEdit={openEdit}
        showDanger
        onDanger={handleDrop}
      />
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
