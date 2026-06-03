var quizModel = require("../models/quizModel");

function salvar(req, res) {

    const { pontuacao, resultado, fk_usuario } = req.body;

    // 1. salva quiz primeiro
    quizModel.salvarQuiz(pontuacao, resultado)
        .then((resultadoDB) => {

            const fk_quiz = resultadoDB.insertId;

            // 2. relaciona usuário com quiz
            return quizModel.relacionarUsuarioQuiz(fk_usuario, fk_quiz);
        })
        .then(() => {
            res.json({ mensagem: "Quiz salvo com sucesso!" });
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function ranking(req, res) {

    quizModel.ranking()
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        });
}

function dashboard(req, res) {

    quizModel.dashboard()
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    salvar,
    ranking,
    dashboard
};