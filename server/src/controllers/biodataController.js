import Biodata from "../models/biodataModel.js";

const handleResponse = (res, success, message, datas) => {
  res.json({ success, message, datas });
};

export const getAllData = async (req, res) => {
  try {
    const data = await Biodata.find({});
    handleResponse(res, true, "Data berhasil ditemukan", data);
  } catch (error) {
    console.log("Error saat membaca data dari database: ", error);
    handleResponse(
      res,
      false,
      "Terjadi kesalahan saat membaca data dari database",
      null
    );
  }
};

export const searchData = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const data = await Biodata.find({
      $or: [
        { nama: { $regex: new RegExp(keyword, "i") } },
        { alamat: { $regex: new RegExp(keyword, "i") } },
      ],
    });
    if (data.length === 0) {
      handleResponse(res, false, "Data tidak ditemukan", null);
    } else {
      handleResponse(res, true, "Data berhasil ditemukan", data);
    }
  } catch (error) {
    console.log("Error saat membaca data dari database: ", error);
    handleResponse(
      res,
      false,
      "Terjadi kesalahan saat membaca data dari database",
      null
    );
  }
};

export const createData = async (req, res) => {
  try {
    const newData = new Biodata(req.body);
    await newData.save();
    handleResponse(res, true, "Data berhasil disimpan", newData);
  } catch (error) {
    console.log("Error saat menyimpan data ke database: ", error);
    handleResponse(
      res,
      false,
      "Terjadi kesalahan saat menyimpan data ke database",
      null
    );
  }
};

export const updateData = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    const data = await Biodata.updateOne({ _id: id }, rest);
    handleResponse(res, true, "Data berhasil diupdate", data);
  } catch (error) {
    console.log("Error saat memperbarui data di database: ", error);
    handleResponse(
      res,
      false,
      "Terjadi kesalahan saat memperbarui data di database",
      null
    );
  }
};

export const deleteData = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Biodata.deleteOne({ _id: id });
    handleResponse(res, true, "Data berhasil dihapus", data);
  } catch (error) {
    console.log("Error saat menghapus data di database: ", error);
    handleResponse(
      res,
      false,
      "Terjadi kesalahan saat menghapus data di database",
      null
    );
  }
};
