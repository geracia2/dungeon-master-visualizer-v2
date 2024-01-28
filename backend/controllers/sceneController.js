const Scene = require("../models/sceneModel");
const User = require('../models/userModel')
const SceneSeed = require("../models/sceneSeed");

// ==SEED== [http://localhost:5000/api/scene/:userId/seed] :: GET available: req.params.userId
module.exports.seed = async (req, res) => {
  try {
    await Scene.deleteMany({});
    res.status(200).json({ message: "all scenes deleted!" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ==INDEX/ShowAll== [http://localhost:5000/api/scene/:userId] :: GET available: use Model.findById(), req.params.userId
module.exports.index = async (req, res) => {
  try {
    const scenes = await Scene.findById(req.params.userId).populate("comments").sort({ createdAt: 1 });
    res.status(200).json(scenes);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===CREATE== [http://localhost:5000/api/scene/:userId] ::  POST available: req.params.userId, req.body
module.exports.create = async (req, res) => {
  // should be in a form and on submit, req.body should be sending just a name.
  try {
    await Scene.create(req.body);
    console.log('Creating a scene from req.body:', req.body)
    res.status(200).json(req.body);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===DELETE== [http://localhost:5000/api/scene/:userId/:sceneId] :: DELETE available: req.params.userId|sceneId
module.exports.delete = async (req, res) => {
  try {
    const scene = await Scene.findByIdAndDelete(req.params.id);
    console.log(`Deleting :`, scene);
    res.status(200).send("delete was successful");
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===UPDATE=== [http://localhost:5000/api/scene/:userId/:sceneId] :: PUT available: req.params.userId|sceneId, req.body
module.exports.update = async (req, res) => {
  try {
    console.log("you are changing: ", req.params.id);
    console.log("with this body: ", req.body);
    await Scene.findByIdAndUpdate(req.params.id, req.body);
    // noting sent back? send something or it will hang
    res.status(200).send("update was successful");
    // redirect on client side
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===SHOW=== [http://localhost:5000/api/scene/:userId/:sceneId] :: GET available: req.params.userId|sceneId
// open scene, populate with ref. content
module.exports.show = async (req, res) => {
  try {
    const scene = await Scene.findById(req.params.id);
    console.log(scene);
    res.status(200).json(scene);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};
