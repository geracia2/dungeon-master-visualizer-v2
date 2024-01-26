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
    sounds: [
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
