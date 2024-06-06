const mongoose = require("mongoose");

console.log("connected to mongoDB server");

//defining mongoDB connection URL
const mongoURL = "mongodb://localhost:27017/hotels";

//set up mongoDB connection
mongoose.connect(mongoURL, {});

//get default connection
// mongoose maintains a default connection object representing the mongodb connection
const db = mongoose.connection;

//define ecent listeners for database connection

db.on("connection", () => {
  console.log("connected to mongodb server");
});

db.on("error", (err) => {
  console.error("error to mongodb server", err);
});

db.on("disconnected", () => {
  console.log("disconnected to mongodb server");
});

//export database connection
module.exports = db;
