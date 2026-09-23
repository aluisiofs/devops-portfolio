// Importa o framework Express para criação do servidor HTTP
const express = require('express');
const app = express(); 

// Define a porta em que o servidor irá rodar
const PORT = 3000; 

// Rota principal: responde com uma mensagem de confirmação
app.get('/', (req, res) => { 
res.send('🚀 Aplicação rodando com sucesso dentro de um Container Docker!'); 
}); 

// Inicializa o servidor escutando na porta configurada
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`); 
});
