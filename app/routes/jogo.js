module.exports = application => {
  application.get('/jogo', (req, res) => {
    application.app.controllers.jogo.jogo(application, req, res)
  })

  application.get('/sair', (req, res) => {
    application.app.controllers.jogo.sair(application, req, res)
  })

  application.get('/suditos', (req, res) => {
    application.app.controllers.jogo.suditos(application, req, res)
  })

  application.get('/pergaminhos', (req, res) => {
    application.app.controllers.jogo.pergaminhos(application, req, res)
  })

  application.post('/ordenar_acao_sudito', (req, res) => {
    application.app.controllers.jogo.ordenar_acao_sudito(application, req, res)
  })

  application.get('/revogar_acao', (req, res) => {
    application.app.controllers.jogo.revogar_acao(application, req, res)
  })

}