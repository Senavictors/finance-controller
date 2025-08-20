import React from 'react';
import TransactionForm from './TransactionForm';
import './TransactionsTab.css';

const TransactionsTab = ({ transactions, deleteTransaction, formatDate }) => {
  return (
    <div className="transactions-tab">
      <div className="tab-header">
        <h2>💰 Transações</h2>
        <p>Gerencie suas receitas e despesas</p>
      </div>
      
      <div className="transactions-content">
        {/* Formulário de Transação */}
        <div className="form-section">
          <TransactionForm />
        </div>

        {/* Lista de Transações */}
        <div className="transactions-section">
          <h3>Histórico de Transações</h3>
          {transactions.length === 0 ? (
            <p className="no-transactions">Nenhuma transação registrada ainda.</p>
          ) : (
            <div className="transactions-list">
              {transactions.map(transaction => (
                <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
                  <div className="transaction-info">
                    <div className="transaction-main">
                      <span className="transaction-description">{transaction.description}</span>
                      <span className="transaction-category">
                        {transaction.category_icon} {transaction.category_name}
                      </span>
                    </div>
                    <span className="transaction-date">{formatDate(transaction.transaction_date)}</span>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsTab;
