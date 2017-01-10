let http = require('http')
require('./config/database.js')('mongodb://localhost/fazendas')
let app = require('./config/express')()

http.createServer(app).listen(app.get('port'), () => {
    console.log('Iniciado!')
    console.log('Express Server escutando a porta ' + app.get('port'))
})
