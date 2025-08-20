import React, { useState, useMemo, useEffect } from 'react';
import { useTransactions } from '../contexts/TransactionContext';
import './MonthlyExpense.css';

const MonthlyExpense = () => {
  const { transactions, loading, categories, loadTransactions } = useTransactions();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Nomes dos meses em português
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Filtrar transações do mês selecionado
  const monthlyTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.transaction_date);
      return transactionDate.getMonth() === selectedMonth && 
             transactionDate.getFullYear() === selectedYear;
    });
  }, [transactions, selectedMonth, selectedYear]);

  // Calcular totais do mês
  const monthlyTotals = useMemo(() => {
    const income = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + parseFloat(t.amount || 0), 0);

    const expenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + parseFloat(t.amount || 0), 0);
    
    const balance = income - expenses;
    
    return { income, expenses, balance };
  }, [monthlyTransactions]);

  // Formatar valor monetário
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Formatar data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Obter nome da categoria
  const getCategoryName = (transaction) => {
    // Se a transação já vem com category_name do banco, usar diretamente
    if (transaction.category_name) {
      return transaction.category_name;
    }
    
    // Fallback para buscar no contexto de categorias
    if (!categories || !categories[transaction.type]) return 'Categoria não encontrada';
    
    const category = categories[transaction.type].find(cat => cat.id === transaction.category_id);
    return category ? category.name : 'Categoria não encontrada';
  };

  // Gerar opções de anos (últimos 5 anos + próximos 2 anos)
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 2; i++) {
      years.push(i);
    }
    return years;
  }, []);

  // Carregar transações quando o mês ou ano mudar
  useEffect(() => {
    loadTransactions(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, loadTransactions]);



  if (loading) {
    return (
      <div className="monthly-expense">
        <div className="loading">Carregando transações...</div>
      </div>
    );
  }

  return (
    <div className="monthly-expense">
      <h2>Controle do Mês</h2>
      
      {/* Seletor de Mês e Ano */}
      <div className="month-selector">
        <label htmlFor="month-select">Mês:</label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {monthNames.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        
        <label htmlFor="year-select">Ano:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {yearOptions.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Cards de Overview */}
      <div className="overview-cards">
        <div className="overview-card income">
          <h3>Ganhos do Mês</h3>
          <p className="amount">{formatCurrency(monthlyTotals.income)}</p>
        </div>
        
        <div className="overview-card expense">
          <h3>Gastos do Mês</h3>
          <p className="amount">{formatCurrency(monthlyTotals.expenses)}</p>
        </div>
        
        <div className="overview-card balance">
          <h3>Saldo do Mês</h3>
          <p className="amount">{formatCurrency(monthlyTotals.balance)}</p>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="transactions-section">
        <h3>Transações de {monthNames[selectedMonth]} {selectedYear}</h3>
        
        {monthlyTransactions.length === 0 ? (
          <div className="no-transactions">
            Nenhuma transação encontrada para este mês.
          </div>
        ) : (
          <div className="transactions-list">
            {monthlyTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-description">
                    {transaction.description}
                  </div>
                                     <div className="transaction-category">
                     {getCategoryName(transaction)}
                   </div>
                                   <div className="transaction-date">
                   {formatDate(transaction.transaction_date)}
                 </div>
                </div>
                
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyExpense;