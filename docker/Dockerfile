#imagem
FROM node:22-alpine

#dizendo que meu diretorio fica na raiz/app
WORKDIR /app

#copiamos o package.json localmente para o /app com as dependencias
COPY package.json .

#lê o package,json e cria o node_modules com todas as dependencias
RUN npm i

#copia todo o diretorio atual, que é o diretorio onde se encontra o docker file (primeiro ponto) para o diretorio /app de dentro da imagem que estou criando    
COPY . .

#qual a porta que o conteiner estará disponivel
EXPOSE 5200

#colocamos o app em execução1
CMD ["node", "index.js"]