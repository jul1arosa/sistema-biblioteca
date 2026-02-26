CREATE DATABASE IF NOT EXISTS `biblioteca` 
USE `biblioteca`;

-- Copiando estrutura para tabela biblioteca.livros
CREATE TABLE IF NOT EXISTS `livros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(15) NOT NULL DEFAULT '0',
  `titulo` varchar(50) NOT NULL DEFAULT '0',
  `autor` varchar(30) NOT NULL DEFAULT '0',
  `editora` varchar(30) NOT NULL DEFAULT '0',
  `paginas` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

-- Copiando dados para a tabela biblioteca.livros: ~3 rows (aproximadamente)
INSERT INTO `livros` (`id`, `isbn`, `titulo`, `autor`, `editora`, `paginas`) VALUES
	(1, '978-8534614597', 'C# Como Programar', 'Paul Deitel', 'Pearson', 1200),
	(2, '978-8576051916', 'Treinamento em Linguagem C', 'Victorine Viviane Mizrahi', 'Pearson', 432),
	(3, '978-8580414059', 'Fortaleza digita', 'Dan Brown', 'Arqueiro', 336);

-- Copiando estrutura para tabela biblioteca.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(20) NOT NULL DEFAULT '0',
  `Senha` varchar(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
);

-- Copiando dados para a tabela biblioteca.usuarios: ~0 rows (aproximadamente)
INSERT INTO `usuarios` (`Id`, `Usuario`, `Senha`) VALUES
	(1, 'catatau', 'teste');

