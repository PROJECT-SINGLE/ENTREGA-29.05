var database = require("../database/config");

function salvarQuiz(pontuacao, resultado) {

    var instrucaoSql = `
        INSERT INTO quiz (pontuacao, resultado) VALUES (${pontuacao}, '${resultado}');
    `;

    return database.executar(instrucaoSql);
}

function relacionarUsuarioQuiz(fk_usuario, fk_quiz) {

    var instrucaoSql = `
        INSERT INTO usuario_quiz (fk_usuario, fk_quiz) VALUES (${fk_usuario}, ${fk_quiz});
    `;

    return database.executar(instrucaoSql);
}

function ranking() {

    var instrucaoSql = `
        SELECT 
            u.nome,
            MAX(q.pontuacao) AS pontuacao
        FROM usuario u
        LEFT JOIN usuario_quiz uq
            ON uq.fk_usuario = u.id
        LEFT JOIN quiz q
            ON q.id = uq.fk_quiz
        GROUP BY u.id, u.nome
        ORDER BY pontuacao DESC
        LIMIT 10;
    `;

    return database.executar(instrucaoSql);
}

function dashboard() {

    var instrucaoSql = `
        SELECT 
            u.nome,
            MAX(q.pontuacao) AS pontuacao
        FROM usuario u
        LEFT JOIN usuario_quiz uq
            ON uq.fk_usuario = u.id
        LEFT JOIN quiz q
            ON q.id = uq.fk_quiz
        GROUP BY u.id, u.nome
        ORDER BY pontuacao DESC;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    salvarQuiz,
    relacionarUsuarioQuiz,
    ranking,
    dashboard
};