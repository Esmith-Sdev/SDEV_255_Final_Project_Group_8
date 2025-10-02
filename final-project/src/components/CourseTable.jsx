import "../styles/CourseTable.css";
import { Table, Container, Button } from "react-bootstrap";
export default function CourseTable() {
  return (
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
            <th>Add</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>SDEV</td>
            <td>UI/UX Web Design</td>
            <td>
              <Button className="info-btn">
                <i className="bi bi-info"></i>
              </Button>
            </td>
            <td>3</td>
            <td>
              <Button className="add-btn" variant="success">
                <i className="bi bi-plus"></i>
              </Button>
            </td>
            <td>
              <Button className="dash-btn" variant="danger">
                <i className="bi bi-dash text-white"></i>
              </Button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>SDEV</td>
            <td>Web Application Development</td>
            <td>
              <Button className="info-btn">
                <i className="bi bi-info"></i>
              </Button>
            </td>
            <td>3</td>
            <td>
              <Button className="add-btn" variant="success">
                <i className="bi bi-plus"></i>
              </Button>
            </td>
            <td>
              <Button className="dash-btn" variant="danger">
                <i className="bi bi-dash text-white"></i>
              </Button>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>SDEV</td>
            <td>Computing Logic</td>
            <td>
              <Button className="info-btn">
                <i className="bi bi-info"></i>
              </Button>
            </td>
            <td>1.5</td>
            <td>
              <Button className="add-btn" variant="success">
                <i className="bi bi-plus"></i>
              </Button>
            </td>
            <td>
              <Button className="dash-btn" variant="danger">
                <i className="bi bi-dash text-white"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
