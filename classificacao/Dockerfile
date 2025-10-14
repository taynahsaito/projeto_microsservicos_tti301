#descrição de como nosso container vai ser

#alpine: imagem linux "pequena"
FROM node:alpine

#um diretorio no sistema de arquivos do conteiner para os comandos
WORKDIR /app

#copia o arquivo package.json para poder executar npm install
COPY package.json .

#instala as dependencias
RUN npm install

#copia todo o conteudo .local para a imagem
COPY . . 

#executa quando o conteiner entrar em execução
CMD ["npm", "start"]