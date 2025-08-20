-- Script para atualizar o banco de dados existente
-- Execute este script se você já tem um banco de dados funcionando

USE finance_controller;

-- Adicionar nova tabela de itens fixos (se não existir)
CREATE TABLE IF NOT EXISTS fixed_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type ENUM('expense', 'income') NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    frequency ENUM('weekly', 'biweekly', 'monthly', 'quarterly', 'yearly') DEFAULT 'monthly',
    start_date DATE NOT NULL,
    end_date DATE NULL,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Adicionar novas categorias se não existirem
INSERT IGNORE INTO categories (name, icon, color, type, is_default) VALUES
('Moradia', '🏠', '#E74C3C', 'expense', TRUE),
('Vale Refeição', '🍕', '#F39C12', 'income', TRUE),
('Vale Transporte', '🚌', '#16A085', 'income', TRUE);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_fixed_items_user_id ON fixed_items(user_id);
CREATE INDEX IF NOT EXISTS idx_fixed_items_type ON fixed_items(type);
CREATE INDEX IF NOT EXISTS idx_fixed_items_frequency ON fixed_items(frequency);

-- Verificar se as tabelas foram criadas corretamente
SHOW TABLES LIKE 'fixed_items';

-- Verificar as categorias
SELECT * FROM categories WHERE type = 'income' ORDER BY name;
SELECT * FROM categories WHERE type = 'expense' ORDER BY name;
