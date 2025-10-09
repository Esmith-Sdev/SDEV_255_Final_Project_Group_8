import "../styles/CourseTable.css";
import { Table, Container, Button } from "react-bootstrap";
import { useState } from "react";
import InfoPopUp from "../components/InfoPopUp";
export default function CourseTable({
  courses = [],
  onAdd,
  onEdit,
  onDanger,
  showAdd = false,
  showDanger = false,
  showEdit = false,
}) {
  //Info modal state
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  //Info modal open handler
  const openInfo = (course) => {
    setSelectedCourse(course);
    setShowInfo(true);
  };

  //Info modal close handler
  const closeInfo = () => {
    setSelectedCourse(null);
    setShowInfo(false);
  };
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <Table
          striped
          hover
          variant="dark"
          style={{ width: "75vw" }}
          className="rounded-4 overflow-hidden"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Course</th>
              <th>Info</th>
              <th>Credits</th>
              {showAdd && <th>Add</th>}
              {showDanger && <th>Remove</th>}
              {showEdit && <th>Edit</th>}
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.subject}</td>
                <td>{course.course}</td>
                <td>
                  <Button
                    className="info-btn"
                    onClick={() => openInfo?.(course)}
                  >
                    <i className="bi bi-info"></i>
                  </Button>
                </td>
                <td>{course.credits}</td>
                {showAdd && (
                  <td>
                    <Button
                      className="add-btn"
                      variant="success"
                      onClick={() => onAdd?.(course)}
                    >
                      <i className="bi bi-plus"></i>
                    </Button>
                  </td>
                )}
                {showDanger && (
                  <td>
                    <Button
                      className="dash-btn"
                      variant="danger"
                      onClick={() => onDanger?.(course)}
                    >
                      <i className="bi bi-dash text-white"></i>
                    </Button>
                  </td>
                )}
                {showEdit && (
                  <td>
                    <Button
                      className="dash-btn"
                      variant="dark"
                      onClick={() => onEdit?.(course)}
                    >
                      <i className="bi bi-pencil text-white"></i>
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <InfoPopUp show={showInfo} onHide={closeInfo} course={selectedCourse} />
    </>
  );
}
