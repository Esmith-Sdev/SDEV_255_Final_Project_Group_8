import { Table, Container } from "react-bootstrap";
export default function CourseTable() {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Table striped hover variant="dark" style={{ width: "75vw" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Course</th>
            <th>Info</th>
            <th>Credits</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>SDEV</td>
            <td>UI/UX Web Design</td>
            <td>
              <i className="bi bi-info-square-fill"></i>
            </td>
            <td>3</td>
            <td>
              <i className="bi bi-plus-square-fill"></i>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>SDEV</td>
            <td>Web Application Development</td>
            <td>
              <i className="bi bi-info-square-fill"></i>
            </td>
            <td>3</td>
            <td>
              <i className="bi bi-plus-square-fill"></i>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>SDEV</td>
            <td>Computing Logic</td>
            <td>
              <i className="bi bi-info-square-fill"></i>
            </td>
            <td>1.5</td>
            <td>
              <i className="bi bi-plus-square-fill"></i>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
