import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionProvider');
  }
  return context;
};



export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState({ expense: [], income: [] });
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const { token } = useAuth();

  const API_BASE_URL = 'http://localhost:3001/api';

  // Função para fazer requisições autenticadas
  const authenticatedFetch = async (url, options = {}) => {
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
  };

  // Carregar categorias do usuário
  const loadCategories = async () => {
    if (!token) return;

    try {
      setCategoriesLoading(true);
      const response = await authenticatedFetch(`${API_BASE_URL}/categories`);
      const data = await response.json();

      if (data.success) {
        console.log('Categorias carregadas:', data.data.categories);
        setCategories(data.data.categories);
      } else {
        console.error('Erro ao carregar categorias:', data.message);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Carregar transações do usuário
  const loadTransactions = async () => {
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
  };

  // Carregar transações e categorias quando o token mudar
  useEffect(() => {
    if (token) {
      loadTransactions();
      loadCategories();
    } else {
      setTransactions([]);
      setCategories({ expense: [], income: [] });
    }
  }, [token]);

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
    categories,
    loading,
    categoriesLoading,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    loadTransactions,
    loadCategories,
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
