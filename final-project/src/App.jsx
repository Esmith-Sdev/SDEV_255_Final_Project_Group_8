import "./styles/App.css";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import AddClasses from "./pages/AddClasses.jsx";
import AddCourses from "./pages/AddCourses.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MyClasses from "./pages/MyClasses.jsx";
import MyCourses from "./pages/MyCourses.jsx";
import Signup from "./pages/Signup.jsx";
function App() {
  return (
    <>
      <Navbar />
      <h1>Group 8</h1>
    </>
  );
}

export default App;
