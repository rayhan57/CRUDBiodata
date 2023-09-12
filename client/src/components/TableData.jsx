import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

function TableData({
  data,
  setShowModal,
  setFormData,
  setModalTitle,
  setModalFooter,
  handleDelete,
  setShowFeedback,
  setVariant,
  setTextFeedback,
}) {
  const [permissionToChange, setPermissionToChange] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("SM-A305F") || userAgent.includes("Win64")) {
      setPermissionToChange(true);
    } else {
      setPermissionToChange(false);
    }
  });

  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Umur</th>
          <th>Alamat</th>
          {permissionToChange && <th>Aksi</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((biodata, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{biodata.nama}</td>
            <td>{biodata.umur}</td>
            <td>{biodata.alamat}</td>
            {permissionToChange && (
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="mb-1"
                  onClick={() => {
                    setShowModal(true);
                    setFormData({
                      id: biodata._id,
                      nama: biodata.nama,
                      umur: biodata.umur,
                      alamat: biodata.alamat,
                    });
                    setModalTitle("Ubah Data");
                    setModalFooter("Ubah");
                  }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Button>{" "}
                <Button
                  variant="danger"
                  className="mb-1"
                  size="sm"
                  onClick={() => {
                    const nama = data[index]["nama"];
                    const id = data[index]["_id"];
                    if (confirm(`Yakin ingin menghapus ${nama}`)) {
                      handleDelete(id);
                      setShowFeedback(true);
                      setVariant("success");
                      setTextFeedback("<b>Sukses!</b> Data berhasil dihapus");
                    }
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableData;
