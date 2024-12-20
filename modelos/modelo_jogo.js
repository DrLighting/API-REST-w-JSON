const fs = require('fs').promises

const lerJson = async () =>{
    const data = await fs.readFile('./json/jogos.json')
    const dados = JSON.parse(data)
    return dados
}

const escreveJson = async (jogos) =>{
    const dados =  await lerJson()
    dados.push(jogos)

    let result = await fs.writeFile('./json/jogos.json', JSON.stringify(dados))
}


module.exports = {
    async getName(nome){
        let lista = await lerJson()
        for(let i=0; i < lista.length; i++){
            if(lista[i].nome == nome){
                return  lista[i]
            }
        }
    },

    criarGame(nome,genero,publisher){
        let jogo = {nome:nome, genero:genero, publisher:publisher}
        escreveJson(jogo)
        return jogo
    },

    async listarGame(){
        let lista = await lerJson()
        return lista
    },

    async listarGenero(genero){
        let lista = await lerJson()
        let jogos = []

        for(let i=0;i < lista.length; i++){
            if(lista[i].genero == genero){
                jogos.push(lista[i])
            }
        }
        return jogos
    },

    async updateGame(nome, newnome, newgenero, newpublisher){
        let lista = await lerJson()
        for(let i=0; i < lista.length; i++){
            if(lista[i].nome == nome ){
                lista[i].nome = newnome
                lista[i].genero = newgenero
                lista[i].publisher = newpublisher
                await fs.writeFile('./json/jogos.json', JSON.stringify(lista))
                return true
            }
            
        }
        return false
           
        
    },

    async deleteGame(nome){
        let lista = await lerJson()
        for(let i=0; i< lista.length; i++){
            if(lista[i].nome == nome){
                lista.splice(i, 1)
                await fs.writeFile('./json/jogos.json', JSON.stringify(lista))
                return true
            }

        }
        return false
    }


}