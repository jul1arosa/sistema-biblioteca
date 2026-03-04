const mysql = require('mysql2/promise');



async function connect()
{
    if(global.connection && global.connection.state !== 'disconnected') return global.connection;
    const connection = await mysql.createConnection({
          host     : 'localhost',
          port     : 3306,
          user     : 'root',
          password : '123',
          database: 'biblioteca' });
    console.log('Conectou no MySQL!');
    global.connection = connection;
    return global.connection;
}



async function getUsuario(usuario, senha)
{
    const conn= await connect();
    const sql= "SELECT * FROM usuarios where usuario=? and senha=?;";
    const[rows] = await conn.query(sql,[usuario, senha]);
    return rows;
}



async function getLivros()
{
    const conn= await connect();
    const sql= `SELECT * FROM livros ORDER BY titulo;`;
    const [result] = await conn.query(sql);
    return result;
}   



async function getLivro(id) 
{
    const conn = await connect();
    const sql = 'SELECT * FROM livros WHERE id = ?;';
    const [rows] = await conn.query(sql, [id]);
    return rows[0];
}



async function saveLivro(livro) 
{
    const conn = await connect();
    const sql = 'INSERT INTO livros (isbn, titulo, autor, editora, paginas) VALUES (?, ?, ?, ?, ?);';
    const [result] = await conn.query(sql, [livro.isbn, livro.titulo, livro.autor, livro.editora, livro.paginas]);
    return result.insertId;
}



async function updateLivro(id, livro) 
{
    const conn = await connect();   
    const sql = 'UPDATE livros SET isbn = ?, titulo = ?, autor = ?, editora = ?, paginas = ? WHERE id = ?;';
    await conn.query(sql, [livro.isbn, livro.titulo, livro.autor, livro.editora, livro.paginas, id]);
}



async function deleteLivro(id) 
{
    const conn = await connect();   
    const sql = 'DELETE FROM livros WHERE id = ?;';
    await conn.query(sql, [id]);
}



connect();


module.exports= { getUsuario, getLivros, getLivro, saveLivro, updateLivro, deleteLivro };