import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { login } from "../api/auth";
import FullscreenSpinner from "../components/FullscreenSpinner";

import "../styles/Signup.css";
import "../styles/Login.css";
import Header from "../components/Header";
export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Bad username and password");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <FullscreenSpinner show={loading} />
      <Header />
      <div className="p-5 d-flex justify-content-center align-items-center">
        <Form onSubmit={onSubmit}>
          <Form.Label htmlFor="username">Email</Form.Label>
          <Form.Control
            id="username"
            value={username}
            onChange={(e) => setU(e.target.value)}
          />
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            onChange={(e) => setP(e.target.value)}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              className="mt-2"
              style={{ width: "5rem" }}
              type="submit"
              id="loginBtn"
            >
              Login
            </Button>
            <Link className="mt-3" to="/signup">
              Not Registered? Click here to sign up.
            </Link>
          </div>
          {error && <div id="errorMsg">{error}</div>}
        </Form>
      </div>
    </>
  );
}
