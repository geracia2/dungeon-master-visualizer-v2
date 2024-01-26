const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});
//   model               collection   schema
const User = mongoose.model("users", userSchema);

module.exports = User;

/*
// example of a user
User = {
  _id: "Matching_54684asdf54asdf",
  username: "Bob",
  password: "pass123",
  email: "bob@gmail.com",
  scenes: [
    {
      title: "New Scene",
      user_id: "Matching_54684asdf54asdf",
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
*/
