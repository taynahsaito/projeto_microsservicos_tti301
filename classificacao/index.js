const express = require('express')
const app = express();
app.use(express.json());
const axios = require("axios");

const palavraChave = "importante";
const funcoes = {
    ObservacaoCriada:(observacao) =>{
        //verificar se o texto da observacao contém a palavra chave, trocando o status dela, usando operador ternário obrigatoriamente
        observacao.texto.includes(palavraChave)
        ? "importante"
        : "comum";
    axios.post('https://localhost:10000/eventos', {
        tipo: "ObservacaoClassificada",
        dados: observacao,b 
    });
    },
};

//deve ser post e receber requisições no padrão /eventos
app.post('/eventos', (req, res) => {
    try{
    funcoes[req.body.tipo](req.body.dados);
    }catch(err){}
    res.status(200).send({msg: "ok"});
})

//tratamento de eventos perdidos quando o mss ficar inoperante
// colocar o servidor para executar na porta 7000
const port = 7000
//quando o serviço parar de ficar inoperante e voltar, é essa função que vai executar
//async await - forma comum de tratar promises
app.listen(port, async () => {
  console.log(`Classificação. Porta ${port}.`)
  const resp = await axios.get('http://barramento-de-eventos-service:10000/eventos')
    //resp é um resultado da axios
    //corpo da resposta vem associado a 'data'
    //foreach - data é uma lista
  resp.data.forEach((valor, indice, colecao) => {
    try{ //nem todos os eventos que o barramento armazena são de interesse para o classificacao, estamos descartando eventos potencialmente perdidos 
      funcoes[valor.tipo](valor.dados)  
    }
    catch(err){}
  })
})
