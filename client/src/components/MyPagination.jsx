import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

function MyPagination({ data, setDataToShow }) {
  const [currentPage, setCurrentPage] = useState(1); // State untuk melacak halaman aktif
  const dataPerPage = 10; // Jumlah data yang akan ditampilkan per halaman

  useEffect(() => {
    // Menghitung indeks data pertama dan terakhir untuk halaman saat ini
    const lastIndex = currentPage * dataPerPage;
    const firstIndex = lastIndex - dataPerPage;

    // Menggunakan slice untuk mendapatkan data yang sesuai dengan halaman saat ini
    const newDataToShow =
      data === null ? [] : data.slice(firstIndex, lastIndex);

    setDataToShow(newDataToShow);
  }, [data, currentPage]);

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

export default MyPagination;
