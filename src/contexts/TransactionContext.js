import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionProvider');
  }
  return context;
};

export const CATEGORIES = {
  expense: [
    { id: 1, name: 'Alimentacao', icon: '🍽', color: '#FF6B6B' },
    { id: 2, name: 'Transporte', icon: '🚗', color: '#4ECDC4' },
    { id: 3, name: 'Lazer', icon: '🎮', color: '#45B7D1' },
    { id: 4, name: 'Compras', icon: '🛍', color: '#96CEB4' },
    { id: 5, name: 'Saude', icon: '🏥', color: '#FFEAA7' },
    { id: 6, name: 'Educacao', icon: '📚', color: '#DDA0DD' },
    { id: 7, name: 'Contas', icon: '📄', color: '#98D8C8' },
    { id: 8, name: 'Outros', icon: '📌', color: '#F7DC6F' }
  ],
  income: [
    { id: 9, name: 'Salario', icon: '💰', color: '#2ECC71' },
    { id: 10, name: 'Freelance', icon: '💼', color: '#3498DB' },
    { id: 11, name: 'Investimentos', icon: '📈', color: '#9B59B6' },
    { id: 12, name: 'Presente', icon: '🎁', color: '#E67E22' },
    { id: 13, name: 'Outros', icon: '📌', color: '#95A5A6' }
  ]
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const API_BASE_URL = 'http://localhost:3001/api';

  // Função para fazer requisições autenticadas
  const authenticatedFetch = useCallback(async (url, options = {}) => {
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });
  }, [token]);

  // Carregar transações do usuário
  const loadTransactions = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await authenticatedFetch(`${API_BASE_URL}/transactions`);
      const data = await response.json();

      if (data.success) {
        setTransactions(data.data.transactions);
      }
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      setLoading(false);
    }
  }, [token, authenticatedFetch]);

  // Carregar transações quando o token mudar
  useEffect(() => {
    if (token) {
      loadTransactions();
    } else {
      setTransactions([]);
    }
  }, [token, loadTransactions]);

  // Adicionar nova transação
  const addTransaction = async (transactionData) => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        body: JSON.stringify({
          description: transactionData.description,
          amount: transactionData.amount,
          type: transactionData.type,
          categoryId: transactionData.categoryId,
          date: transactionData.date
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Recarregar transações para ter dados atualizados
        await loadTransactions();
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Erro ao criar transação' };
      }
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      return { success: false, message: 'Erro de conexão com o servidor' };
    }
  };

  // Excluir transação
  const deleteTransaction = async (transactionId) => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/transactions/${transactionId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Recarregar transações
        await loadTransactions();
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Erro ao excluir transação' };
      }
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
      return { success: false, message: 'Erro de conexão com o servidor' };
    }
  };

  // Atualizar transação
  const updateTransaction = async (transactionId, transactionData) => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/transactions/${transactionId}`, {
        method: 'PUT',
        body: JSON.stringify({
          description: transactionData.description,
          amount: transactionData.amount,
          type: transactionData.type,
          categoryId: transactionData.categoryId,
          date: transactionData.date
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Recarregar transações
        await loadTransactions();
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Erro ao atualizar transação' };
      }
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
      return { success: false, message: 'Erro de conexão com o servidor' };
    }
  };

  // Funções de cálculo
  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + parseFloat(t.amount || 0), 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + parseFloat(t.amount || 0), 0);
  };

  const getBalance = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const value = {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    loadTransactions,
    getTotalIncome,
    getTotalExpenses,
    getBalance
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
