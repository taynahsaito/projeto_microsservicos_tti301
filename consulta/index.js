const express = require('express')
const app = express() //instanciando o express
app.use(express.json())

//memória temporária
const baseConsulta = {}

//funções
const funcoes = {
    //recebe lembrete como parametro
    LembreteCriado :(lembrete) => {
        //guardar em baseConsulta, porém o contador será a chave
        baseConsulta[lembrete.contador] = lembrete; //callback anonimo
    },
    //recebe observação como parametro
    ObservacaoCriada:(observacao) => {
        //se não existir, ele cria, caso contrário, ele atualiza as observações de lembretes pelo ID
        const observacoes = baseConsulta[observacao.lembreteId]
            ['observacoes'] || [];
        observacoes.push(observacao);
        //atualiza a baseConsulta com as observações
        baseConsulta[observacao.lembreteId]['observacoes'] = observacoes;
    }
}

app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta); //retorna a nossa memoria temporaria (baseConsulta) inteira e um status 200 de sucesso
});

app.post("/eventos", (req, res) => {
    funcoes[req.body.tipo](req.body.dados); //acessa o objeto funcoes e executa a função correspondente ao tipo de evento (LembreteCriado ou ObservacaoCriada)
    res.status(200).send(baseConsulta);
});

//inicia o servidor na porta 6000
app.listen(6000, () => console.log("Consultas. Porta 6000"));


//a prova vai ate arq de classificação - apostila de microserviços

//consulta so recebe de lembrete e obs, consulta nao depende de classificação para nao travar,