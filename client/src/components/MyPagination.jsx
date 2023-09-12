import React from "react";
import { Pagination } from "react-bootstrap";

function MyPagination({
  currentPage,
  setCurrentPage,
  firstIndex,
  lastIndex,
  pageNumbers,
  totalPages,
}) {
  function prevPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />

      {pageNumbers.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={currentPage === pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={nextPage}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default MyPagination;
