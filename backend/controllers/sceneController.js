const Scene = require("../models/sceneModel");
const User = require("../models/userModel");
const sceneSeed = require("./sceneSeed");

// ==SEED== [http://localhost:5000/api/scene/:userId/seed] :: GET available: req.params.userId
module.exports.seed = async (req, res) => {
  try {
    console.log("++++ Seeding a user ++++");
    // delete matching scenes for user
    const query = { user_id: req.params.userId };
    await Scene.deleteMany(query);
    // delete scene reference array
    const foundUser = await User.findByIdAndUpdate(req.params.userId, {
      $set: {
        scenes: [],
      },
    });
    console.log("clearing all scenes from user");

    let updateBody = sceneSeed;
    updateBody.user_id = req.params.userId;
    const scene = await Scene.create(updateBody);
    const newUser = await User.findByIdAndUpdate(req.params.userId, {
      $push: {
        scenes: scene._id,
      },
    });
    console.log("seeding new first scene");

    // for multiple documents to be inserted:
    // create a scene and insert it in a user
    // for (const seed of sceneSeed) {
    //   // add user
    //   seed.user_id = req.params.userId;
    //   // create a scene for each seed
    //   const scene = await Scene.create(seed);
    //   const foundUser = await User.findByIdAndUpdate(req.params.userId, {
    //     $push: {
    //       scenes: scene._id,
    //     },
    //   });
    // }
    res.status(200).json({ newUser, scene });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// ===INDEX/ShowAll== [http://localhost:5000/api/scene/:userId] :: GET available: use Model.findById(), req.params.userId
module.exports.index = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("scenes")
      .sort({ createdAt: 1 });
    res.status(200).json(user.scenes);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===CREATE== [http://localhost:5000/api/scene/:userId] ::  POST available: req.params.userId, req.body
module.exports.create = async (req, res) => {
  try {
    const body = req.body;
    body.user_id = req.params.userId;
    console.log(body);
    // create a scene independent of a User.
    const scene = await Scene.create(body);
    console.log("Creating a scene from req.body", req.body);
    // then find User...
    const updateUser = await User.findByIdAndUpdate(req.params.userId, {
      // ... push the new scene's document's ID ...
      $push: {
        // ... into the scenes array
        // schema is looking for scenes: [ type: mongoose.Types.ObjectId ]
        scenes: scene._id,
      },
    });
    res.status(200).json(updateUser);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===UPDATE=== [http://localhost:5000/api/scene/:sceneId/model] :: PUT available: req.params.userId|sceneId, req.body
module.exports.updateModel = async (req, res) => {
  try {
    console.log("updating just the model with", req.body);
    await Scene.findByIdAndUpdate(req.params.sceneId, {
      $set: { model: req.body },
    });
    res.status(200).send("update was successful to DB");
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===CREATE=== [http://localhost:5000/api/scene/:sceneId/tracks] :: PUT available: req.params.userId|sceneId, req.body
module.exports.addTracks = async (req, res) => {
  try {
    console.log("Adding track with", req.body);
    await Scene.findByIdAndUpdate(req.params.sceneId, {
      $push: { tracks: req.body },
    });
    res.status(200).send("Add was successful to DB");
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===DELETE=== [http://localhost:5000/api/scene/:sceneId/tracks/:trackid] :: PUT available: req.params.userId|sceneId, req.body
module.exports.deleteTracks = async (req, res) => {
  try {
    console.log("Deleting track", req.params.trackId);
    await Scene.findByIdAndUpdate(req.params.sceneId, {
      $pull: { tracks: { id: req.params.trackId } },
    });
    res.status(200).send("Delete was successful to DB");
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===DELETE== [http://localhost:5000/api/scene/:userId/:sceneId] :: DELETE available: req.params.userId|sceneId
module.exports.delete = async (req, res) => {
  try {
    // directly delete the scene from DB
    const scene = await Scene.findByIdAndDelete(req.params.sceneId);
    console.log(`Deleting`, scene);
    // delete from user scenes array
    await User.findByIdAndUpdate(req.params.userId, {
      // pull (remove) the ref Id from scene
      $pull: {
        // ... from the scene array
        scenes: req.params.sceneId,
      },
    });
    res.status(200).send("delete was successful to DB");
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===UPDATE=== [http://localhost:5000/api/scene/:userId/:sceneId] :: PUT available: req.params.userId|sceneId, req.body
module.exports.updateScene = async (req, res) => {
  try {
    // update a comment by updating an item in the comments property in post

    console.log("Edit whole scene with", req.body);
    await Scene.findByIdAndUpdate(req.params.sceneId, req.body);
    // noting sent back? send something or it will hang
    res.status(200).send("update was successful to DB");
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
    const scene = await Scene.findById(req.params.sceneId);
    console.log("Show scene", scene);
    res.status(200).json(scene);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};
