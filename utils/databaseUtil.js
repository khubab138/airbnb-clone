const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://root123:root123@airbnb-db.2vgdywt.mongodb.net/?appName=airbnb-DB";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.log("error while connecting to MONGO", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Mongo Not Connected");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
