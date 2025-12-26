if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_URL = process.env.MONGO_URL;
const USER_ID = "694ed607dc723c8b39352cb7";

async function fixOwners() {
  await mongoose.connect(MONGO_URL);
  const result = await Listing.updateMany({}, { owner: USER_ID });
  console.log("Owners updated:", result.modifiedCount);
  mongoose.connection.close();
}

fixOwners().catch(console.error);
