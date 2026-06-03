var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");

    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");

    } else {

        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {

                console.log(`Resultados encontrados: ${resultadoAutenticar.length}`);

                if (resultadoAutenticar.length == 1) {

                    res.json({
                        id: resultadoAutenticar[0].id,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email,
                        cpf: resultadoAutenticar[0].cpf,
                        empresaId: resultadoAutenticar[0].empresaId
                    });

                } else if (resultadoAutenticar.length == 0) {

                    res.status(403).send("Email e/ou senha inválido(s)");

                } else {

                    res.status(403).send("Mais de um usuário com o mesmo login!");

                }

            }).catch(function (erro) {

                console.log(erro);
                console.log("Erro ao realizar login:", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);

            });

    }

}

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaVincularServer;

    if (nome == undefined) {

        res.status(400).send("Seu nome está undefined!");

    } else if (email == undefined) {

        res.status(400).send("Seu email está undefined!");

    } else if (cpf == undefined) {

        res.status(400).send("Seu cpf está undefined!");

    } else if (senha == undefined) {

        res.status(400).send("Sua senha está undefined!");

    } else if (fkEmpresa == undefined) {

        res.status(400).send("Sua empresa está undefined!");

    } else {

        usuarioModel.cadastrar(nome, email, senha, fkEmpresa, cpf )
        .then(function (resultado) {

            res.json(resultado);

        }).catch(function (erro) {

            console.log(erro);
            console.log("Erro ao cadastrar:", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);

        });

    }

}

module.exports = {
    autenticar,
    cadastrar
};