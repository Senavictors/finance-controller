import React from 'react';
import './GoalsTab.css';

const GoalsTab = () => {
  return (
    <div className="goals-tab">
      <div className="tab-header">
        <h2>🎯 Metas Financeiras</h2>
        <p>Defina e acompanhe seus objetivos financeiros</p>
      </div>
      
      <div className="goals-content">
        <div className="goals-grid">
          <div className="goal-card">
            <div className="goal-header">
              <div className="goal-icon">🏠</div>
              <div className="goal-info">
                <h3>Entrada da Casa</h3>
                <p className="goal-amount">R$ 50.000,00</p>
              </div>
            </div>
            <div className="goal-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
              <span className="progress-text">65% (R$ 32.500,00)</span>
            </div>
            <div className="goal-deadline">
              <span>Prazo: Dezembro 2024</span>
            </div>
            <div className="goal-actions">
              <button className="btn-edit">✏️</button>
              <button className="btn-delete">🗑️</button>
            </div>
          </div>
          
          <div className="goal-card">
            <div className="goal-header">
              <div className="goal-icon">🚗</div>
              <div className="goal-info">
                <h3>Carro Novo</h3>
                <p className="goal-amount">R$ 30.000,00</p>
              </div>
            </div>
            <div className="goal-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '40%' }}></div>
              </div>
              <span className="progress-text">40% (R$ 12.000,00)</span>
            </div>
            <div className="goal-deadline">
              <span>Prazo: Junho 2025</span>
            </div>
            <div className="goal-actions">
              <button className="btn-edit">✏️</button>
              <button className="btn-delete">🗑️</button>
            </div>
          </div>
          
          <div className="goal-card">
            <div className="goal-header">
              <div className="goal-icon">✈️</div>
              <div className="goal-info">
                <h3>Viagem Europa</h3>
                <p className="goal-amount">R$ 15.000,00</p>
              </div>
            </div>
            <div className="goal-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '20%' }}></div>
              </div>
              <span className="progress-text">20% (R$ 3.000,00)</span>
            </div>
            <div className="goal-deadline">
              <span>Prazo: Março 2026</span>
            </div>
            <div className="goal-actions">
              <button className="btn-edit">✏️</button>
              <button className="btn-delete">🗑️</button>
            </div>
          </div>
          
          <div className="goal-card add-goal">
            <div className="add-icon">+</div>
            <p>Adicionar Meta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsTab;
