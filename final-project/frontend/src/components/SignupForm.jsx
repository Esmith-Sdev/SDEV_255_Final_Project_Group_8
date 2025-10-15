import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FullscreenSpinner from "./FullscreenSpinner";
export default function SignUpFormComponent() {
  const [loading, setLoading] = useState(false);
  const API_BASE = "https://sdev-255-final-project-group-8.onrender.com";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isTeacher: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("User signed up with:", formData);
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.email.toLowerCase().trim(),
          password: formData.password,
          isTeacher: formData.isTeacher,
        }),
      });

      if (res.ok) {
        alert(
          formData.isTeacher ? "Teacher account made!" : "Student account made!"
        );
        window.location.href = "/login";
      } else if (res.status === 409) {
        alert("That email is already registered.");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-5 d-flex justify-content-center align-items-center">
        <FullscreenSpinner show={loading} />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="pt-3 pb-3" controlId="isTeacher">
            <Form.Check
              type="checkbox"
              label="Are you a Teacher?"
              name="isTeacher"
              checked={formData.isTeacher}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </>
  );
}
