const router = require("express").Router();
const controller = require("../controllers/herois.controller");

router.get("/", controller.listar);
router.get("/:id", controller.buscar);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.remover);
router.get("/:id/itens", controller.listarItens);

module.exports = router;
