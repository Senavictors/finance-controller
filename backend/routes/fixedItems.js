const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const auth = require('../middleware/auth');
require('dotenv').config();

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'finance_controller'
};

// Middleware de autenticação
router.use(auth);

// GET - Listar todos os itens fixos do usuário
router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(`
      SELECT 
        fi.*,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
      FROM fixed_items fi
      JOIN categories c ON fi.category_id = c.id
      WHERE fi.user_id = ?
      ORDER BY fi.type DESC, fi.description ASC
    `, [req.user.id]);
    
    await connection.end();
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Erro ao buscar itens fixos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// POST - Criar novo item fixo
router.post('/', async (req, res) => {
  try {
    const { description, amount, type, category_id, frequency, start_date, end_date, notes } = req.body;
    
    // Validações básicas
    if (!description || !amount || !type || !category_id || !frequency || !start_date) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos obrigatórios devem ser preenchidos'
      });
    }
    
    const connection = await mysql.createConnection(dbConfig);
    
    const [result] = await connection.execute(`
      INSERT INTO fixed_items 
      (description, amount, type, category_id, user_id, frequency, start_date, end_date, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [description, amount, type, category_id, req.user.id, frequency, start_date, end_date || null, notes || null]);
    
    await connection.end();
    
    res.status(201).json({
      success: true,
      message: 'Item fixo criado com sucesso',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Erro ao criar item fixo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// PUT - Atualizar item fixo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, type, category_id, frequency, start_date, end_date, notes, is_active } = req.body;
    
    const connection = await mysql.createConnection(dbConfig);
    
    // Verificar se o item pertence ao usuário
    const [checkRows] = await connection.execute(`
      SELECT id FROM fixed_items WHERE id = ? AND user_id = ?
    `, [id, req.user.id]);
    
    if (checkRows.length === 0) {
      await connection.end();
      return res.status(404).json({
        success: false,
        message: 'Item fixo não encontrado'
      });
    }
    
    // Atualizar o item
    await connection.execute(`
      UPDATE fixed_items 
      SET description = ?, amount = ?, type = ?, category_id = ?, 
          frequency = ?, start_date = ?, end_date = ?, notes = ?, is_active = ?
      WHERE id = ? AND user_id = ?
    `, [description, amount, type, category_id, frequency, start_date, end_date || null, notes || null, is_active, id, req.user.id]);
    
    await connection.end();
    
    res.json({
      success: true,
      message: 'Item fixo atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar item fixo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// DELETE - Excluir item fixo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await mysql.createConnection(dbConfig);
    
    // Verificar se o item pertence ao usuário
    const [checkRows] = await connection.execute(`
      SELECT id FROM fixed_items WHERE id = ? AND user_id = ?
    `, [id, req.user.id]);
    
    if (checkRows.length === 0) {
      await connection.end();
      return res.status(404).json({
        success: false,
        message: 'Item fixo não encontrado'
      });
    }
    
    // Excluir o item
    await connection.execute(`
      DELETE FROM fixed_items WHERE id = ? AND user_id = ?
    `, [id, req.user.id]);
    
    await connection.end();
    
    res.json({
      success: true,
      message: 'Item fixo excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir item fixo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// GET - Obter estatísticas dos itens fixos
router.get('/stats', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(`
      SELECT 
        type,
        frequency,
        COUNT(*) as count,
        SUM(amount) as total_amount
      FROM fixed_items 
      WHERE user_id = ? AND is_active = TRUE
      GROUP BY type, frequency
    `, [req.user.id]);
    
    await connection.end();
    
    // Calcular totais mensais
    let totalMonthlyIncome = 0;
    let totalMonthlyExpenses = 0;
    
    rows.forEach(row => {
      let multiplier = 1;
      switch (row.frequency) {
        case 'weekly': multiplier = 4.33; break; // 52 semanas / 12 meses
        case 'biweekly': multiplier = 2.17; break; // 26 semanas / 12 meses
        case 'monthly': multiplier = 1; break;
        case 'quarterly': multiplier = 0.33; break;
        case 'yearly': multiplier = 0.083; break;
      }
      
      if (row.type === 'income') {
        totalMonthlyIncome += row.total_amount * multiplier;
      } else {
        totalMonthlyExpenses += row.total_amount * multiplier;
      }
    });
    
    res.json({
      success: true,
      data: {
        items: rows,
        monthlyTotals: {
          income: totalMonthlyIncome,
          expenses: totalMonthlyExpenses,
          balance: totalMonthlyIncome - totalMonthlyExpenses
        }
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
