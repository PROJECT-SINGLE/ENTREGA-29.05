CREATE DATABASE TheColor;
USE TheColor;


CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	razao_social VARCHAR(50),
	cnpj CHAR(14),
	codigo_ativacao VARCHAR(50)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
    cpf CHAR(11),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);


CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT,
    pontuacao INT,
    resultado VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);


-- REFERÊNCIA EMPRESA THECOLOR
INSERT INTO empresa (razao_social, codigo_ativacao) values ('TheColor', 'TH3O58');

INSERT INTO usuario  (nome, email, senha, fk_empresa) VALUES
('Luna', 'luna@sptech.school', '220716', 1



DESCRIBE quiz;
DESCRIBE usuario;

			SELECT 
    		u.id,
    		u.nome,
   			MAX(q.pontuacao) AS pontuacao
			FROM usuario u
			JOIN quiz q ON q.fk_usuario = u.id
			GROUP BY u.id, u.nome
			ORDER BY pontuacao DESC
			LIMIT 10;
        
        
          SELECT 
            u.nome,
            COUNT(q.id) AS jogos,
            MAX(q.pontuacao) AS melhor_pontuacao,
            AVG(q.pontuacao) AS media_pontuacao
        FROM quiz q
        JOIN usuario u ON u.id = q.fk_usuario
        GROUP BY u.nome
        ORDER BY melhor_pontuacao DESC;
