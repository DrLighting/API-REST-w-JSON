const express = require('express')
const router = express.Router()
const gameModelo = require("../modelos/modelo_jogo")
const { validaAcesso } = require('../modelos/auth')


//listar
router.get('/', async (req, res) => {
    let lista = await gameModelo.listarGame()
    res.status(200).json({ Lista: lista })

    // #swagger.summary = 'Listar jogos'
    // #swagger.description = 'Listagem de todos os objetos no json'
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
})

//buscar jogo por nome
router.get('/:nome', async (req, res) => {
    let jogo = await gameModelo.getName(req.params.nome)
    if (jogo == '' || jogo == null) {
        res.status(404).json({ msg: "jogo não encontrado" })
    } else {
        res.status(200).json({ Jogo: jogo })
    }

    // #swagger.summary = 'Buscar pelo nome'
    // #swagger.description = 'Retorna o primeiro objeto no json com o mesmo nome'
    // #swagger.parameters['nome'] = { description: 'string de busca'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[404] = { description: 'inexistência do jogo no json' }
})

//busca por genero
router.get('/genero/:genero', async (req, res) => {
    let lista = await gameModelo.listarGenero(req.params.genero)

    if (lista == '') {
        res.status(404).json({ msg: "Genero não encontrado" })
    } else {
        res.status(200).json({ Jogos: lista })
    }
    // #swagger.summary = 'Buscar por gênero'
    // #swagger.description = 'Retorna todos os jogos com o gênero informado'
    // #swagger.parameters['genero'] = { description: 'string de busca'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[404] = { description: 'inexistência do gênero no json' }
})

//criar
router.post('/', validaAcesso, async (req, res) => {
    let { nome, genero, publisher } = req.body
    let jogo = gameModelo.criarGame(nome, genero, publisher)
    res.status(200).json({ jogo: jogo })

    // #swagger.summary = 'Inserir jogo'
    // #swagger.description = 'Insere por concatenação o objeto jogo no json'
    // #swagger.parameters['nome'] = { description: 'Nome do jogo'}
    // #swagger.parameters['ganero'] = { description: 'Gênero do jogo'}
    // #swagger.parameters['publisher'] = { description: 'Publisher do jogo'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
})

//update
router.put('/:nome', validaAcesso, async (req, res) => {
    let oldnome = req.params.nome
    let { newnome, newgenero, newpublisher } = req.body
    let result = gameModelo.updateGame(oldnome, newnome, newgenero, newpublisher)
    if (result) {
        res.status(200).json({ msg: "jogo atualizado com sucesso" })
    } else {
        res.status(500).json({ msg: "Erro ao atualizar dados" })
    }

    // #swagger.summary = 'Atualizar jogo'
    // #swagger.description = 'Atualiza o primeiro objeto no json com o mesmo nome'
    // #swagger.parameters['nome'] = { description: 'Objeto a ser modificado'}
    // #swagger.parameters['newnome'] = { description: 'O novo nome do objeto recebido pelo body'}
    // #swagger.parameters['newgenero'] = { description: 'O novo gênero do objeto recebido pelo body '}
    // #swagger.parameters['newpublisher'] = { description: 'A nova publisher do objeto revebido pelo body'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[500] = { description: 'Erro interno do servidor' }
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
})

//deletar
router.delete('/:nome', validaAcesso, (req, res) => {
    let result = gameModelo.deleteGame(req.params.nome)
    if (result) {
        res.status(200).json({ msg: "jogo deletado com sucesso" })
    } else {
        res.status(500).json({ msg: "erro ao deletar jogo" })
    }

    // #swagger.summary = 'Excluir de um jogo'
    // #swagger.description = 'Exclui o primeiro jogo encontrado com o nome que é passado por parametro na url '
    // #swagger.parameters['nome'] = { description: 'Nome do Objeto a ser excluido'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[500] = { description: 'Erro interno do servidor' }
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
})




module.exports = router