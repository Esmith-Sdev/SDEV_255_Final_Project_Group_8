import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { login } from "../api/auth";
import FullscreenSpinner from "../components/FullscreenSpinner";
export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    setLoading(true);
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Please enter a valid username and password");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <FullscreenSpinner show={loading} />
      <div className="p-5">
        <Form onSubmit={onSubmit}>
          <Form.Label htmlFor="username">Username</Form.Label>
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
            {error && (
              <div style={{ color: "red" }} id="errorMsg">
                {error}
              </div>
            )}
            <Link className="mt-3" to="/signup">
              Not Registered? Click here to sign up.
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
