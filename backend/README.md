# 🚀 Finance Controller - Backend API

Backend completo para o sistema de controle financeiro pessoal, desenvolvido com Node.js, Express e MySQL.

## ✨ Funcionalidades

- **🔐 Autenticação JWT** com bcrypt para senhas
- **👥 Gestão de usuários** (cadastro, login, perfil)
- **💰 Transações** (receitas e despesas)
- **🏷️ Categorização** com categorias padrão e personalizadas
- **📊 Resumos financeiros** em tempo real
- **🛡️ Segurança** com middleware de autenticação

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MySQL** - Banco de dados
- **JWT** - Autenticação stateless
- **bcryptjs** - Criptografia de senhas
- **CORS** - Cross-origin resource sharing

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (5.7 ou superior)
- Beekeeper Studio (ou outro cliente MySQL)

## 🚀 Instalação

### 1. Clonar e instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar banco de dados

#### 2.1. Criar banco no MySQL
Abra o Beekeeper Studio e execute o script SQL:
```sql
-- Arquivo: database/schema.sql
-- Execute todo o conteúdo deste arquivo no seu MySQL
```

#### 2.2. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do backend:
```env
# Configurações do Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=finance_controller
DB_PORT=3306

# Configurações do JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRES_IN=7d

# Configurações do Servidor
PORT=5000
NODE_ENV=development
```

### 3. Executar o servidor

#### Modo desenvolvimento (com auto-reload):
```bash
npm run dev
```

#### Modo produção:
```bash
npm start
```

## 📡 Endpoints da API

### 🔐 Autenticação
- `POST /api/auth/register` - Cadastrar usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Obter perfil do usuário

### 💰 Transações
- `GET /api/transactions` - Listar transações
- `GET /api/transactions/:id` - Obter transação específica
- `POST /api/transactions` - Criar transação
- `PUT /api/transactions/:id` - Atualizar transação
- `DELETE /api/transactions/:id` - Excluir transação
- `GET /api/transactions/summary/overview` - Resumo financeiro

### 🏷️ Categorias
- `GET /api/categories` - Listar categorias
- `GET /api/categories/type/:type` - Categorias por tipo
- `POST /api/categories` - Criar categoria personalizada
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Excluir categoria

## 🔒 Segurança

- **Senhas criptografadas** com bcrypt (12 salt rounds)
- **JWT tokens** com expiração configurável
- **Middleware de autenticação** em todas as rotas protegidas
- **Validação de dados** em todas as entradas
- **Proteção contra SQL injection** com prepared statements

## 📊 Estrutura do Banco

### Tabelas principais:
- **users** - Usuários do sistema
- **categories** - Categorias de transações
- **transactions** - Transações financeiras

### Relacionamentos:
- Usuário → Transações (1:N)
- Categoria → Transações (1:N)
- Usuário → Categorias personalizadas (1:N)

## 🧪 Testando a API

### 1. Verificar se está rodando:
```bash
curl http://localhost:5000
```

### 2. Criar usuário de teste:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário Teste",
    "email": "teste@email.com",
    "password": "123456"
  }'
```

### 3. Fazer login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "password": "123456"
  }'
```

## 🔧 Configurações Avançadas

### Variáveis de ambiente opcionais:
- `NODE_ENV` - Ambiente (development/production)
- `DB_CONNECTION_LIMIT` - Limite de conexões do pool
- `JWT_ALGORITHM` - Algoritmo JWT (padrão: HS256)

### Logs:
- Todas as requisições são logadas com timestamp
- Erros são logados no console
- Logs de conexão com banco de dados

## 🚨 Solução de Problemas

### Erro de conexão com MySQL:
1. Verificar se o MySQL está rodando
2. Confirmar credenciais no arquivo `.env`
3. Verificar se o banco `finance_controller` existe
4. Executar o script `schema.sql`

### Erro de porta em uso:
1. Mudar a porta no arquivo `.env`
2. Verificar se não há outro processo usando a porta
3. Reiniciar o servidor

### Erro de JWT:
1. Verificar se `JWT_SECRET` está configurado
2. Confirmar formato da data de expiração
3. Verificar se o token está sendo enviado corretamente

## 📝 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Desenvolvedor

**Victor** - Desenvolvedor Full Stack

---

**🎯 Próximos passos:** Integrar com o frontend React e implementar funcionalidades avançadas como relatórios e gráficos.




