var ObjectID = require('mongodb').ObjectID;

function jogoDAO(connection){
  this._connection = connection()
}


jogoDAO.prototype.getParams = function(usuario){
  this._connection.open((error, mongoclient) => {
    mongoclient.collection('jogo', (error, collection) => {
      collection.insert({
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
      })

      mongoclient.close()
    })
  })
}


jogoDAO.prototype.iniciarJogo = function(res, usuario, casa, msg){
  this._connection.open((error, mongoclient) =>{
    mongoclient.collection('jogo', (error, collection) => {
      collection.find({usuario : usuario}).toArray((error, result) => {
        
        res.render('jogo', {casa : casa, data : result, msg : msg}) ;
      
        mongoclient.close()
      })
    })
  })
}


jogoDAO.prototype.acao = function(acao){
  this._connection.open((error, mongoclient) =>{
    mongoclient.collection('acoes', (error, collection) => {
      
      var date = new Date();
      let tempo = null; 


      switch(parseInt(acao.acao)){
        case 1: tempo = 1 * 60 * 60000; break;
        case 2: tempo = 2 * 60 * 60000; break;
        case 3: tempo = 5 * 60 * 60000; break;
        case 4: tempo = 5 * 60 * 60000; break;
      }

      acao.termina_em = date.getTime() + tempo;
      collection.insert(acao)
    })

    mongoclient.collection('jogo', (error, collection) => {
      
      var moedas = null
      var quantidade = acao.quantidade
      switch(parseInt(acao.acao)){
        case 1: moedas = -2 * quantidade; break;
        case 2: moedas = -3 * quantidade; break;
        case 3: moedas = -1 * quantidade; break;
        case 4: moedas = -1 * quantidade; break;
      }

      collection.update(
        { usuario : acao.usuario },
        { $inc: {moeda: moedas} }
      )

      mongoclient.close()
    })
  })
}

jogoDAO.prototype.getAcoes = function(usuario, res){
  this._connection.open((error, mongoclient) =>{
    mongoclient.collection('acoes', (error, collection) => {

      var date = new Date();
      var momento_atual = date.getTime();

      collection.find({usuario : usuario, termina_em: {$gt: momento_atual}}).toArray((error, result) => {  
        res.render('pergaminhos', {acoes : result});

        mongoclient.close();
      })
    })
  })
}

jogoDAO.prototype.revogarAcao = function(_id, res){
  this._connection.open(function(error, mongoclient){
  mongoclient.collection('acoes', (error, collection) => {
    collection.remove(
      {_id : ObjectID(_id)},
      function(error, result){
        res.redirect('/jogo?msg=D')
        mongoclient.close()
      })
  })
})
}

module.exports = function(){
  return jogoDAO;
}