import React from 'react';
import './TabNavigation.css';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'transactions', label: 'Transações', icon: '💰' },
    { id: 'monthly-expense', label: 'Controle Mensal', icon: '📅' },
    { id: 'fixed-items', label: 'Itens Fixos', icon: '🔒' },
    { id: 'categories', label: 'Categorias', icon: '🏷️' },
    { id: 'goals', label: 'Metas', icon: '🎯' },
    { id: 'reports', label: 'Relatórios', icon: '📊' },
    { id: 'dashboard', label: 'Dashboard', icon: '📈' },
    { id: 'settings', label: 'Configurações', icon: '⚙️' }
  ];

  return (
    <nav className="tab-navigation">
      <div className="tab-list">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;
