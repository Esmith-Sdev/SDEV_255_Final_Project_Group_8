import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";
import { Button } from "react-bootstrap";
export default function MyCourses() {
  return (
    <>
      <h2 className="text-center p-5">My Courses</h2>
      <div className="p">
        <SearchBar />
        <div className="d-flex align-items center justify-content-center">
          <Button variant="primary" size="lg" className="mt-3 mb-5">
            Search
          </Button>
        </div>
        <CourseTable />
      </div>
    </>
  );
}
