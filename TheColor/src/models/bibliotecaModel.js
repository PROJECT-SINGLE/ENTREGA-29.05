const conexao = require("../database/config");

function salvarConsulta(dados) {

    const sql = `
        INSERT INTO biblioteca
        (fk_usuario, cor_pesquisada, rgb, hex, quantidade_buscas)
        VALUES ('${dados.usuarioId}', '${dados.nomeCor}', '${dados.rgb}', '${dados.hex}', 1)
    `;

    return conexao.executar(sql);
}

module.exports = {
    salvarConsulta
};