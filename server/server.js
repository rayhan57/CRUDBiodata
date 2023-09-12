import express from "express";
import cors from "cors";
import {
  getAllData,
  searchData,
  createData,
  updateData,
  deleteData,
} from "./src/controllers/biodataController.js";
import dbConnection from "./src/server/dbConnection.js";

const app = express();
const port = 3000;

app
  .use(cors())
  .use(express.json())
  .listen(port, () => console.log(`Alamat Server: http://localhost:${port}`));

// Koneksi ke Database MongoDB
dbConnection();

// Operasi Read (GET) Data
app.get("/", getAllData);
// Operasi Cari Data
app.get("/search", searchData);
// Operasi Create (POST) Data
app.post("/create", createData);
// Operasi Update (PUT) Data
app.put("/update", updateData);
// Operasi Delete (DELETE) Data
app.delete("/delete", deleteData);
