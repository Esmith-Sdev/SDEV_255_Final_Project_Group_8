import CourseTable from "../components/CourseTable";
import SearchBar from "../components/Searchbar";
import InfoPopUp from "../frontend/components/InfoPopUp";
import { Button } from "react-bootstrap";
export default function MyClasses() {
  return (
    <>
      <h2 className="text-center p-5">My Classes</h2>
      <div className="p">
        <SearchBar />
        <div className="d-flex align-items center justify-content-center">
          <Button size="lg" variant="primary" className="mt-3 mb-5">
            Search
          </Button>
        </div>
        <CourseTable />
      </div>
      <InfoPopUp />
    </>
  );
}
