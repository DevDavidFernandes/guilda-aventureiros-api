const router = require("express").Router();
const controller = require("../controllers/missoes.controller");

router.get("/", controller.listar);
router.post("/", controller.criar);
router.put("/:id/status", controller.alternarStatus);
router.delete("/:id", controller.remover);

module.exports = router;
