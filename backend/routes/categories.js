const express = require('express');
const { query } = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(auth);

// GET - Listar todas as categorias (padrão + personalizadas do usuário)
router.get('/', async (req, res) => {
  try {
    const categories = await query(`
      SELECT 
        id,
        name,
        icon,
        color,
        type,
        is_default,
        user_id,
        created_at
      FROM categories 
      WHERE is_default = TRUE OR user_id = ?
      ORDER BY type, is_default DESC, name
    `, [req.user.userId]);

    // Organizar por tipo
    const organizedCategories = {
      expense: categories.filter(c => c.type === 'expense'),
      income: categories.filter(c => c.type === 'income')
    };

    res.json({
      success: true,
      data: {
        categories: organizedCategories
      }
    });

  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// GET - Listar categorias por tipo
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;

    if (type !== 'expense' && type !== 'income') {
      return res.status(400).json({
        success: false,
        message: 'Tipo deve ser "expense" ou "income"'
      });
    }

    const categories = await query(`
      SELECT 
        id,
        name,
        icon,
        color,
        type,
        is_default,
        user_id,
        created_at
      FROM categories 
      WHERE type = ? AND (is_default = TRUE OR user_id = ?)
      ORDER BY is_default DESC, name
    `, [type, req.user.userId]);

    res.json({
      success: true,
      data: {
        categories
      }
    });

  } catch (error) {
    console.error('Erro ao buscar categorias por tipo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// POST - Criar categoria personalizada
router.post('/', async (req, res) => {
  try {
    const { name, icon, color, type } = req.body;

    // Validações
    if (!name || !icon || !color || !type) {
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

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Nome deve ter entre 2 e 100 caracteres'
      });
    }

    // Verificar se já existe categoria com mesmo nome para o usuário
    const existingCategories = await query(`
      SELECT id FROM categories 
      WHERE name = ? AND type = ? AND user_id = ?
    `, [name, type, req.user.userId]);

    if (existingCategories.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Já existe uma categoria com este nome para este tipo'
      });
    }

    // Inserir nova categoria
    const result = await query(`
      INSERT INTO categories (name, icon, color, type, user_id, is_default)
      VALUES (?, ?, ?, ?, ?, FALSE)
    `, [name, icon, color, type, req.user.userId]);

    const categoryId = result.insertId;

    // Buscar categoria criada
    const newCategories = await query(`
      SELECT 
        id,
        name,
        icon,
        color,
        type,
        is_default,
        user_id,
        created_at
      FROM categories 
      WHERE id = ?
    `, [categoryId]);

    res.status(201).json({
      success: true,
      message: 'Categoria criada com sucesso',
      data: {
        category: newCategories[0]
      }
    });

  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// PUT - Atualizar categoria personalizada
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, color } = req.body;

    // Verificar se a categoria existe e pertence ao usuário
    const existingCategories = await query(`
      SELECT id, is_default FROM categories 
      WHERE id = ? AND user_id = ?
    `, [id, req.user.userId]);

    if (existingCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Categoria não encontrada'
      });
    }

    // Não permitir editar categorias padrão
    if (existingCategories[0].is_default) {
      return res.status(400).json({
        success: false,
        message: 'Não é possível editar categorias padrão'
      });
    }

    // Validações
    if (!name || !icon || !color) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Nome deve ter entre 2 e 100 caracteres'
      });
    }

    // Verificar se já existe outra categoria com mesmo nome para o mesmo tipo
    const duplicateCategories = await query(`
      SELECT id FROM categories 
      WHERE name = ? AND type = (SELECT type FROM categories WHERE id = ?) 
      AND user_id = ? AND id != ?
    `, [name, id, req.user.userId, id]);

    if (duplicateCategories.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Já existe uma categoria com este nome para este tipo'
      });
    }

    // Atualizar categoria
    await query(`
      UPDATE categories 
      SET name = ?, icon = ?, color = ?
      WHERE id = ? AND user_id = ?
    `, [name, icon, color, id, req.user.userId]);

    // Buscar categoria atualizada
    const updatedCategories = await query(`
      SELECT 
        id,
        name,
        icon,
        color,
        type,
        is_default,
        user_id,
        created_at
      FROM categories 
      WHERE id = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Categoria atualizada com sucesso',
      data: {
        category: updatedCategories[0]
      }
    });

  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// DELETE - Excluir categoria personalizada
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se a categoria existe e pertence ao usuário
    const existingCategories = await query(`
      SELECT id, is_default FROM categories 
      WHERE id = ? AND user_id = ?
    `, [id, req.user.userId]);

    if (existingCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Categoria não encontrada'
      });
    }

    // Não permitir excluir categorias padrão
    if (existingCategories[0].is_default) {
      return res.status(400).json({
        success: false,
        message: 'Não é possível excluir categorias padrão'
      });
    }

    // Verificar se existem transações usando esta categoria
    const transactionsUsingCategory = await query(`
      SELECT COUNT(*) as count FROM transactions 
      WHERE category_id = ? AND user_id = ?
    `, [id, req.user.userId]);

    if (parseInt(transactionsUsingCategory[0].count) > 0) {
      return res.status(400).json({
        success: false,
        message: 'Não é possível excluir categoria que possui transações associadas'
      });
    }

    // Excluir categoria
    await query(`
      DELETE FROM categories 
      WHERE id = ? AND user_id = ?
    `, [id, req.user.userId]);

    res.json({
      success: true,
      message: 'Categoria excluída com sucesso'
    });

  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
