import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TransactionProvider, useTransactions, CATEGORIES } from './contexts/TransactionContext';
import Login from './components/Login';
import Register from './components/Register';
import TransactionForm from './components/TransactionForm';
import './App.css';

// Componente principal da aplicação (requer autenticação)
const FinanceApp = () => {
  const [showAuth, setShowAuth] = useState('login'); // 'login' ou 'register'
  const { currentUser, logout } = useAuth();
  const { 
    transactions, 
    deleteTransaction, 
    getTotalIncome, 
    getTotalExpenses, 
    getBalance 
  } = useTransactions();

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCategoryInfo = (categoryId, type) => {
    const category = CATEGORIES[type]?.find(c => c.id === categoryId);
    return category || { name: 'Sem categoria', icon: '📌', color: '#999' };
  };

  if (!currentUser) {
    return (
      <div className="auth-wrapper">
        {showAuth === 'login' ? (
          <Login onSwitchToRegister={() => setShowAuth('register')} />
        ) : (
          <Register onSwitchToLogin={() => setShowAuth('login')} />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        {/* Header com informações do usuário */}
        <header className="header">
          <div className="header-content">
            <div className="header-info">
              <h1>💰 Finance Controller</h1>
              <p>Bem-vindo, {currentUser.name}!</p>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              🚪 Sair
            </button>
          </div>
        </header>

        {/* Resumo Financeiro */}
        <div className="summary">
          <div className="summary-card">
            <h3>Saldo</h3>
            <span className={`balance ${getBalance() >= 0 ? 'positive' : 'negative'}`}>
              R$ {getBalance().toFixed(2)}
            </span>
          </div>
          <div className="summary-card">
            <h3>Receitas</h3>
            <span className="income">R$ {getTotalIncome().toFixed(2)}</span>
          </div>
          <div className="summary-card">
            <h3>Despesas</h3>
            <span className="expense">R$ {getTotalExpenses().toFixed(2)}</span>
          </div>
        </div>

        {/* Formulário de Transação */}
        <div className="form-section">
          <TransactionForm />
        </div>

        {/* Lista de Transações */}
        <div className="transactions-section">
          <h2>Histórico de Transações</h2>
          {transactions.length === 0 ? (
            <p className="no-transactions">Nenhuma transação registrada ainda.</p>
          ) : (
            <div className="transactions-list">
              {transactions.map(transaction => {
                const categoryInfo = getCategoryInfo(transaction.categoryId, transaction.type);
                return (
                  <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
                    <div className="transaction-info">
                      <div className="transaction-main">
                        <span className="transaction-description">{transaction.description}</span>
                        <span className="transaction-category">
                          {categoryInfo.icon} {categoryInfo.name}
                        </span>
                      </div>
                      <span className="transaction-date">{formatDate(transaction.date)}</span>
                    </div>
                    <div className="transaction-amount">
                      <span className={`amount ${transaction.type}`}>
                        {transaction.type === 'expense' ? '-' : '+'} R$ {parseFloat(transaction.amount || 0).toFixed(2)}
                      </span>
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="btn-remove"
                        title="Remover transação"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// App principal com providers
function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <FinanceApp />
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;