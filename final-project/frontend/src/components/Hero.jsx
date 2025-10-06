import "../styles/Hero.css";
import { Container, Button, Image } from "react-bootstrap";
import ClassroomImage from "../assets/images/Classroom.jpg";
export default function Hero() {
  return (
    <div
      id="hero"
      style={{ minHeight: "50vh" }}
      className="d-flex align-items-center flex-column justify-content-center text-white"
    >
      <Container className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
        <Container
          className="text-center text-md-start m-6 align-items-center align-items-lg-start
          justify-content-center d-flex flex-column"
        >
          <h1 className="text-wrap">We Make It Easy</h1>
          <p className="lead">Whether you're a Teacher or Student</p>
        </Container>
        <Image
          src={ClassroomImage}
          width={400}
          height="auto"
          fluid
          rounded
          className="ms-md-4 object-fit-cover"
        />
      </Container>
      <div className="d-flex align-items center justify-content-center">
        <Button
          id="btnPrimary"
          varient="primary"
          size="lg"
          className="mt-5 mb-3"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
