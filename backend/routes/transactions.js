const express = require('express');
const { query } = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(auth);

// GET - Listar todas as transações do usuário
router.get('/', async (req, res) => {
  try {
    const { month, year } = req.query;
    
    let querySql = `
      SELECT 
        t.id,
        t.description,
        t.amount,
        t.type,
        t.category_id,
        t.transaction_date,
        t.created_at,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ?
    `;
    
    let queryParams = [req.user.userId];
    
    // Se month e year foram fornecidos, filtrar por mês e ano
    if (month !== undefined && year !== undefined) {
      querySql += ` AND MONTH(t.transaction_date) = ? AND YEAR(t.transaction_date) = ?`;
      queryParams.push(parseInt(month) + 1, parseInt(year)); // +1 porque getMonth() retorna 0-11
    }
    
    querySql += ` ORDER BY t.transaction_date DESC, t.created_at DESC`;
    
    const transactions = await query(querySql, queryParams);

    res.json({
      success: true,
      data: {
        transactions
      }
    });

  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// GET - Obter transação específica
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const transactions = await query(`
      SELECT 
        t.id,
        t.description,
        t.amount,
        t.type,
        t.category_id,
        t.transaction_date,
        t.created_at,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE t.id = ? AND t.user_id = ?
    `, [id, req.user.userId]);

    if (transactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Transação não encontrada'
      });
    }

    res.json({
      success: true,
      data: {
        transaction: transactions[0]
      }
    });

  } catch (error) {
    console.error('Erro ao buscar transação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// POST - Criar nova transação
router.post('/', async (req, res) => {
  try {
    const { description, amount, type, categoryId, date } = req.body;

    // Validações
    if (!description || !amount || !type || !categoryId || !date) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    if (type !== 'expense' && type !== 'income') {
      return res.status(400).json({
        success: false,
        message: 'Tipo deve ser "expense" ou "income"'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valor deve ser maior que zero'
      });
    }

    // Verificar se a categoria existe e pertence ao tipo correto
    const categories = await query(
      'SELECT id FROM categories WHERE id = ? AND type = ?',
      [categoryId, type]
    );

    if (categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Categoria inválida para este tipo de transação'
      });
    }

    // Inserir transação
    const result = await query(`
      INSERT INTO transactions (description, amount, type, category_id, user_id, transaction_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [description, amount, type, categoryId, req.user.userId, date]);

    const transactionId = result.insertId;

    // Buscar transação criada com dados da categoria
    const newTransactions = await query(`
      SELECT 
        t.id,
        t.description,
        t.amount,
        t.type,
        t.category_id,
        t.transaction_date,
        t.created_at,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE t.id = ?
    `, [transactionId]);

    res.status(201).json({
      success: true,
      message: 'Transação criada com sucesso',
      data: {
        transaction: newTransactions[0]
      }
    });

  } catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// PUT - Atualizar transação
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, type, categoryId, date } = req.body;

    // Verificar se a transação existe e pertence ao usuário
    const existingTransactions = await query(
      'SELECT id FROM transactions WHERE id = ? AND user_id = ?',
      [id, req.user.userId]
    );

    if (existingTransactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Transação não encontrada'
      });
    }

    // Validações
    if (!description || !amount || !type || !categoryId || !date) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    if (type !== 'expense' && type !== 'income') {
      return res.status(400).json({
        success: false,
        message: 'Tipo deve ser "expense" ou "income"'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valor deve ser maior que zero'
      });
    }

    // Verificar se a categoria existe e pertence ao tipo correto
    const categories = await query(
      'SELECT id FROM categories WHERE id = ? AND type = ?',
      [categoryId, type]
    );

    if (categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Categoria inválida para este tipo de transação'
      });
    }

    // Atualizar transação
    await query(`
      UPDATE transactions 
      SET description = ?, amount = ?, type = ?, category_id = ?, transaction_date = ?
      WHERE id = ? AND user_id = ?
    `, [description, amount, type, categoryId, date, id, req.user.userId]);

    // Buscar transação atualizada
    const updatedTransactions = await query(`
      SELECT 
        t.id,
        t.description,
        t.amount,
        t.type,
        t.category_id,
        t.transaction_date,
        t.created_at,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE t.id = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Transação atualizada com sucesso',
      data: {
        transaction: updatedTransactions[0]
      }
    });

  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// DELETE - Excluir transação
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se a transação existe e pertence ao usuário
    const existingTransactions = await query(
      'SELECT id FROM transactions WHERE id = ? AND user_id = ?',
      [id, req.user.userId]
    );

    if (existingTransactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Transação não encontrada'
      });
    }

    // Excluir transação
    await query(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [id, req.user.userId]
    );

    res.json({
      success: true,
      message: 'Transação excluída com sucesso'
    });

  } catch (error) {
    console.error('Erro ao excluir transação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// GET - Resumo financeiro do usuário
router.get('/summary/overview', async (req, res) => {
  try {
    // Total de receitas
    const incomeResult = await query(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions 
      WHERE user_id = ? AND type = 'income'
    `, [req.user.userId]);

    // Total de despesas
    const expenseResult = await query(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions 
      WHERE user_id = ? AND type = 'expense'
    `, [req.user.userId]);

    const totalIncome = parseFloat(incomeResult[0].total);
    const totalExpenses = parseFloat(expenseResult[0].total);
    const balance = totalIncome - totalExpenses;

    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance
      }
    });

  } catch (error) {
    console.error('Erro ao buscar resumo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;



