import { useState } from 'react';
import { useTransactions, CATEGORIES } from '../contexts/TransactionContext';
import './TransactionForm.css';

const TransactionForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  
  const { addTransaction } = useTransactions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim() || !amount.trim() || !categoryId) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const newTransaction = {
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      categoryId,
      date: new Date(date).toISOString()
    };

    const result = await addTransaction(newTransaction);
    
    if (result.success) {
      // Limpar formulário
      setDescription('');
      setAmount('');
      setCategoryId('');
      setDate(new Date().toISOString().split('T')[0]);
      setShowForm(false);
    } else {
      alert(result.message || 'Erro ao criar transação');
    }
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategoryId(''); // Resetar categoria ao mudar tipo
  };

  const getCurrentCategories = () => {
    return CATEGORIES[type] || [];
  };

  return (
    <div className="transaction-form-container">
      {!showForm ? (
        <button 
          onClick={() => setShowForm(true)}
          className="btn-show-form"
        >
          ➕ Adicionar Transação
        </button>
      ) : (
        <div className="transaction-form-wrapper">
          <div className="form-header">
            <h3>Nova Transação</h3>
            <button 
              onClick={() => setShowForm(false)}
              className="btn-close"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="transaction-form">
            {/* Tipo de Transação */}
            <div className="form-row">
              <div className="type-selector">
                <button
                  type="button"
                  className={`type-btn ${type === 'expense' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('expense')}
                >
                  💸 Despesa
                </button>
                <button
                  type="button"
                  className={`type-btn ${type === 'income' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('income')}
                >
                  💰 Receita
                </button>
              </div>
            </div>

            {/* Descrição e Valor */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Almoço, Salário, etc."
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Valor (R$)</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  step="0.01"
                  min="0"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Categoria e Data */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {getCurrentCategories().map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Data</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Botões */}
            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="btn-cancel"
              >
                Cancelar
              </button>
              <button type="submit" className="btn-submit">
                Adicionar Transação
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TransactionForm;
