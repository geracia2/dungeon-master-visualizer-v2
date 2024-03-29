const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sceneSchema = new Schema(
  {
    title: { type: String, required: true, default: "New Scene" },
    model: {
      name: { type: String },
      uid: { type: String },
      thumbnail: { type: String },
    },
    tracks: [
      {
        name: { type: String },
        id: { type: Number },
        waveform: { type: String },
        preview: { type: String },
      },
    ],
    // look in 'users' collection, target the mongodb special id object
    // user_id: { type: mongoose.Types.ObjectId, ref: "users" },
    user_id: { type: String, required: true },
    // send user_id in param on the create route for user
  },
  { timestamps: true }
);

//    model                collection    schema
const Scene = mongoose.model("scenes", sceneSchema);

module.exports = Scene;
