let express = require('express')
let morgan = require("morgan")
let load = require('express-load')
let jwt = require("jsonwebtoken")
let bodyParser = require('body-parser')
let compression = require('compression')

module.exports = function() {
    morgan.token('id', function getId(req) {
        return req.token
    })

    let app = express()
    app.set('port', 8000)

    //middlewares
    app.use(compression({
        level: 1
    }))
    app.use(express.static('./public'))
    app.use(morgan('TOKEN_USER(:id) METHOD(:method) URL(:url) RESPONSE-TIME(:response-time)'))
    app.use(bodyParser.urlencoded(({
        extended: true
    })))
    app.use(bodyParser.json())
    app.use(require('method-override')())
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
        next()
    })

    //carregando rotas
    load('models', {
        cwd: 'servidor'
    }).then('controllers').then('routes').into(app)
    return app
}
