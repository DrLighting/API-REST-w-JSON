const express = require('express')
const router = express.Router()
const modeloPublisher = require('../modelos/modelo_publisher')
const { validaAcesso } = require('../modelos/auth')

//listar
router.get('/', async (req, res) => {
    let lista = await modeloPublisher.listarPublisher()
    res.status(200).json({ Lista: lista })

    // #swagger.summary = 'Listar publisher'
    // #swagger.description = 'Retorna uma lista com todos os objetos dentro do json'
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
})

//buscar publisher por nome
router.get('/:nome', async (req, res) => {
    let empresa = await modeloPublisher.getName(req.params.nome)
    if (empresa == '' || empresa == null) {
        res.status(404).json({ msg: "Publisher não encontrado" })
    } else {
        res.status(200).json({ Publisher: empresa })
    }

    // #swagger.summary = 'Buscar por nome'
    // #swagger.description = 'Retorna o primeiro objeto com o mesmo nome'
    // #swagger.parameters['nome'] = { description: 'string de busca'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[404] = { description: 'Ausência de objeto com tal nome' }

})

//buscar jogos da publisher
router.get('/jogos/:nome', async (req, res) => {
    let jogos = await modeloPublisher.getjogos(req.params.nome)
    if (jogos == []) {
        res.status(404).json({ msg: "Essa empresa não possui jogos lançados" })
    } else {
        res.status(200).json({ lista: jogos })
    }

    // #swagger.summary = 'Buscar publisher por nome'
    // #swagger.description = 'Listagem de todos os jogos lançados pela publisher'
    // #swagger.parameters['nome'] = { description: 'Nome da publisherC'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[404] = { description: 'Ausência de objeto relacionado ao nome da publisher' }
})

//criar
router.post('/', validaAcesso, async (req, res) => {
    let { nome, pais } = req.body
    let empresa = await modeloPublisher.criarPublisher(nome, pais)
    res.status(200).json({ publisher: empresa })

    // #swagger.summary = 'Inserir publisher'
    // #swagger.description = 'Inserção de um objeto do tipo publisher por concatenação'
    // #swagger.parameters['nome'] = { description: 'nome da publisher recebido pelo body'}
    // #swagger.parameters['pais'] = { description: 'país da publisher recebido pelo body'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
})

//update
router.put('/:nome', validaAcesso, async (req, res) => {
    let oldnome = req.params.nome
    let { newnome, newpais } = req.body
    let result = await modeloPublisher.updatePublisher(oldnome, newnome, newpais)
    if (result) {
        res.status(200).json({ msg: "Dados da publisher atualizado com sucesso" })
    } else {
        res.status(500).json({ msg: "Erro ao atualizar" })
    }

    // #swagger.summary = 'Atualizar publisher'
    // #swagger.description = 'Atuliza o priemrio objeto publisher no json com o mesmo nome'
    // #swagger.parameters['nome'] = { description: 'Nome antigo da publisher'}
    // #swagger.parameters['newnome'] = { description: 'Novo nome da publisher'}
    // #swagger.parameters['newpais'] = { description: 'Novo país da publisher'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }  
    // #swagger.responses[500] = { description: 'Erro interno do servidor' }  
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
})

//deletar
router.delete('/:nome', validaAcesso, async (req, res) => {
    let result = await modeloPublisher.deletePublisher(req.params.nome)
    if (result) {
        res.status(200).json({ msg: "Publisher deletado com sucesso" })
    } else {
        res.status(500).json({ msg: "Erro ao deletar a publisher" })
    }

    // #swagger.summary = 'Excluir publisher'
    // #swagger.description = 'Exclui o primeiro objeto publisher no json com o mesmo nome'
    // #swagger.parameters['nome'] = { description: 'String de busca'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[500] = { description: 'Erro interno do servidor' }
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
})

module.exports = router