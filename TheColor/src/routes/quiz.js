var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/salvar", function (req, res) {
    quizController.salvar(req, res);
});

router.get("/ranking", function (req, res) {
    quizController.ranking(req, res);
});

router.get("/dashboard", function (req, res) {
    quizController.dashboard(req, res);
});
module.exports = router;