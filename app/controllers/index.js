module.exports.index = (application, req, res) => {
  res.render('index', {validacao : {}, data : {}})
}


module.exports.autenticar = (application, req, res) => {
  let data = req.body;

  req.assert('usuario', 'Preencha o campo usuário').notEmpty()
  req.assert('senha', 'Preencha o campo senha').notEmpty()

  var erros = req.validationErrors();



  if(erros){
    res.render('index', {validacao : erros, data : data})
    return
  }

  var connection = application.config.dbConnection;
  var UsuariosDAO = new application.app.models.UsuariosDAO(connection)


  UsuariosDAO.autenticar(data, req, res);


}