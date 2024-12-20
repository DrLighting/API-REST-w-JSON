const fs = require('fs').promises

const lerJson = async () =>{
    const data = await fs.readFile('./json/publisher.json')
    const dados = JSON.parse(data)
    return dados
}

const escreveJson = async (publisher) =>{
    const dados =  await lerJson()
    dados.push(publisher)

    await fs.writeFile('./json/publisher.json', JSON.stringify(dados))
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

    async getjogos(nome){
        let lista = await fs.readFile('./json/jogos.json')
        const dados = JSON.parse(lista)
        let listagames =[]

        for(let i=0; i < dados.length; i++){
            if(dados[i].publisher == nome){
                listagames.push(dados[i])
                //retirar nome da publisher ?
            }
        }

        return listagames
    },

    criarPublisher(nome,pais){
        let publisher = {nome:nome, pais:pais}
        escreveJson(publisher)
        return publisher
    },

    async listarPublisher(){
        let lista = await lerJson()
        return lista
    },

    async updatePublisher(oldnome, newnome, newpais){
        let lista = await lerJson()
        for(let i=0; i < lista.length; i++){
            if(lista[i].nome == oldnome ){
                lista[i].nome = newnome
                lista[i].pais = newpais
                console.log(lista[i])
                await fs.writeFile('./json/publisher.json', JSON.stringify(lista))
                return true
            }
            
        }
        return false
           
        
    },

    async deletePublisher(nome){
        let lista = await lerJson()
        for(let i=0; i< lista.length; i++){
            if(lista[i].nome == nome){
                lista.splice(i, 1)
                await fs.writeFile('./json/publisher.json', JSON.stringify(lista))
                return true
            }

        }
        return false
    }
}