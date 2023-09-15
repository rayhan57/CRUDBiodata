import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

function ModalData({
  showModal,
  setShowModal,
  modalFooter,
  handleCreate,
  handleUpdate,
  modalTitle,
  formData,
  handleInputChange,
}) {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Form onSubmit={modalFooter == "Tambah" ? handleCreate : handleUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicNama">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUmur">
            <Form.Label>Umur</Form.Label>
            <Form.Control
              type="number"
              name="umur"
              value={formData.umur}
              onChange={handleInputChange}
              min={0}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAlamat">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              as="textarea"
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>

          <Button variant="success" type="submit">
            {modalFooter}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalData;
