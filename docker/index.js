//express – ferramenta para criação de endpoints 
const express = require('express')
const app = express()
//lida com o corpo da requisição, convertendo JSON para obj javascript
app.use(express.json())

//GET hey-docker
//endpoint é definido por 3 partes: método do protocolo HTTP, padrão de acesso e funcionalidade
//padrão de acesso - /hey-docker
//get - método do protocolo
//funcionalidade - arrow function
app.get('/hey-docker', (req, res) => {
    //se não falarmos o status explicitamente, fica subentendido que será 200
    res.status(200).json({mensagem: 'Hey, Docker!!!'})
})

const port = 5200
app.listen(port, () => console.log('Executando num contêiner Docker!'))