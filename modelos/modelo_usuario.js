const fs = require('fs').promises
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


const lerJson = async () =>{
    const lista = await fs.readFile('./json/users.json')
    const usuarios = JSON.parse(lista)
    return usuarios
}

const escreveJson = async (user) =>{
    const lista = await lerJson()
    lista.push(user)

    await fs.writeFile('./json/users.json', JSON.stringify(lista))
}

module.exports = {


    async criarAdm(login, senha){
        let adm = {login:login, senha:senha, isAdm:true}

        await escreveJson(adm)
    },
    async criarUser(login, senha){
        let user = {login:login, senha:senha, isAdm:false}

        await escreveJson(user)
    },

    async listagem(){
        let lista = await lerJson()
        let dados = []
        for(let i=0; i < lista.length; i++){
            let user = lista[i].login +", isAdm:"+ lista[i].isAdm
            dados.push(user)
        }
        return dados
    },

    async login(login, senha){
        let lista = await lerJson()
        for(let i=0; i <= lista.length; i++){
            if(lista[i].login == login && lista[i].senha == senha){
                let token = jwt.sign({usuario: lista[i]}, process.env.SENHA, {expiresIn: '30 min'})
                return token
            }
        }
        return null
    },

    async deletarUser(login, senha){
        let lista = await lerJson()
        for(let i=0; i < lista.length; i++){
            if(lista[i].login == login && lista[i].senha == senha){
                lista.splice(i, 1)
                await fs.writeFile('./json/users.json', JSON.stringify(lista))
                return true
            }
        }
        return false

    },


    async updateUser(usuario, newnome, newsenha){
        let lista = await lerJson()
        let oldlogin = usuario.login
        let oldsenha = usuario.senha
        for(let i=0; i <lista.length; i++){
            if(lista[i].login == oldlogin && lista[i].senha == oldsenha){ 
                lista[i].login = newnome
                lista[i].senha = newsenha
                await fs.writeFile('./json/users.json', JSON.stringify(lista))
                return true
            }
        }
        return false
    },

    async updateAdm(oldlogin, oldsenha, newlogin, newsenha){
        let lista = await lerJson()
        for(let i=0; i <lista.length; i++){
            if(lista[i].login == oldlogin && lista[i].senha == oldsenha){ 
                lista[i].login = newlogin
                lista[i].senha = newsenha
                await fs.writeFile('./json/users.json', JSON.stringify(lista))
                return true
            }
        }
        return false

    }

}