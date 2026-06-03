const bibliotecaModel = require("../models/bibliotecaModel");

async function salvarConsulta(req, res) {

    console.log("BODY RECEBIDO:", req.body); 

    const {
        usuarioId,
        nomeCor,
        rgb,
        hex
    } = req.body;

    try {

        const resultado =
            await bibliotecaModel.salvarConsulta({

                usuarioId,
                nomeCor,
                rgb,
                hex

            });

        res.status(200).json({
            mensagem: "Consulta salva!",
            resultado
        });

    }

    catch (erro) {

        console.log(erro);

        res.status(500).json({
            erro: "Erro ao salvar consulta"
        });

    }

}

module.exports = {
    salvarConsulta
};