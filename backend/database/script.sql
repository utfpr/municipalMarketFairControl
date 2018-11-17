DROP DATABASE IF EXISTS feira_municipal;
CREATE DATABASE IF NOT EXISTS feira_municipal;
USE feira_municipal;

DROP TABLE IF EXISTS feira;
DROP TABLE IF EXISTS feirante;
DROP TABLE IF EXISTS participa;
DROP TABLE IF EXISTS subcategoria;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS celula;
DROP TABLE IF EXISTS supervisor;
DROP TABLE IF EXISTS endereco;



CREATE TABLE categoria (
	id INTEGER AUTO_INCREMENT,
	nome VARCHAR(200) NOT NULL,
	need_cnpj BOOLEAN NOT NULL,
	
	PRIMARY KEY (id)
);

CREATE TABLE subcategoria (
	id INTEGER AUTO_INCREMENT,
	nome VARCHAR(200) NOT NULL,
	categoria_id INTEGER NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (categoria_id) REFERENCES categoria (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE feira (
	data DATE,
	data_limite DATETIME,
	status BOOLEAN DEFAULT false,

	PRIMARY KEY (data)
);

CREATE TABLE feirante (
	cpf VARCHAR(15),
	rg VARCHAR(15) NOT NULL,
	nome VARCHAR(100) NOT NULL,
	cnpj VARCHAR(15),
	usa_ee BOOLEAN NOT NULL,
	nome_fantasia VARCHAR(100) NOT NULL,
	razao_social VARCHAR(100) NOT NULL,
	comprimento_barraca REAL NOT NULL,
	largura_barraca REAL NOT NULL,
	voltagem_ee INTEGER,
	status BOOLEAN DEFAULT true,
	sub_categoria_id INTEGER NOT NULL,
	senha VARCHAR(500) NOT NULL,


	PRIMARY KEY (cpf),
	FOREIGN KEY (sub_categoria_id) REFERENCES subcategoria (id) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE endereco (
	id INTEGER AUTO_INCREMENT,
	logradouro VARCHAR(100) NOT NULL,
	bairro VARCHAR (100),
	numero INTEGER,
	CEP VARCHAR(10),
	cpf_feirante VARCHAR(15) NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (cpf_feirante) REFERENCES feirante (cpf) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE celula (
	id INTEGER,
	cpf_feirante VARCHAR(15),
	periodo INTEGER NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (cpf_feirante) REFERENCES feirante (cpf) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE participa (
	cpf_feirante VARCHAR(15),
	data_feira DATE,
	faturamento REAL DEFAULT 0,
	periodo INTEGER NOT NULL,
	hora_confirmacao DATETIME,
	celula_id INTEGER,


	PRIMARY KEY (cpf_feirante, data_feira),
	FOREIGN KEY (celula_id) REFERENCES celula (id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (cpf_feirante) REFERENCES feirante (cpf) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (data_feira) REFERENCES feira (data) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE supervisor (
	cpf VARCHAR(15),
	nome VARCHAR(100) NOT NULL,
	senha VARCHAR(500) NOT NULL,
	is_adm BOOLEAN DEFAULT false,
	root_adm BOOLEAN DEFAULT false,
	status BOOLEAN DEFAULT true,

	PRIMARY KEY (cpf)
);