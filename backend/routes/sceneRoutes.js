const express = require("express");
const router = express.Router();
const sceneControl = require('../controllers/sceneController')

// ==SEED== [http://localhost:5000/api/scene/:userId/seed] :: GET available: req.params.userId
router.get("/:userId/seed", sceneControl.seed);

// ==INDEX/ShowAll== [http://localhost:5000/api/scene/:userId] :: GET available: use Model.findById(), req.params.userId
router.get("/:userId", sceneControl.index);

// ===CREATE== [http://localhost:5000/api/scene/:userId] ::  POST available: req.params.userId, req.body
router.post("/:userId", sceneControl.create);

// ===UPDATE=== [http://localhost:5000/api/scene/:sceneId/model] :: PUT available: req.params.userId|sceneId, req.body
router.put("/:sceneId/model", sceneControl.updateModel);

// ===UPDATE=== [http://localhost:5000/api/scene/:sceneId/tracks] :: PUT available: req.params.userId|sceneId, req.body
router.put("/:sceneId/tracks", sceneControl.addTracks);

// ===UPDATE=== [http://localhost:5000/api/scene/:sceneId/tracks] :: PUT available: req.params.userId|sceneId, req.body
router.delete("/:sceneId/tracks/:trackId", sceneControl.deleteTracks);

// ===DELETE== [http://localhost:5000/api/scene/:userId/:sceneId] :: DELETE available: req.params.userId|sceneId
router.delete("/:userId/:sceneId", sceneControl.delete);

// ===UPDATE=== [http://localhost:5000/api/scene/:userId/:sceneId] :: PUT available: req.params.userId|sceneId, req.body
router.put("/:sceneId", sceneControl.updateScene);

// ===SHOW=== [http://localhost:5000/api/scene/:userId/:sceneId] :: GET available: req.params.userId|sceneId
router.get('/:userId/:sceneId', sceneControl.show)

module.exports = router;

// SHOW and EDIT are not necessary for client side
// as they would be handled in the app as a component
