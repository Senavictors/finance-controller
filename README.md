# 💰 Finance Controller

Um aplicativo completo de controle financeiro pessoal desenvolvido em React, com sistema de autenticação, gestão de transações, categorias, metas financeiras e relatórios detalhados.

## 🚀 Funcionalidades Principais

### 🔐 Sistema de Autenticação
- **Login e Registro** de usuários
- **Sessões seguras** com JWT
- **Proteção de rotas** para usuários autenticados

### 💸 Gestão de Transações
- **Adicionar receitas e despesas**
- **Categorização automática** das transações
- **Histórico completo** com filtros
- **Exclusão e edição** de transações

### 🏷️ Sistema de Categorias
- **Categorias personalizáveis** com ícones
- **Contadores automáticos** por categoria
- **Gestão completa** (adicionar, editar, excluir)

### 🎯 Metas Financeiras
- **Definir objetivos** financeiros
- **Acompanhamento de progresso** com barras visuais
- **Prazos e valores** configuráveis
- **Dashboard de metas** em andamento

### 📊 Relatórios e Analytics
- **Relatórios mensais e anuais**
- **Análise por categoria**
- **Fluxo de caixa** detalhado
- **Progresso das metas**
- **Relatórios personalizados**

### 📈 Dashboard Interativo
- **Resumo financeiro** em tempo real
- **Gráficos de progresso** das metas
- **Próximos vencimentos**
- **Top categorias** de gastos
- **Visão geral** do mês

### ⚙️ Configurações e Perfil
- **Perfil do usuário** personalizável
- **Configurações de segurança** (alteração de senha)
- **Preferências financeiras** (moeda, formato de data)
- **Notificações** configuráveis
- **Exportação de dados** e gestão de privacidade

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal para interface
- **CSS3** - Estilização moderna e responsiva
- **Context API** - Gerenciamento de estado global
- **Hooks** - Funcionalidades reativas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação segura

### Características
- **Design Responsivo** - Funciona em todos os dispositivos
- **Interface Moderna** - UI/UX intuitiva e atrativa
- **Performance Otimizada** - Carregamento rápido e eficiente
- **Código Limpo** - Arquitetura modular e organizada

## 📱 Interface e Design

### Sistema de Abas
O aplicativo utiliza um sistema de navegação por abas para organizar as funcionalidades:

1. **💰 Transações** - Gestão de receitas e despesas
2. **🏷️ Categorias** - Organização das transações
3. **🎯 Metas** - Acompanhamento de objetivos financeiros
4. **📊 Relatórios** - Análises e insights
5. **📈 Dashboard** - Visão geral das finanças
6. **⚙️ Configurações** - Perfil e preferências

### Design Responsivo
- **Desktop**: Layout em grid com múltiplas colunas
- **Tablet**: Ajuste automático para telas médias
- **Mobile**: Layout em coluna única para melhor usabilidade

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MySQL (versão 8.0 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/finance-controller.git
cd finance-controller
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
```bash
# Copie o arquivo de exemplo
cp backend/env.example backend/.env

# Configure as variáveis de ambiente no arquivo .env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=finance_controller
JWT_SECRET=sua_chave_secreta
```

4. **Configure o banco de dados**
```bash
# Execute o script SQL para criar as tabelas
mysql -u seu_usuario -p finance_controller < backend/database/schema.sql
```

5. **Inicie o backend**
```bash
cd backend
npm start
```

6. **Em outro terminal, inicie o frontend**
```bash
# Na pasta raiz do projeto
npm start
```

7. **Acesse o aplicativo**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
finance-controller/
├── src/
│   ├── components/          # Componentes React
│   │   ├── TabNavigation.js # Navegação por abas
│   │   ├── TransactionsTab.js # Aba de transações
│   │   ├── CategoriesTab.js # Aba de categorias
│   │   ├── GoalsTab.js      # Aba de metas
│   │   ├── ReportsTab.js    # Aba de relatórios
│   │   ├── DashboardTab.js  # Aba de dashboard
│   │   ├── SettingsTab.js   # Aba de configurações
│   │   ├── TransactionForm.js # Formulário de transações
│   │   ├── Login.js         # Componente de login
│   │   └── Register.js      # Componente de registro
│   ├── contexts/            # Contextos React
│   │   ├── AuthContext.js   # Contexto de autenticação
│   │   └── TransactionContext.js # Contexto de transações
│   ├── App.js               # Componente principal
│   └── index.js             # Ponto de entrada
├── backend/                 # Servidor Node.js
│   ├── routes/              # Rotas da API
│   ├── database/            # Scripts do banco
│   ├── middleware/          # Middlewares
│   └── server.js            # Servidor principal
└── README.md                # Este arquivo
```

## 🔧 Scripts Disponíveis

### Frontend
- `npm start` - Inicia o servidor de desenvolvimento
- `npm test` - Executa os testes
- `npm run build` - Cria build de produção
- `npm run eject` - Ejecta do Create React App

### Backend
- `npm start` - Inicia o servidor backend
- `npm run dev` - Inicia em modo desenvolvimento com nodemon

## 🌟 Características Destacadas

### Interface Moderna
- **Design limpo** e profissional
- **Animações suaves** e transições
- **Ícones intuitivos** para melhor UX
- **Paleta de cores** harmoniosa

### Funcionalidades Avançadas
- **Sistema de abas** organizado e intuitivo
- **Dashboard interativo** com dados em tempo real
- **Relatórios personalizáveis** com filtros
- **Gestão completa** de categorias e metas

### Segurança
- **Autenticação JWT** segura
- **Proteção de rotas** implementada
- **Validação de dados** no frontend e backend
- **Sessões seguras** para usuários

## 📊 Funcionalidades por Aba

### 💰 Transações
- Formulário para adicionar transações
- Lista completa com histórico
- Filtros por tipo e categoria
- Funcionalidade de exclusão

### 🏷️ Categorias
- Visualização das categorias existentes
- Contadores de transações
- Gestão completa (CRUD)
- Ícones personalizáveis

### 🎯 Metas
- Definição de objetivos financeiros
- Barras de progresso visuais
- Prazos e valores configuráveis
- Acompanhamento em tempo real

### 📊 Relatórios
- Relatórios mensais e anuais
- Análise por categoria
- Fluxo de caixa
- Relatórios personalizados

### 📈 Dashboard
- Resumo financeiro mensal
- Progresso das metas
- Próximos vencimentos
- Top categorias de gastos

### ⚙️ Configurações
- Perfil do usuário
- Configurações de segurança
- Preferências financeiras
- Gestão de dados e privacidade

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Victor Sena** - [victorsena760@gmail.com](mailto:victorsena760@gmail.com)

## 🙏 Agradecimentos

- Comunidade React
- Criadores das bibliotecas utilizadas
- Contribuidores do projeto

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

- Abra uma [issue](../../issues) no GitHub
- Entre em contato: [victorsena760@gmail.com](mailto:victorsena760@gmail.com)

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**
