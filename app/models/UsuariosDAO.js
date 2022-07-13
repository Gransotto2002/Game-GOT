var crypto = require('crypto')

function UsuariosDAO(connection){
  this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
  this._connection.open((error, mongoclient) => {
    mongoclient.collection('usuarios', (error, collection) =>{

      let senha_hash = crypto.createHash('md5').update(usuario.senha).digest('hex')

      usuario.senha = senha_hash

      collection.insert(usuario);
      mongoclient.close();
    })
  });
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
  this._connection.open((error, mongoclient) => {
    mongoclient.collection('usuarios', (error, collection) =>{

      let senha_hash = crypto.createHash('md5').update(usuario.senha).digest('hex')
      usuario.senha = senha_hash
      console.log(usuario.senha);
      collection.find(usuario).toArray((error, result) => {
        
        if(result[0] != undefined){
          req.session.autorizado = true;

          req.session.usuario = result[0].usuario;
          req.session.casa = result[0].casa;

        }

        if(req.session.autorizado){
          res.redirect('jogo')
        }else{
          res.render('index', {validacao : {}, data : usuario})
        }
      });

      mongoclient.close();
    })
  });
}

module.exports = function(){
  return UsuariosDAO;
}