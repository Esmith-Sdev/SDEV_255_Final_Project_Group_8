import { Modal } from "react-bootstrap";

export default function InfoPopUp() {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum animi
            error eligendi laborum est quasi molestias laudantium quae sapiente
            nam aliquam maxime quia, quas fugit quidem cumque ipsa. Ut, sed.
            Dolor nemo corporis quos molestias odit cupiditate, earum neque
            ducimus at, maiores, dolore sit. Recusandae nam ullam nobis ducimus
            ipsam expedita sequi, illo tenetur possimus error, cum dolor vero
            iure? Quidem possimus inventore architecto. Ipsum eveniet porro iste
            vel, fuga dolorum odit aperiam quia impedit explicabo, odio autem
            eligendi minus! Laborum, ullam illum. Temporibus, voluptatem
            asperiores ducimus odit ratione blanditiis.
          </p>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}
