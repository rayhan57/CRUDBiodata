import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

export function MyPagination({ data }) {
  const [currentPage, setCurrentPage] = useState(1); // State untuk melacak halaman aktif
  const dataPerPage = 10; // Jumlah data yang akan ditampilkan per halaman

  // Menghitung indeks data pertama dan terakhir untuk halaman saat ini
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const dataToShow = data === null ? [] : data.slice(firstIndex, lastIndex); // Mengambil data yang sesuai dengan halaman saat ini
  const totalPages = data === null ? [] : Math.ceil(data.length / dataPerPage); // Menghitung jumlah halaman yang diperlukan

  // Membuat array dari nomor halaman yang akan ditampilkan
  const pageNumbers = [...Array(totalPages).keys()].map(
    (pageNumber) => pageNumber + 1
  );

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
