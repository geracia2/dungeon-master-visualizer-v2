const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sceneSchema = new Schema(
  {
    title: { type: String, required: true, default: "New Scene" },
    // model needs: m.name<str>, m.uid<str>,
    model: {
      name: { type: String, required: true },
      uid: { type: String, required: true },
    },
    // sound needs: s.name<str>, s.id<num>, s.images.waveform_bw_l<str>, s.previews["preview-lq-mp3"]<str>
    tracks: [
      {
        name: { type: String, required: true },
        id: { type: Number, required: true },
        waveform: { type: String },
        preview: { type: String, required: true },
      },
    ],
    user_id: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scene", sceneSchema);

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
