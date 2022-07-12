module.exports.cadastro = (application, req, res) => {
  res.render('cadastro', {validacao: {}, data : {}})
}


module.exports.cadastrar = (application, req, res) => {
  let data = req.body

  req.assert('nome', 'Nome não pode ser vazio').notEmpty()
  req.assert('usuario', 'Nome não pode ser vazio').notEmpty()
  req.assert('senha', 'Senha não pode ser vazia').notEmpty()
  req.assert('casa', 'Casa não pode ser vazia').notEmpty()

  var erros = req.validationErrors()
  if(erros){
    res.render('cadastro', {validacao : erros, data : data})
    return
  }

  var connection = application.config.dbConnection;
  var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
  var jogoDAO = new application.app.models.jogoDAO(connection);

  UsuariosDAO.inserirUsuario(data)
  jogoDAO.getParams(data.usuario)

  res.redirect('/')
}