const sceneSeed = {
  title: "My First Scene",
  model: {
    name: "Dragonborn",
    uid: "783b685da9bf457d81e829fa283f3567",
  },
  tracks: [
    {
      name: "RPG Town Loop #2",
      id: 349179,
      waveform:
        "https://cdn.freesound.org/displays/349/349179_5225777_wave_L.png",
      preview: "https://cdn.freesound.org/previews/349/349179_5225777-lq.mp3",
    },
  ],

  user_id: { ref: "users", type: mongoose.Types.ObjectId },
};
module.exports = sceneSeed;
