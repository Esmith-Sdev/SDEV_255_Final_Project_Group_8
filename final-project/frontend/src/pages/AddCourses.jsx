import AddClassForm from "../components/AddCourseForm";
export default function AddCourses() {
  return (
    <>
      <h2 className="text-center p-5">Add Course</h2>
      <div style={{ paddingBottom: "10rem" }}>
        <AddClassForm />
      </div>
    </>
  );
}
