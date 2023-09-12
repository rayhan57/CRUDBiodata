import mongoose from "mongoose";

const dbConnection = () => {
  const dbName = "crudbiodata";
  const uri = `mongodb+srv://rayhan57:gZi1qPwYLtkQcpr7@cluster0.l2vx9nd.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose
    .connect(uri)
    .then(() => {
      console.log("Terhubung ke database MongoDB");
    })
    .catch((error) =>
      console.log("Error saat menghubungkan ke database: ", error)
    );
};

export default dbConnection;
