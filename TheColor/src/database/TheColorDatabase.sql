-- CRIAÇÃO DO BANCO
DROP DATABASE IF EXISTS TheColor;
CREATE DATABASE TheColor;
USE TheColor;

-- TABELA EMPRESA
CREATE TABLE empresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(50),
    cnpj CHAR(14),
    codigo_ativacao VARCHAR(50)
);

-- TABELA SITE
CREATE TABLE site (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo_ativacao VARCHAR(50)
);

-- TABELA USUÁRIO
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    cpf CHAR(11),
    email VARCHAR(50),
    senha VARCHAR(50),
    fk_empresa INT,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

-- TABELA QUIZ
CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pontuacao INT,
    resultado VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RELACIONAMENTO N:N USUARIO - QUIZ
CREATE TABLE usuario_quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT,
    fk_quiz INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    FOREIGN KEY (fk_quiz) REFERENCES quiz(id)
);

-- BIBLIOTECA DE CORES
CREATE TABLE biblioteca (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT,
    cor_pesquisada VARCHAR(50),
    rgb VARCHAR(30),
    hex VARCHAR(10),
    quantidade_buscas INT DEFAULT 1,
    data_consulta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

-- TABELA AVISO
CREATE TABLE aviso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descricao VARCHAR(150),
    fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

-- DADOS INICIAIS

INSERT INTO empresa (razao_social, codigo_ativacao)
VALUES ('TheColor', 'TH3O58');

INSERT INTO usuario (nome, email, senha, fk_empresa) VALUES
('Fabiana', 'fabiana@sptech.school', '123456', 1),
('Erivonaldo', 'erivonaldo@sptech.school', '123456', 1),
('Celia', 'celia@sptech.school', '123456', 1),
('Guilherme', 'guilherme@sptech.school', '123456', 1),
('Vinicius', 'vinicius@sptech.school', '123456', 1),
('Danielle', 'danielle@sptech.school', '123456', 1),
('Luna', 'luna@sptech.school', '220716', 1);

INSERT INTO quiz (pontuacao, resultado) VALUES
(30, 'Bom'),
(40, 'Excelente'),
(20, 'Regular'),
(40, 'Perfeito'),
(30, 'Bom'),
(40, 'Excelente'),
(30, 'Bom');

INSERT INTO usuario_quiz (fk_usuario, fk_quiz) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7);

INSERT INTO biblioteca (fk_usuario, cor_pesquisada, rgb, hex, quantidade_buscas) VALUES
(1, 'azul', 'rgb(0,0,255)', '#0000FF', 5),
(1, 'vermelho', 'rgb(255,0,0)', '#FF0000', 2),
(2, 'verde', 'rgb(0,170,0)', '#00AA00', 3),
(3, 'preto', 'rgb(0,0,0)', '#000000', 7),
(4, 'rosa', 'rgb(255,105,180)', '#FF69B4', 1),
(5, 'roxo', 'rgb(128,0,128)', '#800080', 4),
(6, 'azul', 'rgb(0,0,255)', '#0000FF', 2),
(7, 'amarelo', 'rgb(255,255,0)', '#FFFF00', 6);

-- CONSULTAS BÁSICAS
SELECT * FROM usuario;
SELECT * FROM quiz;
SELECT * FROM usuario_quiz;
SELECT * FROM biblioteca;
SELECT * FROM aviso;

-- VIEW RELATÓRIO COMPLETO
CREATE VIEW vw_relatorio_completo AS
SELECT 
    u.id AS id_usuario,
    u.nome,
    u.email,
    e.razao_social AS empresa,

    q.id AS id_quiz,
    q.pontuacao,
    q.resultado,
    q.created_at,

    b.cor_pesquisada,
    b.quantidade_buscas,

    -- maior pontuação do usuário
    (
        SELECT MAX(q2.pontuacao)
        FROM usuario_quiz uq2
        JOIN quiz q2 ON q2.id = uq2.fk_quiz
        WHERE uq2.fk_usuario = u.id
    ) AS maior_pontuacao,

    -- total de cores pesquisadas
    (
        SELECT COUNT(*)
        FROM biblioteca b2
        WHERE b2.fk_usuario = u.id
    ) AS total_cores_pesquisadas

FROM usuario u
JOIN empresa e ON e.id = u.fk_empresa
LEFT JOIN usuario_quiz uq ON uq.fk_usuario = u.id
LEFT JOIN quiz q ON q.id = uq.fk_quiz
LEFT JOIN biblioteca b ON b.fk_usuario = u.id;


-- RELATÓRIO FINAL
SELECT * FROM vw_relatorio_completo;

-- TOP USUÁRIOS POR PONTUAÇÃO
SELECT 
    u.id,
    u.nome,
    MAX(q.pontuacao) AS pontuacao
FROM usuario u
JOIN usuario_quiz uq ON uq.fk_usuario = u.id
JOIN quiz q ON q.id = uq.fk_quiz
GROUP BY u.id, u.nome
ORDER BY pontuacao DESC
LIMIT 10;

-
-- ESTATÍSTICAS DOS JOGOS
SELECT 
    u.nome,
    COUNT(q.id) AS jogos,
    MAX(q.pontuacao) AS melhor_pontuacao,
    AVG(q.pontuacao) AS media_pontuacao
FROM usuario u
JOIN usuario_quiz uq ON uq.fk_usuario = u.id
JOIN quiz q ON q.id = uq.fk_quiz
GROUP BY u.nome
ORDER BY melhor_pontuacao DESC;

-- versão com LEFT JOIN (inclui usuários sem jogos)
SELECT 
    u.id,
    u.nome,
    COUNT(q.id) AS jogos,
    COALESCE(MAX(q.pontuacao), 0) AS melhor_pontuacao,
    COALESCE(AVG(q.pontuacao), 0) AS media_pontuacao
FROM usuario u
LEFT JOIN usuario_quiz uq ON uq.fk_usuario = u.id
LEFT JOIN quiz q ON q.id = uq.fk_quiz
GROUP BY u.id, u.nome
ORDER BY melhor_pontuacao DESC;