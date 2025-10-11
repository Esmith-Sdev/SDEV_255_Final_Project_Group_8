import React from "react";
import { Spinner } from "react-bootstrap";

export default function FullscreenSpinner({ show }) {
  if (!show) return null;
  return (
    <div className="fs-loader" role="alert" aria-live="assertive">
      <Spinner animation="border" role="status" />
    </div>
  );
}
