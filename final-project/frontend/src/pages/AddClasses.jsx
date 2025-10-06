import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";
import { Button } from "react-bootstrap";
export default function AddClasses() {
  return (
    <>
      <h2 className="text-center p-5">Add Classes</h2>
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
