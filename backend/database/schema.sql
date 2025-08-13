-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS finance_controller;
USE finance_controller;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10) NOT NULL,
    color VARCHAR(7) NOT NULL,
    type ENUM('expense', 'income') NOT NULL,
    is_default BOOLEAN DEFAULT TRUE,
    user_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de transações
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type ENUM('expense', 'income') NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Inserir categorias padrão para despesas
INSERT INTO categories (name, icon, color, type, is_default) VALUES
('Alimentação', '🍽️', '#FF6B6B', 'expense', TRUE),
('Transporte', '🚗', '#4ECDC4', 'expense', TRUE),
('Lazer', '🎮', '#45B7D1', 'expense', TRUE),
('Compras', '🛍️', '#96CEB4', 'expense', TRUE),
('Saúde', '🏥', '#FFEAA7', 'expense', TRUE),
('Educação', '📚', '#DDA0DD', 'expense', TRUE),
('Contas', '📄', '#98D8C8', 'expense', TRUE),
('Outros', '📌', '#F7DC6F', 'expense', TRUE);

-- Inserir categorias padrão para receitas
INSERT INTO categories (name, icon, color, type, is_default) VALUES
('Salário', '💰', '#2ECC71', 'income', TRUE),
('Freelance', '💼', '#3498DB', 'income', TRUE),
('Investimentos', '📈', '#9B59B6', 'income', TRUE),
('Presente', '🎁', '#E67E22', 'income', TRUE),
('Outros', '📌', '#95A5A6', 'income', TRUE);

-- Criar índices para melhor performance
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);
CREATE INDEX idx_categories_type ON categories(type);
CREATE INDEX idx_users_email ON users(email);
