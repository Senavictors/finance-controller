import React from 'react';
import './ReportsTab.css';

const ReportsTab = () => {
  return (
    <div className="reports-tab">
      <div className="tab-header">
        <h2>📊 Relatórios Financeiros</h2>
        <p>Analise seus dados financeiros com relatórios detalhados</p>
      </div>
      
      <div className="reports-content">
        <div className="reports-grid">
          <div className="report-card">
            <div className="report-icon">📈</div>
            <h3>Relatório Mensal</h3>
            <p>Análise completa de receitas e despesas do mês</p>
            <button className="btn-generate">Gerar Relatório</button>
          </div>
          
          <div className="report-card">
            <div className="report-icon">🏷️</div>
            <h3>Por Categoria</h3>
            <p>Gastos organizados por categoria de despesa</p>
            <button className="btn-generate">Gerar Relatório</button>
          </div>
          
          <div className="report-card">
            <div className="report-icon">📅</div>
            <h3>Relatório Anual</h3>
            <p>Visão geral do ano com tendências e comparações</p>
            <button className="btn-generate">Gerar Relatório</button>
          </div>
          
          <div className="report-card">
            <div className="report-icon">💰</div>
            <h3>Fluxo de Caixa</h3>
            <p>Entradas e saídas de dinheiro ao longo do tempo</p>
            <button className="btn-generate">Gerar Relatório</button>
          </div>
          
          <div className="report-card">
            <div className="report-icon">🎯</div>
            <h3>Progresso das Metas</h3>
            <p>Acompanhamento do progresso das suas metas financeiras</p>
            <button className="btn-generate">Gerar Relatório</button>
          </div>
          
          <div className="report-card">
            <div className="report-icon">📊</div>
            <h3>Relatório Personalizado</h3>
            <p>Crie relatórios com filtros e parâmetros específicos</p>
            <button className="btn-generate">Gerar Relatório</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;
