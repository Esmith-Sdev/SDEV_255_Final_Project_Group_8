import { Modal } from "react-bootstrap";

export default function InfoPopUp({ show, onHide, course }) {
  if (!course) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{course.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{course.info}</p>
      </Modal.Body>
    </Modal>
  );
}
