const express = require("express");

const router = express.Router();

const bibliotecaController =
    require("../controllers/bibliotecaController");

router.post(
    "/consulta",
    bibliotecaController.salvarConsulta
);

module.exports = router;