import { useState } from "react";
export default function Pagination({
  total,
  maxPage,
  currentPageProp,
  rowsPerPage,
  onPaginate,
}) {
  const [currentPage, setCurrentPage] = useState(currentPageProp);

  const handlePageSelect = (page) => {
    setCurrentPage(page);
    onPaginate(page);
  };

  const renderList = () => {
    const listItems = [];
    for (let index = 1; index <= maxPage; index++) {
      listItems.push(
        <button
          className={`page-link ${index === currentPage ? "active" : ""}`}
          onClick={() => handlePageSelect(index)}
        >
          {index}
        </button>
      );
    }
    return listItems;
  };

  const summary = () => {
    const summary = (
      <span>
        {total <= 0
          ? "Showing 0 records"
          : `Showing ${(currentPage - 1) * rowsPerPage + 1} to ${Math.min(
              currentPage * rowsPerPage,
              total
            )} of ${total}`}
      </span>
    );
    return summary;
  };

  return (
    <div className="d-flex justify-content-between">
      {summary()}
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageSelect(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {renderList().map((pageNumber, index) => (
            <li className="page-item" key={`page_number_${index}`}>
              {pageNumber}
            </li>
          ))}
          <li
            className={`page-item ${currentPage === maxPage ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageSelect(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
