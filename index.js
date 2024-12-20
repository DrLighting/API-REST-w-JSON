const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const swaggerui = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/ola', require('./ola'))
app.use('/install', require('./rotas/install'))
app.use('/game', require('./rotas/rotas_games'))
app.use('/publisher', require('./rotas/rotas_publisher'))
app.use('/usuario', require('./rotas/rotas_usua'))

app.use('/docs', swaggerui.serve, swaggerui.setup(swaggerFile))

app.listen(process.env.PORT,() =>{
    console.log("Estou te ouvindo na porta: " + process.env.PORT)
})