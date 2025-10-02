import "../styles/Searchbar.css";
export default function Searchbar() {
  return (
    <div className="d-flex flex-column align-items-center">
      <div id="searchBar">
        <i className="bi bi-search"></i>
        <input id="searchBarInput" type="text" placeholder="Search" />
      </div>
    </div>
  );
}
