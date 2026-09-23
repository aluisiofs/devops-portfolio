
# 1. FROM: Define a imagem base a ser baixada do Docker Hub (Node.js versão 18) [12, 15]
FROM node:18-alpine

# 2. WORKDIR: Define o diretório de trabalho dentro do container [15]
WORKDIR /usr/src/app

# 3. COPY: Copia os arquivos de dependências da sua máquina para dentro do container
COPY package*.json ./

# 4. RUN: Executa comandos durante a construção da imagem (instala pacotes)
RUN npm install

# 5. COPY: Copia o restante do código-fonte para o container
COPY . .

# 6. EXPOSE: Informa a porta que o container estará escutando
EXPOSE 3000

# 7. CMD: Define o comando padrão que será executado quando o container iniciar [15]
CMD ["npm", "start"]
