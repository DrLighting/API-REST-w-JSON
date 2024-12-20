const express =  require('express')
const router = express.Router()

router.get('/:palavra', (req,res) =>{
    let palavra = req.params.palavra
    res.status(200).send("Ola Mundo, " +palavra)
    // #swagger.summary = 'Nascimento'
    // #swagger.description = 'Teste de rota'
    // #swagger.parameters['palavra'] = { description: 'Ira mostrar na tela a palavra digitada'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
})


module.exports = router