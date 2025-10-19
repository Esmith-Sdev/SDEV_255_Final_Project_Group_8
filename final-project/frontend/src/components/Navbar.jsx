import "../styles/Navbar.css";
import { getRole, logout, getToken } from "../api/auth";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

function setNavDropDown(role) {
  if (role === "teacher") {
    return [
      { id: "navMyCourses", label: "My Courses", to: "/mycourses" },
      { id: "navAddCourses", label: "Add Courses", to: "/addcourses" },
    ];
  }
  if (role === "student") {
    return [
      { id: "navMyClasses", label: "My Classes", to: "/myclasses" },
      { id: "navAddClasses", label: "Add Classes", to: "/addclasses" },
    ];
  }
  //Not logged in
  return [];
}
export default function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState(getRole());
  const isAuthed = !!role;
  const items = setNavDropDown(role);

  useEffect(() => {
    setRole(getRole());
  }, [location]);

  const handleLogout = () => {
    logout();
    setRole(null);
    navigate("/login");
  };

  return (
    <Navbar id="topNavbar" expand="md" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          CourseBuilder.io
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center justify-content-space-evenly">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {role === "student" && (
              <>
                <Nav.Link as={Link} to="/cart" id="navCartText">
                  <Button id="navCartBtn">Cart</Button>
                </Nav.Link>
              </>
            )}
            {items.length > 0 && (
              <NavDropdown
                id="dropdown-basic-button"
                title={role === "teacher" ? "Courses" : "Classes"}
                align="end"
                className="d-none d-md-block"
              >
                {items.map((it) => (
                  <NavDropdown.Item key={it.id} id={it.id} as={Link} to={it.to}>
                    {it.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
            {items.map((it) => (
              <Nav.Link
                key={`${it.id}-sm`}
                id={`${it.id}-sm`}
                className=" d-block d-md-none"
                as={Link}
                to={it.to}
              >
                {it.label}
              </Nav.Link>
            ))}
            {!isAuthed ? (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            ) : (
              <Button
                id="logoutBtn"
                variant="outline-dark"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
