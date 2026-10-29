const router = require("express").Router();
const controller = require("../controllers/painel.controller");

router.get("/", controller.resumo);

module.exports = router;
