import React from 'react';
import './DashboardTab.css';

const DashboardTab = () => {
  return (
    <div className="dashboard-tab">
      <div className="tab-header">
        <h2>📈 Dashboard Financeiro</h2>
        <p>Visão geral e insights das suas finanças</p>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card large">
            <h3>📊 Resumo do Mês</h3>
            <div className="monthly-summary">
              <div className="summary-item">
                <span className="label">Receitas</span>
                <span className="value positive">R$ 3.500,00</span>
              </div>
              <div className="summary-item">
                <span className="label">Despesas</span>
                <span className="value negative">R$ 2.800,00</span>
              </div>
              <div className="summary-item">
                <span className="label">Saldo</span>
                <span className="value positive">R$ 700,00</span>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>🎯 Metas em Andamento</h3>
            <div className="goals-progress">
              <div className="goal-item">
                <span>Entrada da Casa</span>
                <div className="mini-progress">
                  <div className="mini-progress-fill" style={{ width: '65%' }}></div>
                </div>
                <span>65%</span>
              </div>
              <div className="goal-item">
                <span>Carro Novo</span>
                <div className="mini-progress">
                  <div className="mini-progress-fill" style={{ width: '40%' }}></div>
                </div>
                <span>40%</span>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>📅 Próximos Vencimentos</h3>
            <div className="upcoming-payments">
              <div className="payment-item">
                <span className="date">15/12</span>
                <span className="description">Aluguel</span>
                <span className="amount">R$ 800,00</span>
              </div>
              <div className="payment-item">
                <span className="date">20/12</span>
                <span className="description">Conta de Luz</span>
                <span className="amount">R$ 120,00</span>
              </div>
              <div className="payment-item">
                <span className="date">25/12</span>
                <span className="description">Internet</span>
                <span className="amount">R$ 89,90</span>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>🏷️ Top Categorias</h3>
            <div className="top-categories">
              <div className="category-item">
                <span className="category-name">Alimentação</span>
                <span className="category-amount">R$ 450,00</span>
                <div className="category-bar">
                  <div className="category-fill" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="category-item">
                <span className="category-name">Transporte</span>
                <span className="category-amount">R$ 320,00</span>
                <div className="category-bar">
                  <div className="category-fill" style={{ width: '55%' }}></div>
                </div>
              </div>
              <div className="category-item">
                <span className="category-name">Lazer</span>
                <span className="category-amount">R$ 280,00</span>
                <div className="category-bar">
                  <div className="category-fill" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
