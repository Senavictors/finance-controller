import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TransactionProvider, useTransactions } from './contexts/TransactionContext';
import Login from './components/Login';
import Register from './components/Register';
import TabNavigation from './components/TabNavigation';
import TransactionsTab from './components/TransactionsTab';
import FixedItemsTab from './components/FixedItemsTab';
import CategoriesTab from './components/CategoriesTab';
import GoalsTab from './components/GoalsTab';
import ReportsTab from './components/ReportsTab';
import DashboardTab from './components/DashboardTab';
import SettingsTab from './components/SettingsTab';
import './App.css';

// Componente principal da aplicação (requer autenticação)
const FinanceApp = () => {
  const [showAuth, setShowAuth] = useState('login'); // 'login' ou 'register'
  const [activeTab, setActiveTab] = useState('transactions');
  const { currentUser, logout } = useAuth();
  const { 
    transactions, 
    categories,
    deleteTransaction, 
    getTotalIncome, 
    getTotalExpenses, 
    getBalance 
  } = useTransactions();

  const handleLogout = () => {
    logout();
  };


  function formatDate(dateString) {
    const data = new Date(dateString);
  
    // opções de formatação
    const opcoes = {
      timeZone: "America/Sao_Paulo", // ajusta para horário do Brasil
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
  
    return data.toLocaleString("pt-BR", opcoes);
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'transactions':
        return (
          <TransactionsTab 
            transactions={transactions}
            deleteTransaction={deleteTransaction}
            formatDate={formatDate}
          />
        );
      case 'fixed-items':
        return <FixedItemsTab />;
      case 'categories':
        return <CategoriesTab />;
      case 'goals':
        return <GoalsTab />;
      case 'reports':
        return <ReportsTab />;
      case 'dashboard':
        return <DashboardTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return (
          <TransactionsTab 
            transactions={transactions}
            deleteTransaction={deleteTransaction}
            formatDate={formatDate}
          />
        );
    }
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

        {/* Navegação por Abas */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Conteúdo das Abas */}
        {renderTabContent()}
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