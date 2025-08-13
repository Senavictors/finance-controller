import React from 'react';

const Home = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#f5f6fa'
    }}>
      <h1>Finance Controller</h1>
      <p>Bem-vindo ao seu aplicativo de controle financeiro!</p>
      <div style={{
        marginTop: 32,
        padding: 24,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h2>Resumo</h2>
        <ul>
          <li>Saldo atual: R$ 0,00</li>
          <li>Receitas do mês: R$ 0,00</li>
          <li>Despesas do mês: R$ 0,00</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;