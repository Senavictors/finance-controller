import React, { useState, useEffect } from 'react';
import './FixedItemsTab.css';

const FixedItemsTab = () => {
  const [fixedItems, setFixedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category_id: '',
    frequency: 'monthly',
    start_date: '',
    end_date: '',
    notes: ''
  });
  const [stats, setStats] = useState({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlyBalance: 0
  });

  // Buscar itens fixos e categorias
  useEffect(() => {
    fetchFixedItems();
    fetchCategories();
    fetchStats();
  }, []);

  const fetchFixedItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/fixed-items', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setFixedItems(data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar itens fixos:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/fixed-items/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setStats({
          monthlyIncome: data.data.monthlyTotals.income,
          monthlyExpenses: data.data.monthlyTotals.expenses,
          monthlyBalance: data.data.monthlyTotals.balance
        });
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const url = editingItem 
        ? `/api/fixed-items/${editingItem.id}`
        : '/api/fixed-items';
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (data.success) {
        setShowForm(false);
        setEditingItem(null);
        resetForm();
        fetchFixedItems();
        fetchStats();
      }
    } catch (error) {
      console.error('Erro ao salvar item fixo:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      description: item.description,
      amount: item.amount,
      type: item.type,
      category_id: item.category_id,
      frequency: item.frequency,
      start_date: item.start_date,
      end_date: item.end_date || '',
      notes: item.notes || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/fixed-items/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        if (data.success) {
          fetchFixedItems();
          fetchStats();
        }
      } catch (error) {
        console.error('Erro ao excluir item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category_id: '',
      frequency: 'monthly',
      start_date: '',
      end_date: '',
      notes: ''
    });
  };

  const getFrequencyLabel = (frequency) => {
    const labels = {
      'weekly': 'Semanal',
      'biweekly': 'Quinzenal',
      'monthly': 'Mensal',
      'quarterly': 'Trimestral',
      'yearly': 'Anual'
    };
    return labels[frequency] || frequency;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getFilteredCategories = (type) => {
    return categories.filter(cat => cat.type === type);
  };

  return (
    <div className="fixed-items-tab">
      {/* Resumo dos Itens Fixos */}
      <div className="fixed-items-summary">
        <div className="summary-card">
          <h3>Receitas Mensais</h3>
          <span className="income">R$ {stats.monthlyIncome.toFixed(2)}</span>
        </div>
        <div className="summary-card">
          <h3>Despesas Mensais</h3>
          <span className="expense">R$ {stats.monthlyExpenses.toFixed(2)}</span>
        </div>
        <div className="summary-card">
          <h3>Saldo Mensal</h3>
          <span className={`balance ${stats.monthlyBalance >= 0 ? 'positive' : 'negative'}`}>
            R$ {stats.monthlyBalance.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Botão para adicionar novo item */}
      <div className="add-item-section">
        <button 
          className="btn-add-item"
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            resetForm();
          }}
        >
          ➕ Adicionar Item Fixo
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingItem ? 'Editar Item Fixo' : 'Novo Item Fixo'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Descrição</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Ex: Salário, Aluguel, etc."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Valor</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0,00"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo</label>
                  <select
                    value={formData.type}
                    onChange={(e) => {
                      setFormData({...formData, type: e.target.value, category_id: ''});
                    }}
                  >
                    <option value="income">Receita</option>
                    <option value="expense">Despesa</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {getFilteredCategories(formData.type).map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Frequência</label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                  >
                    <option value="weekly">Semanal</option>
                    <option value="biweekly">Quinzenal</option>
                    <option value="monthly">Mensal</option>
                    <option value="quarterly">Trimestral</option>
                    <option value="yearly">Anual</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Data de Início</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data de Fim (opcional)</label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Observações</label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Observações adicionais"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  {editingItem ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de Itens Fixos */}
      <div className="fixed-items-list">
        <h3>Receitas Fixas</h3>
        {fixedItems.filter(item => item.type === 'income').map(item => (
          <div key={item.id} className="fixed-item-card income">
            <div className="item-info">
              <div className="item-header">
                <span className="item-icon">{item.category_icon}</span>
                <h4>{item.description}</h4>
                <span className="item-amount">R$ {parseFloat(item.amount).toFixed(2)}</span>
              </div>
              <div className="item-details">
                <span className="frequency">{getFrequencyLabel(item.frequency)}</span>
                <span className="category">{item.category_name}</span>
                <span className="dates">
                  {formatDate(item.start_date)}
                  {item.end_date && ` - ${formatDate(item.end_date)}`}
                </span>
              </div>
              {item.notes && <p className="notes">{item.notes}</p>}
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(item)} className="btn-edit">✏️</button>
              <button onClick={() => handleDelete(item.id)} className="btn-delete">🗑️</button>
            </div>
          </div>
        ))}

        <h3>Despesas Fixas</h3>
        {fixedItems.filter(item => item.type === 'expense').map(item => (
          <div key={item.id} className="fixed-item-card expense">
            <div className="item-info">
              <div className="item-header">
                <span className="item-icon">{item.category_icon}</span>
                <h4>{item.description}</h4>
                <span className="item-amount">R$ {parseFloat(item.amount).toFixed(2)}</span>
              </div>
              <div className="item-details">
                <span className="frequency">{getFrequencyLabel(item.frequency)}</span>
                <span className="category">{item.category_name}</span>
                <span className="dates">
                  {formatDate(item.start_date)}
                  {item.end_date && ` - ${formatDate(item.end_date)}`}
                </span>
              </div>
              {item.notes && <p className="notes">{item.notes}</p>}
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(item)} className="btn-edit">✏️</button>
              <button onClick={() => handleDelete(item.id)} className="btn-delete">🗑️</button>
            </div>
          </div>
        ))}

        {fixedItems.length === 0 && (
          <div className="empty-state">
            <p>Nenhum item fixo cadastrado ainda.</p>
            <p>Clique em "Adicionar Item Fixo" para começar!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixedItemsTab;
