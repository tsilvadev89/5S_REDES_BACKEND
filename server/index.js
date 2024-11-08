const express = require('express');
require('dotenv').config();
const cors = require('cors'); 
const { sequelize } = require('./models');

// Importa as rotas
const clienteRoutes = require('./routes/clienteRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const cargoRoutes = require('./routes/cargoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*' 
}));

// Função para inicializar o banco de dados e o servidor
async function initializeApp() {
  try {
    // Sincroniza o banco de dados com Sequelize
    await sequelize.sync({ alter: true }); // Usar `alter: true` apenas em desenvolvimento para ajustar as tabelas conforme os modelos

    console.log('Banco de dados e tabelas sincronizados com sucesso.');

    // Configuração de rotas
    app.use('/api/agendamentos', agendamentoRoutes);
    app.use('/api/cargos', cargoRoutes);
    app.use('/api/categorias', categoriaRoutes);
    app.use('/api/clientes', clienteRoutes);
    app.use('/api/enderecos', enderecoRoutes);
    app.use('/api/funcionarios', funcionarioRoutes);
    app.use('/api/pedidos', pedidoRoutes);
    app.use('/api/produtos', produtoRoutes);
    app.use('/api/servicos', servicoRoutes);

    app.use((req, res) => {
      res.status(404).json({ message: 'Rota não encontrada' });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
    process.exit(1);
  }
}

initializeApp();
