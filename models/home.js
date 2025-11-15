const mongoose = require("mongoose");
const favourite = require("./favourite");

const homeSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  rating: { type: Number, required: true },
  profile: String,
  description: String,
});

homeSchema.pre("findOneAndDelete", async function (next) {
  const homeId = this.getQuery()._id;
  await favourite.deleteMany({ houseId: homeId });
  next();
});

module.exports = mongoose.model("Home", homeSchema);
