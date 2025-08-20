# 📅 Itens Fixos - Finance Controller

## 🎯 O que são Itens Fixos?

Os **Itens Fixos** são rendas e despesas que se repetem regularmente, como:
- **Receitas Fixas**: Salário, Vale Refeição, Vale Transporte, Freelance
- **Despesas Fixas**: Aluguel, Mensalidade da Faculdade, Contas de Luz/Água, Seguro

## ✨ Funcionalidades

### 📊 Resumo Mensal
- **Receitas Mensais**: Total de todas as receitas fixas convertidas para valor mensal
- **Despesas Mensais**: Total de todas as despesas fixas convertidas para valor mensal  
- **Saldo Mensal**: Diferença entre receitas e despesas fixas

### 🔄 Frequências Suportadas
- **Semanal**: Repete toda semana
- **Quinzenal**: Repete a cada 15 dias
- **Mensal**: Repete todo mês (padrão)
- **Trimestral**: Repete a cada 3 meses
- **Anual**: Repete todo ano

### 📝 Campos do Formulário
- **Descrição**: Nome do item (ex: "Salário", "Aluguel")
- **Valor**: Valor monetário
- **Tipo**: Receita ou Despesa
- **Categoria**: Categoria específica (Salário, Moradia, etc.)
- **Frequência**: Com que frequência o item se repete
- **Data de Início**: Quando começa a valer
- **Data de Fim**: Quando termina (opcional)
- **Observações**: Notas adicionais

## 🚀 Como Usar

### 1. Acessar a Aba
- Clique na aba **"Itens Fixos"** na navegação principal

### 2. Adicionar Novo Item
- Clique no botão **"➕ Adicionar Item Fixo"**
- Preencha todos os campos obrigatórios
- Clique em **"Salvar"**

### 3. Editar Item Existente
- Clique no ícone **✏️** ao lado do item
- Modifique os campos desejados
- Clique em **"Atualizar"**

### 4. Excluir Item
- Clique no ícone **🗑️** ao lado do item
- Confirme a exclusão

## 💡 Exemplos Práticos

### Receitas Fixas
```
Descrição: Salário
Valor: R$ 3.500,00
Tipo: Receita
Categoria: Salário
Frequência: Mensal
Data de Início: 01/01/2024
```

```
Descrição: Vale Refeição
Valor: R$ 25,00
Tipo: Receita
Categoria: Vale Refeição
Frequência: Diário (convertido para mensal)
Data de Início: 01/01/2024
```

### Despesas Fixas
```
Descrição: Aluguel
Valor: R$ 1.200,00
Tipo: Despesa
Categoria: Moradia
Frequência: Mensal
Data de Início: 01/01/2024
```

```
Descrição: Mensalidade Faculdade
Valor: R$ 800,00
Tipo: Despesa
Categoria: Educação
Frequência: Mensal
Data de Início: 01/01/2024
Data de Fim: 31/12/2024
```

## 🔧 Configuração Técnica

### Banco de Dados
A funcionalidade cria automaticamente:
- Tabela `fixed_items` para armazenar os itens
- Novas categorias padrão (Moradia, Vale Refeição, Vale Transporte)
- Índices para melhor performance

### API Endpoints
- `GET /api/fixed-items` - Listar todos os itens
- `POST /api/fixed-items` - Criar novo item
- `PUT /api/fixed-items/:id` - Atualizar item
- `DELETE /api/fixed-items/:id` - Excluir item
- `GET /api/fixed-items/stats` - Estatísticas mensais

## 📱 Responsividade
- Interface otimizada para desktop e mobile
- Formulário adaptável para diferentes tamanhos de tela
- Cards responsivos para visualização dos itens

## 🎨 Design
- Cards coloridos por tipo (verde para receitas, vermelho para despesas)
- Ícones das categorias para identificação visual
- Hover effects e transições suaves
- Cores consistentes com o resto da aplicação

## 🔮 Próximas Funcionalidades
- Notificações de vencimento
- Integração com calendário
- Relatórios específicos de itens fixos
- Sincronização com transações automáticas
- Alertas de orçamento

## 🐛 Solução de Problemas

### Item não aparece na lista
- Verifique se está marcado como "Ativo"
- Confirme se a data de início não é futura
- Verifique se não há data de fim expirada

### Cálculo incorreto do valor mensal
- A frequência é convertida automaticamente para valor mensal
- Semanal: multiplicado por 4.33 (52 semanas / 12 meses)
- Quinzenal: multiplicado por 2.17 (26 semanas / 12 meses)
- Trimestral: dividido por 3
- Anual: dividido por 12

### Erro ao salvar
- Verifique se todos os campos obrigatórios estão preenchidos
- Confirme se a categoria selecionada é do tipo correto
- Verifique se a data de início é válida

## 📞 Suporte
Para dúvidas ou problemas, verifique:
1. Console do navegador para erros JavaScript
2. Logs do servidor backend
3. Conexão com o banco de dados
4. Autenticação do usuário
