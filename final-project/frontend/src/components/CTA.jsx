import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getRole, getToken } from "../api/auth";
function handleCTA(role, token) {
  if (!token || !role) return { to: "/login" };
  if (role === "teacher") return { to: "/mycourses" };
  return { to: "/addclasses" };
}

export default function CTAButton() {
  const location = useLocation();
  const [role, setRole] = useState(getRole());
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    setRole(getRole());
    setToken(getToken());
  }, [location]);
  const { to } = handleCTA(role, token);

  return (
    <Button
      variant="primary"
      as={Link}
      to={to}
      size="lg"
      className="mt-5 mb-3 text-center"
      style={{ fontFamily: "Geologica" }}
    >
      Get Started
    </Button>
  );
}
