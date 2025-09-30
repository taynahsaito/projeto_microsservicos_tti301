const express = require('express');
const app = express();
app.use(express.json());

const axios = require("axios");

const {v4: uuidv4} = require ('uuid')

const observacoesPorLembreteId = {}; //dicionario de listas

const funcoes = {
  ObservacaoClassificada:(observacao) =>{
    const observacoes = observacoesPorLembreteId[observacao.lembreteId];
    const obsParaAtualizar = observacoes.find(o => o.id === observacao.id) //filtra pelo id para saber qual observação ele precisa pegar
    obsParaAtualizar.status = observacao.status;
    axios.post('http://localhost:10000/eventos',{
      tipo: "ObservacaoAtualizada",
      dados:{
        id: observacao.id,
        texto: observacao.texto,
        lembreteId: observacao.lembreteId,
        status: observacao.status
      }
    });
  }
}

//:id é um placeholder para o id do lembrete que vai ter observações salvas sobre ele.
app.post("/lembretes/:id/observacoes", async (req, res) => {
  const idObs = uuidv4();
  const { texto } = req.body;
  const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || []; //se ela existir, recupera a lista, se não existe, uma nova lista vazia
  observacoesDoLembrete.push({ id: idObs, texto, status: 'aguardando'});
  observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
  await axios.post('http://localhost:10000/eventos', {
    tipo: "ObservacaoCriada",
    dados: {
    id: idObs, texto, lembreteId: req.params.id, status: 'aguardando'
    }
  });
  res.status(201).send(observacoesDoLembrete);
});

app.get("/lembretes/:id/observacoes", (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post("/eventos", (req, res) => {
  try{ //aqui estamos fazendo o tratamento de erros para o barramento de eventos
  funcoes[req.body.tipo](req.body.dados);
  } catch (err){}
  res.status(200).send({ msg: "ok" });
});

app.listen(5000, (() => {
    console.log('observações do lembrete. porta 5000')
}))