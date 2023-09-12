import mongoose from "mongoose";

const biodataSchema = new mongoose.Schema({
  nama: String,
  umur: Number,
  alamat: String,
});

const Biodata = mongoose.model("Biodata", biodataSchema);

export default Biodata;
