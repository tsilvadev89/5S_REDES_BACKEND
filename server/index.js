const express = require('express');
require('dotenv').config();
const createDatabaseAndTables = require('./database/dbCreate'); 

const clienteRoutes = require('./routes/clienteRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
app.use(express.json()); // Middleware para lidar com JSON

// Função para inicializar o banco de dados e o servidor
async function initializeApp() {
  try {
    // Aguarda a criação do banco de dados e das tabelas
    await createDatabaseAndTables();
    console.log('Banco de dados e tabelas configurados com sucesso.');

    // Configurando as rotas para cada recurso após a configuração do banco de dados
    app.use('/api/clientes', clienteRoutes);
    app.use('/api/funcionarios', funcionarioRoutes);
    app.use('/api/produtos', produtoRoutes);
    app.use('/api/servicos', servicoRoutes);
    app.use('/api/pedidos', pedidoRoutes);

    // Middleware para rotas inexistentes
    app.use((req, res) => {
      res.status(404).json({ message: 'Rota não encontrada' });
    });

    // Inicia o servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao configurar o banco de dados:', error);
    process.exit(1); // Finaliza o processo em caso de erro na criação do banco de dados
  }
}

// Executa a inicialização
initializeApp();
