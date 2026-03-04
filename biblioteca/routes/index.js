var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sistema de Biblioteca' });
});



/* POST login */
router.post('/login', async function(req, res, next) {
  const { usuario, senha } = req.body;

  const registro = await global.db.getUsuario(usuario, senha);
  if(registro.length > 0){
    // Sucesso na autenticação
    global.usuarioLogado = registro[0];
    console.log('Usuário logado:', global.usuarioLogado);
    res.redirect('/dashboard');
  } else {
    // Falha na autenticação
    res.render('index', { title: 'Sistema de Biblioteca', erro: 'Usuário ou senha inválidos!' });
  }
});



/* GET logout */
router.get('/logout', function(req, res, next) {
  global.usuarioLogado = null;
  res.redirect('/');
});



/* GET dashboard */
router.get('/dashboard', function(req, res, next) {
  if(!global.usuarioLogado){
    res.redirect('/');
    return;
  }
  res.render('dashboard', { title: 'Dashboard - Sistema de Biblioteca', usuario: global.usuarioLogado.Usuario });
});



/* GET livros */
router.get('/livros', async function(req, res, next) {
  if(!global.usuarioLogado){
    res.redirect('/');
    return;
  }
  const livros = await global.db.getLivros();
  res.render('livros', { title: 'Livros - Sistema de Biblioteca', usuario: global.usuarioLogado.Usuario, livros: livros });
});



/* GET livro novo */
router.get('/livros/novo', function(req, res, next) {
  if(!global.usuarioLogado){
    res.redirect('/');
    return;
  }
  res.render('livros_form', { title: 'Novo Livro - Sistema de Biblioteca', usuario: global.usuarioLogado.Usuario, livro: null });
});



/* GET livro editar */
router.get('/livros/editar/:id', async function(req, res, next) {
  if(!global.usuarioLogado){
    res.redirect('/');
    return;
  }
  const id = req.params.id;
  const livro = await global.db.getLivro(id);
  if(!livro){
    res.redirect('/livros');
    return;
  }
  res.render('livros_form', { title: 'Editar Livro - Sistema de Biblioteca', usuario: global.usuarioLogado.Usuario, livro: livro });
});



/* POST livro salvar */
router.post('/livros/salvar', async function(req, res, next) {
  if(!global.usuarioLogado){
    res.redirect('/');
    return;
  }
  const livro = {
    isbn: req.body.isbn,
    titulo: req.body.titulo,
    autor: req.body.autor,
    editora: req.body.editora,
    paginas: req.body.paginas
  };
  await global.db.saveLivro(livro);
  res.redirect('/livros');
});



/* POST livro atualizar */
router.post('/livros/atualizar/:id', async function(req, res, next) {
  if(!global.usuarioLogado){
    res.redirect('/');
    return;
  }
  const id = req.params.id;
  const livro = {
    isbn: req.body.isbn,
    titulo: req.body.titulo,
    autor: req.body.autor,
    editora: req.body.editora,
    paginas: req.body.paginas
  };
  await global.db.updateLivro(id, livro);
  res.redirect('/livros');
});



/* GET livro deletar */
router.get('/livros/excluir/:id', async function(req, res, next) {
  if(!global.usuarioLogado){
    res.redirect('/');
    return;
  }
  const id = req.params.id;
  await global.db.deleteLivro(id);
  res.redirect('/livros');
});



module.exports = router;
