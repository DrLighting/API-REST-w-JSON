const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = {
    validaAcesso: (req,res,next) =>{
        let beartoken = req.headers['authorization'] || ''
        let token = beartoken.split(" ")
        if(token[0] == 'Bearer'){
            token = token[1]
        }
        jwt.verify(token, process.env.SENHA, (err, obj)=>{
            if(err) res.status(498).json({msg: "token inválido " +err})
            else{
                req.usuario = obj.usuario
                next()
            }
        })
    },

    validaAdm: (req,res,next) =>{
        let beartoken = req.headers['authorization'] || ''
        let token = beartoken.split(" ")
        if(token[0] == 'Bearer'){
            token = token[1]
        }
        let user = jwt.decode(token)
        if(user.usuario.isAdm != true){
            res.status(401).json({msg: "Tu não tem autorização de ADM"}) 
        }
        else{req.adm = true}
        next()
    }
}