import mongoose from "mongoose";

const biodataSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  umur: {
    type: Number,
    min: 0,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
});

const Biodata = mongoose.model("Biodata", biodataSchema);

export default Biodata;
