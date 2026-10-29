const router = require("express").Router();
const controller = require("../controllers/itens.controller");

router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.remover);

module.exports = router;
