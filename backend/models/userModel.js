const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  scenes: [
    // look in 'users' collection, target the mongodb special id object
    { type: mongoose.Types.ObjectId, ref: "scenes" },
    // send user_id in param on the create route for user
  ],
});
//   model               collection   schema
const User = mongoose.model("users", userSchema);

module.exports = User;


// example of a user
User = {
  _id: { "$oid": "65b587aa62c9cf40a30ceda7" },
  username: "Bob",
  password: "pass123",
  email: "bob@gmail.com",
  scenes: [
    {
      "$oid": "65a986ba6505401d3bfac954"
    }
    // but will be .populate() by index route to client with:
    {
      _id: { "$oid": "65a986ba6505401d3bfac954" },
      title: "New Scene",
      model: {
        name: "string",
        uid: "546sdfb88asdfjsdf",
      },
      tracks: [
        {
          name: "01 title",
          id: 554651,
          waveform: "http://freesound.com/asdfkj3/wave.wave",
          preview: "http://freesound.com/asdfkj3/wave.wave",
        },
        {
          name: "02 title",
          id: 554665451,
          waveform: "http://freesound.com/asdfkj3/wave.wave",
          preview: "http://freesound.com/asdfkj3/wave.wave",
        },
      ],
    },
  ],
};

