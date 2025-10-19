import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import Header from "../components/Header";
import { Modal } from "react-bootstrap";
import AddCourseForm from "../components/AddCourseForm";
import FullscreenSpinner from "../components/FullscreenSpinner";
export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

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
      const res = await fetch(`${API_BASE}/api/courses/${courseId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const msg = await res.text();
        console.error("Delete failed:", res.status, msg);
        alert("Class not deleted. Please try again.");
        return;
      }
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
      alert("Class Dropped");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting class.");
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
      <Header />
      <div style={{ paddingBottom: "10rem" }}>
        <CourseTable
          courses={courses}
          showEdit
          onEdit={openEdit}
          showDanger
          onDanger={handleDrop}
        />
      </div>
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
