/*
===========================================
LABORATÓRIO DAS CORES
Projeto focado em:
- Vetores
- Estruturas FOR
- Lógica manual
===========================================
*/

/*
===========================================
VETORES DAS CORES
===========================================
*/

/* nomes das cores */
let nomesCores = [
    "Vermelho",
    "Azul",
    "Amarelo",
    "Branco",
    "Preto",
    "Verde",
    "Ciano",
    "Magenta"
];

/* RGB das cores */
let rgbCores = [

    [255,0,0],
    [0,0,255],
    [255,255,0],
    [255,255,255],
    [0,0,0],
    [0,255,0],
    [0,255,255],
    [255,0,255]

];

/* HEX das cores */
let hexCores = [
    "#ff0000",
    "#0000ff",
    "#ffff00",
    "#ffffff",
    "#000000",
    "#00ff00",
    "#00ffff",
    "#ff00ff"
];

/*
===========================================
DESAFIOS DO JOGO
===========================================
*/

let desafios = [
    "Roxo",
    "Laranja",
    "Verde",
    "Cinza",
    "Rosa",
    "Azul Claro"
];

/* RGB dos desafios */
let rgbDesafios = [

    [127,0,127],
    [255,127,0],
    [127,127,0],
    [127,127,127],
    [255,127,127],
    [127,127,255]

];

/*
===========================================
VETORES DE JOGO
===========================================
*/

/* vetor das misturas */
let misturaJogador = [];

/* vetor histórico */
let historico = [];

/*
===========================================
VARIÁVEIS
===========================================
*/

let pontos = 0;
let tempo = 30;

let alvoAtual = 0;

/*
===========================================
CRIAR BOTÕES MANUALMENTE
===========================================
*/

function criarBotoes(){

    let html = "";

    /* FOR para percorrer vetor de cores */
    for(let i = 0; i < nomesCores.length; i++){

        html +=

        "<button " +

        "style='background:" + hexCores[i] + "'" +

        "onclick='adicionarCor(" + i + ")'>" +

        nomesCores[i] +

        "</button>";
    }

    document.getElementById("areaBotoes").innerHTML = html;
}

/*
===========================================
GERAR DESAFIO ALEATÓRIO
===========================================
*/

function gerarDesafio(){

    alvoAtual = parseInt(
        Math.random() * desafios.length
    );

    document.getElementById("nomeAlvo").innerHTML =
    desafios[alvoAtual];

    let rgb = rgbDesafios[alvoAtual];

    document.getElementById("corAlvo").style.background =

    "rgb(" +

    rgb[0] + "," +

    rgb[1] + "," +

    rgb[2] + ")";
}

/*
===========================================
ADICIONAR COR NO VETOR
===========================================
*/

function adicionarCor(indice){

    misturaJogador.push(indice);

    atualizarMistura();
}

/*
===========================================
ATUALIZAR MISTURA
===========================================
*/

function atualizarMistura(){

    /*
    Vetor RGB final
    */
    let rgbFinal = [0,0,0];

    /*
    FOR para percorrer cores adicionadas
    */
    for(let i = 0; i < misturaJogador.length; i++){

        let indiceCor = misturaJogador[i];

        /*
        FOR para somar RGB manualmente
        */
        for(let j = 0; j < 3; j++){

            rgbFinal[j] =
            rgbFinal[j] + rgbCores[indiceCor][j];
        }
    }

    /*
    Média manual RGB
    */

    if(misturaJogador.length > 0){

        for(let i = 0; i < 3; i++){

            rgbFinal[i] =
            parseInt(
                rgbFinal[i] / misturaJogador.length
            );
        }
    }

    /*
    Atualizar painel visual
    */

    document.getElementById("misturaAtual")
    .style.background =

    "rgb(" +

    rgbFinal[0] + "," +

    rgbFinal[1] + "," +

    rgbFinal[2] + ")";

    document.getElementById("rgbAtual")
    .innerHTML =

    "RGB(" +

    rgbFinal[0] + ", " +

    rgbFinal[1] + ", " +

    rgbFinal[2] + ")";
}

/*
===========================================
VERIFICAR COR
===========================================
*/

function verificarCor(){

    let rgbFinal = [0,0,0];

    /*
    SOMA RGB MANUAL
    */
    for(let i = 0; i < misturaJogador.length; i++){

        let indiceCor = misturaJogador[i];

        for(let j = 0; j < 3; j++){

            rgbFinal[j] =
            rgbFinal[j] + rgbCores[indiceCor][j];
        }
    }

    /*
    MÉDIA RGB MANUAL
    */
    if(misturaJogador.length > 0){

        for(let i = 0; i < 3; i++){

            rgbFinal[i] =
            parseInt(
                rgbFinal[i] / misturaJogador.length
            );
        }
    }

    let rgbAlvo = rgbDesafios[alvoAtual];

    let acertou = true;

    /*
    COMPARAÇÃO MANUAL RGB
    */
    for(let i = 0; i < 3; i++){

        if(rgbFinal[i] != rgbAlvo[i]){

            acertou = false;
        }
    }

    /*
    ACERTO
    */
    if(acertou == true){

        pontos = pontos + 10;

        document.getElementById("mensagem")
        .className = "acerto";

        document.getElementById("mensagem")
        .innerHTML =
        "VOCÊ ACERTOU!";
    }

    /*
    ERRO
    */
    else{

        pontos = pontos - 5;

        document.getElementById("mensagem")
        .className = "erro";

        document.getElementById("mensagem")
        .innerHTML =
        "COR INCORRETA!";
    }

    /*
    Atualizar pontos
    */
    document.getElementById("pontuacao")
    .innerHTML = pontos;

    /*
    Criar texto da combinação
    */
    let combinacao = "";

    /*
    FOR para gerar histórico
    */
    for(let i = 0; i < misturaJogador.length; i++){

        combinacao +=
        nomesCores[misturaJogador[i]];

        if(i < misturaJogador.length - 1){

            combinacao += " + ";
        }
    }

    /*
    Adicionar histórico
    */
    historico.push(

        combinacao +

        " => RGB(" +

        rgbFinal[0] + "," +

        rgbFinal[1] + "," +

        rgbFinal[2] + ")"
    );

    atualizarHistorico();

    salvarRanking();

    limparMistura();

    gerarDesafio();
}

/*
===========================================
ATUALIZAR HISTÓRICO
===========================================
*/

function atualizarHistorico(){

    let html = "";

    /*
    FOR para exibir histórico
    */
    for(let i = 0; i < historico.length; i++){

        html +=
        "<p>" +

        historico[i] +

        "</p>";
    }

    document.getElementById("listaHistorico")
    .innerHTML = html;
}

/*
===========================================
RESETAR MISTURA
===========================================
*/

function limparMistura(){

    misturaJogador = [];

    document.getElementById("misturaAtual")
    .style.background = "white";

    document.getElementById("rgbAtual")
    .innerHTML = "";
}

/*
===========================================
RANKING LOCALSTORAGE
===========================================
*/

function salvarRanking(){

    let maior = localStorage.getItem("ranking");

    if(maior == null){

        maior = 0;
    }

    if(pontos > maior){

        localStorage.setItem(
            "ranking",
            pontos
        );
    }

    document.getElementById("ranking")
    .innerHTML = localStorage.getItem("ranking");
}

/*
===========================================
MODO DIFÍCIL COM TEMPO
===========================================
*/

function iniciarTempo(){

    setInterval(function(){

        tempo--;

        document.getElementById("tempo")
        .innerHTML = tempo;

        if(tempo <= 0){

            alert(
                "Tempo encerrado!"
            );

            tempo = 30;
            pontos = 0;

            document.getElementById("pontuacao")
            .innerHTML = pontos;
        }

    },1000);
}

/*
===========================================
INICIAR JOGO
===========================================
*/

criarBotoes();

gerarDesafio();

salvarRanking();

iniciarTempo();