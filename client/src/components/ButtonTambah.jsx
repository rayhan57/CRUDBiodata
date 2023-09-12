import React from "react";
import { Button } from "react-bootstrap";

function ButtonTambah({
  setShowModal,
  setModalTitle,
  setModalFooter,
  formReset,
}) {
  return (
    <Button
      variant="success"
      onClick={() => {
        setShowModal(true);
        setModalTitle("Tambah Data");
        setModalFooter("Tambah");
        formReset();
      }}
    >
      <i className="fa-solid fa-plus"></i> Tambah
    </Button>
  );
}

export default ButtonTambah;
