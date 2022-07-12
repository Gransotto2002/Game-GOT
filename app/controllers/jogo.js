const { application } = require("express")

module.exports.jogo = (application, req, res) => {
  if(req.session.autorizado != true){
    res.send('Usuário precisa estar logado')
    return
  }

  var msg = ''
  if(req.query.msg != ''){
    msg = req.query.msg
  }

  let connection = application.config.dbConnection;
  let jogoDAO = new application.app.models.jogoDAO(connection);
  let usuario = req.session.usuario;
  let casa = req.session.casa

  jogoDAO.iniciarJogo(res, usuario, casa, msg);
}

module.exports.sair = (application, req, res) => {
  req.session.destroy((error) => {
    res.render('index', {validacao : {}, data : {}});
  });
}

module.exports.suditos = (application, req, res) => {
  if(req.session.autorizado != true){
    res.send('Usuário precisa estar logado')
    return
  }

  res.render('aldeoes', {validacao : {}, data : {}});
}

module.exports.pergaminhos = (application, req, res) => {
  if(req.session.autorizado != true){
    res.send('Usuário precisa estar logado')
    return
  }

  /* Recuperar ações no Banco de Dados */

  var connection = application.config.dbConnection;
  var jogoDAO = new application.app.models.jogoDAO(connection);
  var usuario = req.session.usuario;

  jogoDAO.getAcoes(usuario, res);
}

module.exports.ordenar_acao_sudito = (application, req, res) => {
  if(req.session.autorizado != true){
    res.send('Usuário precisa estar logado')
    return
  }

  let data = req.body
  req.assert('acao', 'Ação deve ser informada').notEmpty()
  req.assert('quantidade', 'Quantidade deve ser informada').notEmpty()

  let erros = req.validationErrors();

  if(erros){
    res.redirect('/jogo?msg=error')
    return;
  }

  let connection = application.config.dbConnection;
  let jogoDAO = new application.app.models.jogoDAO(connection);
 
  data.usuario =  req.session.usuario

  jogoDAO.acao(data)
  res.redirect('/jogo?msg=sucess')
}

module.exports.revogar_acao = (application, req, res) => {
  var url_query = req.query
  var _id = url_query.id_acao

  let connection = application.config.dbConnection;
  let jogoDAO = new application.app.models.jogoDAO(connection);
 
  jogoDAO.revogarAcao(_id, res)
}