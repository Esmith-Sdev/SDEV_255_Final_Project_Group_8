import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../styles/AddCourseForm.css";
export default function AddClassForm({
  initialData = { subject: "", course: "", info: "", credits: "0" },
  onSubmit,
  submitLabel = "Submit",
}) {
  const [formData, setFormData] = useState(() => initialData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit?.({ ...formData, credits: Number(formData.credits) });
  };

  return (
    <div className="p-5">
      <Form onSubmit={handleSubmit}>
        <Row className="g-5 align-items-center">
          <Col md={3}>
            <Form.Label htmlFor="subject" visuallyHidden>
              Subject
            </Form.Label>
            <Form.Control
              id="subject"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </Col>
          <Col md={5}>
            <Form.Label htmlFor="course" visuallyHidden>
              Course
            </Form.Label>
            <Form.Control
              id="course"
              placeholder="Enter Course"
              value={formData.course}
              onChange={handleChange}
            />
          </Col>
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>Credits</InputGroup.Text>
              <Form.Select
                aria-label="Credits"
                value={formData.credits}
                onChange={handleChange}
                id="credits"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
        <Row className="g-3 pt-5">
          <Form.Group className="mb-3" controlId="info">
            <Form.Label>Course Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.info}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col xs="auto">
            <Button type="submit" className="mb-2">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
