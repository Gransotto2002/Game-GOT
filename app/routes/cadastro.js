module.exports = application => {
  application.get('/cadastro', (req, res) => {
    application.app.controllers.cadastro.cadastro(application, req, res)
  })

  application.post('/cadastrar', (req, res) => {
    application.app.controllers.cadastro.cadastrar(application, req, res)
  })

}