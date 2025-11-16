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

app.listen(7000, () => console.log("Classificação. Porta 7000"))

