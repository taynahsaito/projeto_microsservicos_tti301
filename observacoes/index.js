const express = require('express');
const app = express();
app.use(express.json());

const {v4: uuidv4} = require ('uuid')

const observacoesPorLembreteId = {}; //dicionario de listas

const axios = require("axios");

//:id é um placeholder para o id do lembrete que vai ter observações salvas sobre ele.
app.put("/lembretes/:id/observacoes", async (req, res) => {
  const idObs = uuidv4();
  const { texto } = req.body;
  const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []; //se ela existir, recupera a lista, se não existe, uma nova lista vazia
  observacoesDoLembrete.push({ id: idObs, texto });
  observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
  await axios.post('http://localhost:10000/eventos', {
    tipo: "ObservacaoCriada",
    dados: {
    id: idObs, texto, lembreteId: req.params.id
    }
  })
  res.status(201).send(observacoesDoLembrete);
});

app.get("/lembretes/:id/observacoes", (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.listen(5000, (() => {
    console.log('observações do lembrete. porta 5000')
}))