const express = require("express");
const router = express.Router();
const contentController = require('../controllers/contentController')

// // ==SEED== 
// router.get("/seed", contentController.seed);

// ==INDEX/ShowAll== [http://localhost:5000/scene/] :: GET available: use model
router.get("/:sceneId/", contentController.index);

// ===CREATE== [http://localhost:5000/scene/] ::  POST available: req.body
router.post("/:sceneId/", contentController.create);

// ===DELETE== [http://localhost:5000/scene/:contentId] :: DELETE available: req.params.id
router.delete("/:sceneId/:contentId", contentController.delete);

// ===UPDATE=== [http://localhost:5000/scene/:contentId] :: PUT available: req.params.id, req.body
router.put("/:sceneId/:contentId", contentController.update);

// ===SHOW=== [http://localhost:5000/scene/:contentId] :: GET available: req.params.id
router.get('/:sceneId/:contentId', contentController.show)

module.exports = router;

// SHOW and EDIT are not necessary for client side
// as they would be handled in the app as a component
