import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Feedback from "./components/Feedback";
import TableData from "./components/TableData";
import ModalData from "./components/ModalData";
import SearchData from "./components/SearchData";
import ButtonTambah from "./components/ButtonTambah";
import MyPagination from "./components/MyPagination";

axios.defaults.baseURL = "https://crud-biodata-api.vercel.app/";

function App() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFooter, setModalFooter] = useState("");
  const [variant, setVariant] = useState("");
  const [textFeedback, setTextFeedback] = useState("");
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    nama: "",
    umur: "",
    alamat: "",
  });
  const [currentPage, setCurrentPage] = useState(1); // State untuk melacak halaman aktif
  const dataPerPage = 10; // Jumlah data yang akan ditampilkan per halaman
  // Menghitung indeks data pertama dan terakhir untuk halaman saat ini
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const dataToShow = data.slice(firstIndex, lastIndex); // Mengambil data yang sesuai dengan halaman saat ini
  const totalPages = Math.ceil(data.length / dataPerPage); // Menghitung jumlah halaman yang diperlukan
  // Membuat array dari nomor halaman yang akan ditampilkan
  const pageNumbers = [...Array(totalPages).keys()].map(
    (pageNumber) => pageNumber + 1
  );

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleCreate(e) {
    e.preventDefault();
    await axios.post("/create", formData);
    formReset();
    setShowModal(false);
    setShowFeedback(true);
    setVariant("success");
    setTextFeedback("<b>Sukses!</b> Data berhasil ditambahkan");
    getData();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await axios.put("/update", formData);
    formReset();
    setShowModal(false);
    setShowFeedback(true);
    setVariant("success");
    setTextFeedback("<b>Sukses!</b> Data berhasil diubah");
    getData();
  }

  async function handleDelete(id) {
    await axios.delete(`/delete?id=${id}`);
    getData();
  }

  async function handleSearch() {
    const searchResult = await axios.get(`/search?keyword=${searchText}`);
    setData(searchResult.data.data);
    if (searchResult.data.data.length === 0) {
      setShowFeedback(true);
      setVariant("danger");
      setTextFeedback("<b>Oops!</b> Data tidak ada");
    }
  }

  function formReset() {
    setFormData({
      nama: "",
      umur: "",
      alamat: "",
    });
  }

  async function getData() {
    try {
      const response = await axios.get("/");
      if (response.data.success) {
        const Data = response.data.data;
        setData(Data);
      } else {
        console.error("Gagal mengambil data dari server.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  setTimeout(() => {
    // Remove feedback in 5 seconds
    if (showFeedback) {
      setShowFeedback(false);
    }
  }, 5000);

  return (
    <Container className="mt-3">
      <Row className="text-center">
        <h1>BIODATA</h1>
      </Row>

      <Row className="mt-3 px-2">
        {showFeedback && (
          <Feedback
            variant={variant}
            text={textFeedback}
            setShowFeedback={setShowFeedback}
          />
        )}
        <Col className="p-0 mb-2">
          <ButtonTambah
            setShowModal={setShowModal}
            setModalTitle={setModalTitle}
            setModalFooter={setModalFooter}
            formReset={formReset}
          />
        </Col>
        <Col className="p-0 mb-2">
          <SearchData
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
          />
        </Col>
      </Row>

      <Row>
        <TableData
          data={dataToShow}
          setShowModal={setShowModal}
          setFormData={setFormData}
          setModalTitle={setModalTitle}
          setModalFooter={setModalFooter}
          handleDelete={handleDelete}
          setShowFeedback={setShowFeedback}
          setVariant={setVariant}
          setTextFeedback={setTextFeedback}
        />
      </Row>

      <ModalData
        showModal={showModal}
        setShowModal={setShowModal}
        modalFooter={modalFooter}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        modalTitle={modalTitle}
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <Row>
        <MyPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          pageNumbers={pageNumbers}
          totalPages={totalPages}
        />
      </Row>
    </Container>
  );
}

export default App;
