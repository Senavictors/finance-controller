import React from 'react';
import './CategoriesTab.css';

const CategoriesTab = () => {
  return (
    <div className="categories-tab">
      <div className="tab-header">
        <h2>🏷️ Gerenciar Categorias</h2>
        <p>Organize suas transações com categorias personalizadas</p>
      </div>
      
      <div className="categories-content">
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">🍔</div>
            <div className="category-info">
              <h3>Alimentação</h3>
              <p>15 transações</p>
            </div>
            <div className="category-actions">
              <button className="btn-edit">✏️</button>
              <button className="btn-delete">🗑️</button>
            </div>
          </div>
          
          <div className="category-card">
            <div className="category-icon">🚗</div>
            <div className="category-info">
              <h3>Transporte</h3>
              <p>8 transações</p>
            </div>
            <div className="category-actions">
              <button className="btn-edit">✏️</button>
              <button className="btn-delete">🗑️</button>
            </div>
          </div>
          
          <div className="category-card">
            <div className="category-icon">🏠</div>
            <div className="category-info">
              <h3>Moradia</h3>
              <p>12 transações</p>
            </div>
            <div className="category-actions">
              <button className="btn-edit">✏️</button>
              <button className="btn-delete">🗑️</button>
            </div>
          </div>
          
          <div className="category-card add-category">
            <div className="add-icon">+</div>
            <p>Adicionar Categoria</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTab;
