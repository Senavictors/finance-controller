# 🚀 Guia de Conexão com Postman - Finance Controller API

## 📋 Pré-requisitos

1. **Postman instalado** - [Download aqui](https://www.postman.com/downloads/)
2. **Backend rodando** na porta 3001
3. **Banco de dados MySQL** configurado e funcionando

## 🔧 Configuração Inicial

### 1. Importar Coleção
1. Abra o Postman
2. Clique em **"Import"** (botão azul no canto superior esquerdo)
3. Arraste o arquivo `FinanceController_API.postman_collection.json` ou clique em "Upload Files"
4. Clique em **"Import"**

### 2. Importar Ambiente
1. No Postman, clique em **"Import"** novamente
2. Arraste o arquivo `FinanceController_Environment.postman_environment.json`
3. Clique em **"Import"**
4. No canto superior direito, selecione o ambiente **"Finance Controller Environment"**

## 🚀 Primeiros Passos

### 1. Testar Status da API
1. Selecione a requisição **"🏠 Status da API"**
2. Clique em **"Send"**
3. Você deve receber uma resposta confirmando que a API está funcionando

### 2. Cadastrar Primeiro Usuário
1. Selecione **"📝 Cadastrar Usuário"**
2. No corpo da requisição, você pode modificar os dados:
   ```json
   {
     "name": "Seu Nome",
     "email": "seu@email.com",
     "password": "123456"
   }
   ```
3. Clique em **"Send"**
4. Copie o `token` da resposta

### 3. Configurar Token de Autenticação
1. No canto superior direito, clique no ícone de **"Environment"**
2. Na variável `auth_token`, cole o token copiado
3. Clique em **"Save"**

## 🔐 Fluxo de Autenticação

### Login
1. Use a requisição **"🔑 Login"** com suas credenciais
2. A resposta incluirá um novo token
3. Atualize a variável `auth_token` com o novo token

### Verificar Perfil
1. Use **"👤 Perfil do Usuário"** para verificar se está autenticado
2. Se receber erro 401, faça login novamente

## 💰 Gerenciando Transações

### Criar Transação
1. Use **"➕ Criar Transação"**
2. Exemplo de corpo:
   ```json
   {
     "description": "Salário",
     "amount": 5000.00,
     "type": "income",
     "categoryId": 1,
     "date": "2024-01-15"
   }
   ```

### Listar Transações
1. Use **"📋 Listar Transações"** para ver todas as transações
2. Use **"🔍 Buscar Transação por ID"** para uma transação específica

## 🏷️ Gerenciando Categorias

### Ver Categorias Existentes
1. Use **"📋 Listar Categorias"** para ver todas as categorias
2. Use **"🔍 Buscar Categorias por Tipo"** para filtrar por tipo (expense/income)

### Criar Categoria Personalizada
1. Use **"➕ Criar Categoria"**
2. Exemplo:
   ```json
   {
     "name": "Viagem",
     "icon": "✈️",
     "color": "#FF6B6B",
     "type": "expense"
   }
   ```

## 📊 Relatórios e Resumos

### Resumo por Período
1. Use **"📊 Resumo por Período"**
2. Modifique os parâmetros `startDate` e `endDate` conforme necessário

### Resumo por Categoria
1. Use **"📈 Resumo por Categoria"**
2. Útil para análises de gastos e receitas

## 🔧 Variáveis de Ambiente

| Variável | Descrição | Valor Padrão |
|----------|-----------|---------------|
| `base_url` | URL base da API | `http://localhost:3001` |
| `auth_token` | Token JWT para autenticação | (vazio - preencher após login) |
| `user_id` | ID do usuário logado | (vazio - preencher após login) |
| `user_email` | Email para testes | `teste@exemplo.com` |
| `user_password` | Senha para testes | `123456` |

## 🚨 Solução de Problemas

### Erro 401 - Não Autorizado
- Faça login novamente
- Verifique se o token está correto na variável `auth_token`
- Verifique se o token não expirou

### Erro 500 - Erro Interno do Servidor
- Verifique se o backend está rodando
- Verifique se o banco de dados está conectado
- Verifique os logs do servidor

### Erro de CORS
- Verifique se o middleware CORS está configurado no backend
- Verifique se está acessando a URL correta

## 📱 Testando no Frontend

Após testar todas as rotas no Postman:

1. **Inicie o frontend**: `npm start` na pasta `finance-controller`
2. **Inicie o backend**: `npm run dev` na pasta `finance-controller/backend`
3. **Teste as funcionalidades** no navegador

## 🔄 Atualizações

Para manter a coleção atualizada:

1. **Exporte** a coleção atualizada do Postman
2. **Substitua** o arquivo `FinanceController_API.postman_collection.json`
3. **Compartilhe** com a equipe

## 📚 Recursos Adicionais

- **Documentação da API**: Consulte o código das rotas para detalhes
- **Logs do Servidor**: Monitore o console do backend para debug
- **Banco de Dados**: Use um cliente MySQL para verificar os dados

---

**🎉 Sua aplicação Finance Controller está agora conectada ao Postman!**

Teste todas as funcionalidades e aproveite para desenvolver e debugar sua API de forma eficiente.
