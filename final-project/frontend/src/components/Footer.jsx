import "../styles/Footer.css";
export default function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <h2 style={{ fontSize: "2rem", paddingTop: "2rem" }}>Contact Us</h2>
        <hr
          style={{
            width: "50vw",
            borderTop: "3px solid black",
            borderRadius: "5px",
          }}
        ></hr>
        <ul>
          <li>
            <p>Email: SDEV255@gmail.com</p>
            <p>Phone: (111) - 222 -3333</p>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">terms & conditions</a>
          </li>
        </ul>
        <p>&copy; 2025 Course Builder.io . All rights reserved.</p>
      </div>
    </footer>
  );
}
