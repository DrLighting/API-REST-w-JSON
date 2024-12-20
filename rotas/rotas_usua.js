const express =  require('express')
const modelo_usuario = require('../modelos/modelo_usuario')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { validaAdm, validaAcesso } = require('../modelos/auth')

router.post('/adm', validaAcesso ,validaAdm, async (req,res) =>{
    const {login, senha} = req.body

    await modelo_usuario.criarAdm(login,senha)

    res.status(200).json({msg: "ADM criado com sucesso"})

    // #swagger.summary = 'Inserir administradores'
    // #swagger.description = 'Rota exclusiva para administradores para criarem outros sdministradores'
    // #swagger.parameters['login'] = { description: 'Nome do usuário'}, type: 'string'
    // #swagger.parameters['senha'] = { description: 'Senha do usuário'} 
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
    // #swagger.responses[401] = { description: 'O usuario não tem acesso de administrador ' }
})

router.post('/user', validaAcesso, validaAdm, async (req,res) =>{
    const {login, senha} = req.body

    await modelo_usuario.criarUser(login,senha)

    res.status(200).json({msg: "Usuario Craido com sucesso"})

    // #swagger.summary = 'Inserir usuário comum'
    // #swagger.description = 'Rota exclusiva para administradores para criação de usuários commum, '
    // #swagger.parameters['login'] = { description: 'Nome do usuário'}
    // #swagger.parameters['senha'] = { description: 'Senha do usuário'} 
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
    // #swagger.responses[401] = { description: 'O usuario não tem acesso de administrador ' }
})

router.post('/login', async (req,res) =>{
    let {login, senha} = req.body
    let token = await modelo_usuario.login(login, senha)
    if(token == '' || token == null){
        res.status(403).json({msg: "Você não tem uma conta cadastrada"})
    }else{
        res.status(200).json({msg: "Bem Vindo caro colega", tolken: token})
    }

    // #swagger.summary = 'Efetuar login'
    // #swagger.description = 'Verifica se o login e senha inseridos está de acordo com algum objeto usuário e se sim gera um token'
    // #swagger.parameters['login'] = { description: 'Nome do usuário'}
    // #swagger.parameters['senha'] = { description: 'Senha do usuário'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[403] = { description: 'As credenciais não reflete nenhum objeto usuário cadastrado' }

        
})

router.get('/', validaAcesso, async (req,res) =>{
    let lista = await modelo_usuario.listagem()
    res.status(200).json({lista: lista})

    // #swagger.summary = 'Listar usuários'
    // #swagger.description = 'Lista todos os objetos usuário no json'
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[403] = { description: 'Token não é valido ou expirado' }
})

router.put('/adm/update/',validaAcesso, validaAdm, async (req,res)=>{
    let {oldlogin, oldsenha, newlogin, newsenha} = req.body
    let result = await modelo_usuario.updateAdm(oldlogin, oldsenha, newlogin, newsenha)
    if(result){
        res.status(200).json({msg: "Usuario alterado com sucesso"})
    }else{
        res.status(500).json({msg: "Erro no server"})
    } 

    // #swagger.summary = 'Atualizar usuários'
    // #swagger.description = 'Rota exclusiva para administradores para atualizar dados os usuários'
    // #swagger.parameters['oldlogin'] = { description: 'Nome do usuário que será substituido'}
    // #swagger.parameters['oldsenha'] = { description: 'Senha do usuário que será substituido'}
    // #swagger.parameters['newlogin'] = { description: 'Novo nome do usuário'}
    // #swagger.parameters['newsenha'] = { description: 'Nova senha do usuário'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[500] = { description: 'Erro interno do servidor' }
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
    // #swagger.responses[401] = { description: 'O usuario não tem acesso de administrador ' }
})

router.put('/user/update',validaAcesso, async(req,res)=>{
    let {newlogin, newsenha} = req.body
    let result = await modelo_usuario.updateUser(req.usuario, newlogin, newsenha)
    if(result){
        res.status(200).json({msg: "Usuario alterado com sucesso"})
    }else{
        res.status(500).json({msg: "Erro no server"})
    }

    // #swagger.summary = 'Atualizar usuário logado'
    // #swagger.description = 'Atualiza os dados do usuario logado'
    // #swagger.parameters['newlogin'] = { description: 'Novo nome do usuário'}
    // #swagger.parameters['newsenha'] = { description: 'Nova senha do usuário'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[500] = { description: 'Erro interno do servidor' }
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
})

router.delete('/adm/deletar/:login/:senha', validaAcesso, validaAdm, async (req,res) =>{
    let {login, senha} = req.params
    let result = await modelo_usuario.deletarUser(login,senha)
    if(result){
        res.status(200).json({msg: "Usuario deletado com sucesso"})
    }else{
        res.status(500).json({msg: "Erro no server"})
    }

    // #swagger.summary = 'Excluir usuário'
    // #swagger.description = 'Rota exclusiva para administradores para excluir um usuário'
    // #swagger.parameters['login'] = { description: 'Nome do usuário a ser deletado'}
    // #swagger.parameters['senha'] = { description: 'Senha do usuário a ser deletado'}
    // #swagger.responses[200] = { description: 'Foi tudo execultado sem percalço' }
    // #swagger.responses[500] = { description: 'Erro interno do servidor' }
    // #swagger.responses[498] = { description: 'Token não é valido ou expirado' }
    // #swagger.responses[401] = { description: 'O usuario não tem acesso de administrador' }
})



module.exports = router