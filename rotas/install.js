const express =  require('express')
const router = express.Router()
const fs = require("fs").promises
const modelo_usuasrio = require('../modelos/modelo_usuario')

const lerJson = async  () =>{
    const dados = await fs.readFile('./json/users.json')
    const lista = JSON.parse(dados)
    return lista
}


router.post('/', async (req,res) =>{
    let {login, senha} = req.body
    let lista = await lerJson()
    if(lista != ''){
        res.status(410).json({msg: "A api já foi instalada"})
    }else{
        await modelo_usuasrio.criarAdm(login, senha)
        res.status(200).json({msg: "primeiro Adm criado com sucesso"})
    }

    // #swagger.summary = 'Instalação da api'
    // #swagger.description = 'Cadastro do primeiro Administrador caso não haja nenhum usuário cadastrado'
    // #swagger.parameters['login'] = { description: 'Nome do primeiro administrador'}
    // #swagger.parameters['senha'] = { description: 'Senhao do primeiro Administrador'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[410] = { description: 'A api já foi instalado no servidor' }
})



module.exports = router