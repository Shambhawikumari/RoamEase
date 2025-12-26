if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Seed DB connected");

  await Listing.deleteMany({});

  const dataWithOwner = initdata.data.map(obj => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("689b7a1c56015099b82c4077") // keep as is
  }));

  await Listing.insertMany(dataWithOwner);
  console.log("Data initialized");

  mongoose.connection.close();
}

main().catch(err => console.log(err));
