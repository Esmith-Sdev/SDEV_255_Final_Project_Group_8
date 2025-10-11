import { Link } from "react-router-dom";
export const Footer = () => {
    return (<footer>
        <div className="footer-section"></div>
        <div>
            <ul>
                <li><Link to="/Myclasses">My Classes</Link></li>
                <li><Link to="/AddCourses">Add Courses</Link></li>
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/AddClasses">Add Classes</Link></li>
                <li><Link to="/MyCourses">My Courses</Link></li>
                <li><Link to="/SignUp">Sign Up</Link></li>
            </ul>
            <ul>
                <li><a href="#">terms & conditions</a></li>
            </ul>
            <p>&copy; 2025 Course Builder.io . All rights reserved.</p>
        </div>
    </footer>);
};