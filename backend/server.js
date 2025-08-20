const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');

// Importar rotas
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');
const fixedItemsRoutes = require('./routes/fixedItems');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/fixed-items', fixedItemsRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Finance Controller API está rodando!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      transactions: '/api/transactions',
      categories: '/api/categories',
      fixedItems: '/api/fixed-items'
    }
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Rota para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Testar conexão com banco
    await testConnection();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🎉 Servidor rodando na porta ${PORT}`);
      console.log(`📱 Frontend: http://localhost:3000`);
      console.log(`🔧 API: http://localhost:${PORT}`);
      console.log(`📊 Banco: MySQL conectado com sucesso!`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();



