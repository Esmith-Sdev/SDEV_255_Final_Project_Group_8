import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
export default function TopNavbar() {
  return (
    <Navbar id="topNavbar" expand="md" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          CourseBuilder.io
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="me-3" as={Link} to="/">
              Home
            </Nav.Link>

            <NavDropdown
              id="dropdown-basic-button"
              title="My Classes"
              align="end"
              className="d-none d-md-block"
            >
              <NavDropdown.Item as={Link} to="/myclasses">
                My Classes
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/mycourses">
                My Courses
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/addclasses">
                Add Classes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/addcourses">
                Add Courses
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              className="ms-3 d-block d-md-none"
              as={Link}
              to="/myclasses"
            >
              My Classes
            </Nav.Link>

            <Nav.Link
              className="ms-3 d-block d-md-none"
              as={Link}
              to="/mycourses"
            >
              My Courses
            </Nav.Link>
            <Nav.Link
              className="ms-3 d-block d-md-none"
              as={Link}
              to="/myclasses"
            >
              My Classes
            </Nav.Link>
            <Nav.Link
              className="ms-3 d-block d-md-none"
              as={Link}
              to="/addcourses"
            >
              Add Courses
            </Nav.Link>
            <Nav.Link className="ms-3" as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
