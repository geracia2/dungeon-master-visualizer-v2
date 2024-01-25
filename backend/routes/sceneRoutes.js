const express = require("express");
const router = express.Router();
const sceneControl = require('../controllers/sceneController')

// ==SEED== 
router.get("/seed", sceneControl.seed);

// ==INDEX/ShowAll== [http://localhost:5000/api/scene/] :: GET available: use model
router.get("/", sceneControl.index);

// ===CREATE== [http://localhost:5000/api/scene/] ::  POST available: req.body
router.post("/", sceneControl.create);

// ===DELETE== [http://localhost:5000/api/scene/:id] :: DELETE available: req.params.id
router.delete("/:id", sceneControl.delete);

// ===UPDATE=== [http://localhost:5000/api/scene/:id] :: PUT available: req.params.id, req.body
router.put("/:id", sceneControl.update);

// ===SHOW=== [http://localhost:5000/api/scene/:id] :: GET available: req.params.id
router.get('/:id', sceneControl.show)

module.exports = router;

// SHOW and EDIT are not necessary for client side
// as they would be handled in the app as a component
