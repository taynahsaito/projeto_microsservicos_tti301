//importando o módulo 'express', que é tipo um framework para criar servidores web em Nodejs
const express = require('express');

//criando uma instância do aplicativo express, a partir desse 'app' que configuramos rotas e middleware posteriormente
const app = express()

//configurando para processar os 'corpos' de requisições no formato JSON, ou seja, permite receber JSON
app.use(express.json());

//criando um objeto vazio chamado lembretes que será o banco de dados temporário
const lembretes = {}; 

//esse contador vai receber o ID dos lembretes
contador = 0;

const axios = require("axios");

//rota GET para o caminho /lembretes - quando alguem vai fazer uma requisição, vai para esse caminho
app.get('/lembretes', (req, res) => {
    //envia todo o objeto lembretes como resposta
    res.send(lembretes);
});

//rota PUT para o caminho /lembretes
app.post("/lembretes", async (req, res) => {
  contador++;
  //extraindo a propriedade 'texto' do corpo do JSON
  const { texto } = req.body;
  //adicionando um novo lembrete, usando um ID e colocando contador, texto no lembrete
  lembretes[contador] = {
    contador,
    texto, //texto é o corpo do JSON
  };
  await axios.post("http://localhost:10000/eventos", {
     tipo: "LembreteCriado",
    dados: {
     contador,
     texto,
    },
  });
  //é o status de resposta 201, que é 'created', diz que foi criado com sucesso
  res.status(201).send(lembretes[contador]);
});

app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.status(200).send({ msg: "ok" });
});

//inicia o servidor fazendo o mesmo ficar escutando (procurando) por requisições na porta 4000
app.listen(4000, () => {
    console.log('Lembretes. Porta 4000')
})