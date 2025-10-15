import SignUpFormComponent from "../components/SignUpForm";
import Header from "../components/Header";
import "../styles/Signup.css";
export default function Signup() {
  return (
    <>
      <Header />
      <div style={{ paddingBottom: "10rem" }}>
        <SignUpFormComponent />
      </div>
    </>
  );
}
