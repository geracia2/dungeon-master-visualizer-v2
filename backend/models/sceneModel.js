const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sceneSchema = new Schema(
  {
    title: { type: String, required: true, default: "New Scene" },

    model: {
      name: { type: String, required: true },
      uid: { type: String, required: true },
    },

    tracks: [
      {
        name: { type: String },
        id: { type: Number, required: true },
        waveform: { type: String },
        preview: { type: String, required: true },
      },
    ],

    // look in 'users' collection, target the mongodb special id object
    user_id: { ref: "users", type: mongoose.Types.ObjectId },
    // send user_id in param on the create route for user
  },
  { timestamps: true }
);

//    model                collection    schema
const Scene = mongoose.model("scenes", sceneSchema);

module.exports = Scene;
