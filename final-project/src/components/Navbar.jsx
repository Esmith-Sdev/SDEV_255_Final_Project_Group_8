import "../styles/Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav
      role="navigation"
      className="navbar sticky-top navbar-expand-lg navbar-light"
      style="background-color: var(--primary-color);"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CourseBuilder.io
        </Link>
      </div>
      <div className=".collapse.navbar-collapse">
        <div
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Link className="dropdown-item">My Classes</Link>
          <Link className="dropdown-item">Add Classes</Link>
        </div>
      </div>
    </nav>
  );
}
