// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const populateData = require('./populate/populateData');
const clienteRoutes = require('./routes/clienteRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const cargoRoutes = require('./routes/cargoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const authRoutes = require('./routes/authRoutes');
const lgpdRoutes = require('./routes/lgpdRoutes');

const app = express();
app.use(express.json());

// Configuração do CORS
const allowedOrigins = [
  'http://localhost:3000', // Localhost
  'http://3.215.171.25:8001', // IP 8001
  'http://3.215.171.25:8002', // IP 8002
  'http://3.215.171.25:8003', // IP 8003
];

app.use(cors({
  origin: (origin, callback) => {
    console.log(`Origin recebida: ${origin}`);
    if (!origin || allowedOrigins.includes(origin)) {
      // Permitir requisições sem origem ou de origens confiáveis
      callback(null, true);
    } else {
      console.log(`Origin não permitida: ${origin}`);
      callback(new Error('Origin não permitida pelo CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
}));


app.use((req, res, next) => {
  console.log(`Requisição recebida:`);
  console.log(`- Método: ${req.method}`);
  console.log(`- URL: ${req.url}`);
  console.log(`- Origem: ${req.headers.origin || 'Sem origem (provavelmente requisição local)'}`);
  console.log(`- User-Agent: ${req.headers['user-agent']}`);
  console.log(`- Headers:`, req.headers);
  next();
});

// Rota de saúde para monitoramento
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Backend está funcionando corretamente' });
});

async function initializeApp() {
  try {
    await populateData(); // Criação e população do banco de dados
    console.log('Banco de dados configurado e populado.');

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
    app.use('/api/auth', authRoutes);
    app.use('/api/lgpd', lgpdRoutes);

    // Log para requisições não encontradas
    app.use((req, res) => {
      console.log(`Rota não encontrada: ${req.url}`);
      res.status(404).json({ message: 'Rota não encontrada' });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao configurar o banco de dados:', error);
    process.exit(1);
  }
}

initializeApp();
