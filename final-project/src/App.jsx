import "./styles/App.css";
import TopNavbar from "./components/Navbar.jsx";
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
      <TopNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addclasses" element={<AddClasses />} />
        <Route path="/addcourses" element={<AddCourses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myclasses" element={<MyClasses />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
