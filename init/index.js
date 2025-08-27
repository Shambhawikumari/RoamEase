const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    const dataWithOwner = initdata.data.map(obj => ({
            ...obj,
            owner: new mongoose.Types.ObjectId("689b7a1c56015099b82c4077") // make sure it's an ObjectId
        }));

        await Listing.insertMany(dataWithOwner);
    console.log("data was initialized");
  } catch (err) {
    console.error("Error initializing data:", err);
  }
};

initDB();
