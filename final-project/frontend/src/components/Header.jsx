import "../styles/Header.css";
import { useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  const getHeaderText = () => {
    switch (location.pathname) {
      case "/mycourses":
        return "My Courses";
      case "/addcourses":
        return "Add Course";
      case "/myclasses":
        return "My Classes";
      case "/addclasses":
        return "Add Classes";
      case "/login":
        return "Login";
      case "/signup":
        return "Sign Up";
      case "/cart":
        return "Shopping Cart";
    }
  };
  return (
    <div id="headerContainer">
      <div id="headerBackground">
        <h1 id="headerText">{getHeaderText()}</h1>
      </div>
    </div>
  );
}
