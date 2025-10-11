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
  showEdit = false,
  showDanger = false,
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
              <th className="text-center">Info</th>
              <th className="text-center">Credits</th>
              {showAdd && <th className="text-center">Add</th>}
              {showEdit && <th className="text-center">Edit</th>}
              {showDanger && <th className="text-center">Remove</th>}
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.subject}</td>
                <td>{course.course}</td>
                <td className="text-center">
                  <Button
                    className="info-btn"
                    onClick={() => openInfo?.(course)}
                  >
                    <i className="bi bi-info"></i>
                  </Button>
                </td>
                <td className="text-center">{course.credits}</td>
                {showAdd && (
                  <td className="text-center">
                    <Button
                      className="add-btn"
                      variant="success"
                      onClick={() => onAdd?.(course)}
                    >
                      <i className="bi bi-plus"></i>
                    </Button>
                  </td>
                )}
                {showEdit && (
                  <td className="text-center">
                    <Button
                      className="pencil-btn"
                      variant="dark"
                      onClick={() => onEdit?.(course)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                  </td>
                )}
                {showDanger && (
                  <td className="text-center">
                    <Button
                      className="dash-btn"
                      variant="danger"
                      onClick={() => onDanger?.(course)}
                    >
                      <i className="bi bi-dash text-white"></i>
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
