const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blogdb", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("Mongodb Database Connect Successfully");
});
