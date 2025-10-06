import Teacher from "../assets/images/teacher.jpg";
import "../styles/HomeBody.css";
import { Container, Image } from "react-bootstrap";
import Student from "../assets/images/student.jpg";
export default function HomeBody() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Container className="p-5 mt-5 d-flex align-items-center justify-content-center flex-column">
        <h2>Teachers</h2>
        <hr
          style={{
            width: "50vw",
            borderTop: "3px solid black",
            borderRadius: "5px",
          }}
        ></hr>
        <Image
          src={Teacher}
          width={200}
          height={200}
          className="object-fit-cover p-3"
          roundedCircle
        ></Image>
        <p
          className="leader p-6 text-wrap text-center"
          style={{ width: "35vw", paddingTop: "2rem" }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam velit
          explicabo reiciendis! Quos, ipsum. Laboriosam aut fugit eos expedita
          ipsa dolorem, ducimus, recusandae dolore iusto explicabo modi nostrum,
          qui rem.
        </p>
      </Container>
      <Container className="p-5 mt-5 d-flex align-items-center justify-content-center flex-column">
        <h2>Students</h2>
        <hr
          style={{
            width: "50vw",
            borderTop: "3px solid black",
            borderRadius: "5px",
          }}
        ></hr>
        <Image
          src={Student}
          width={200}
          height={200}
          className="object-fit-cover p-3"
          roundedCircle
        ></Image>
        <p
          className="leader p-6 text-wrap text-center"
          style={{ width: "35vw", paddingTop: "2rem" }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam velit
          explicabo reiciendis! Quos, ipsum. Laboriosam aut fugit eos expedita
          ipsa dolorem, ducimus, recusandae dolore iusto explicabo modi nostrum,
          qui rem.
        </p>
      </Container>
    </div>
  );
}
