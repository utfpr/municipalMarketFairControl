CREATE DATABASE IF NOT EXISTS feira_municipal;
USE feira_municipal

DROP TABLE IF EXISTS feira;
DROP TABLE IF EXISTS feirante;
DROP TABLE IF EXISTS participa;
DROP TABLE IF EXISTS subcategoria;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS celula;
DROP TABLE IF EXISTS supervisor;



CREATE TABLE categoria (
	id INTEGER AUTO_INCREMENT,
	nome VARCHAR(200),
	need_cnpj BOOLEAN,

	PRIMARY KEY (id)
);

CREATE TABLE subcategoria (
	id INTEGER AUTO_INCREMENT,
	nome VARCHAR(200),
	categoria_id INTEGER NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (categoria_id) REFERENCES categoria (id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE feira (
	data DATE,
	status BOOLEAN,

	PRIMARY KEY (data)
);

CREATE TABLE feirante (
	cpf VARCHAR(15),
	cnpj VARCHAR(15),
	usa_ee BOOLEAN,
	nome_ficticio VARCHAR(100),
	razao_social VARCHAR(100),
	comprimento_barraca REAL,
	largura_barraca REAL,
	endereco VARCHAR(200),
	voltagem_ee INTEGER,
	status BOOLEAN,
	sub_categoria_id INTEGER NOT NULL,
	senha VARCHAR(500),


	PRIMARY KEY (cpf),
	FOREIGN KEY (sub_categoria_id) REFERENCES subcategoria (id) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE participa (
	cpf_feirante VARCHAR(15),
	data_feira DATE,
	faturamento REAL,


	PRIMARY KEY (cpf_feirante, data_feira),
	FOREIGN KEY (cpf_feirante) REFERENCES feirante (cpf) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (data_feira) REFERENCES feira (data) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE celula (
	id INTEGER,
	cpf_feirante VARCHAR(15),
	periodo INTEGER,

	PRIMARY KEY (id),
	FOREIGN KEY (cpf_feirante) REFERENCES feirante (cpf) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE supervisor (
	cpf VARCHAR(15),
	nome VARCHAR(100),
	senha VARCHAR(500),
	is_adm BOOLEAN,

	PRIMARY KEY (cpf)
);





