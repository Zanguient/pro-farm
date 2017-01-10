var mongoose = require('mongoose')

module.exports = (uri) => { //poolSice default
    mongoose.connect(uri, {
        poolSize: 5
    })

    mongoose.connection.on('connected', () => {
        console.log('database conectado em ' + uri)
    })

    mongoose.connection.on('disconnected', () => {
        console.log('database desconectado em ' + uri)
    })

    mongoose.connection.on('error', (erro) => {
        console.log('database error. Problemas ao conectar. Erro:' + erro)
    })

    process.on('uncaughtException', (err) => {
        console.log(err)
    })

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('database desconectado pelo termino da aplicação')
            process.exit(0)
        })
    })

    mongoose.set('debug', true)
}
