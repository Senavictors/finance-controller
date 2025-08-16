import React from 'react';
import './SettingsTab.css';

const SettingsTab = () => {
  return (
    <div className="settings-tab">
      <div className="tab-header">
        <h2>⚙️ Configurações e Perfil</h2>
        <p>Gerencie suas preferências e informações pessoais</p>
      </div>
      
      <div className="settings-content">
        <div className="settings-grid">
          <div className="settings-section">
            <h3>👤 Perfil do Usuário</h3>
            <div className="profile-form">
              <div className="form-group">
                <label>Nome Completo</label>
                <input type="text" placeholder="Seu nome completo" defaultValue="João Silva" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="seu@email.com" defaultValue="joao@email.com" />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input type="tel" placeholder="(11) 99999-9999" defaultValue="(11) 99999-9999" />
              </div>
              <button className="btn-save">Salvar Alterações</button>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>🔐 Segurança</h3>
            <div className="security-options">
              <div className="form-group">
                <label>Senha Atual</label>
                <input type="password" placeholder="Digite sua senha atual" />
              </div>
              <div className="form-group">
                <label>Nova Senha</label>
                <input type="password" placeholder="Digite a nova senha" />
              </div>
              <div className="form-group">
                <label>Confirmar Nova Senha</label>
                <input type="password" placeholder="Confirme a nova senha" />
              </div>
              <button className="btn-save">Alterar Senha</button>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>💰 Preferências Financeiras</h3>
            <div className="financial-preferences">
              <div className="form-group">
                <label>Moeda Principal</label>
                <select defaultValue="BRL">
                  <option value="BRL">Real (R$)</option>
                  <option value="USD">Dólar ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Formato de Data</label>
                <select defaultValue="DD/MM/YYYY">
                  <option value="DD/MM/YYYY">DD/MM/AAAA</option>
                  <option value="MM/DD/YYYY">MM/DD/AAAA</option>
                  <option value="YYYY-MM-DD">AAAA-MM-DD</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notificações</label>
                <div className="checkbox-group">
                  <label className="checkbox-item">
                    <input type="checkbox" defaultChecked />
                    <span>Lembretes de contas</span>
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" defaultChecked />
                    <span>Resumo semanal</span>
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" />
                    <span>Alertas de gastos</span>
                  </label>
                </div>
              </div>
              <button className="btn-save">Salvar Preferências</button>
            </div>
          </div>
          
          <div className="settings-section">
            <h3>🗑️ Dados e Privacidade</h3>
            <div className="data-privacy">
              <div className="privacy-option">
                <h4>Exportar Dados</h4>
                <p>Baixe todos os seus dados em formato CSV</p>
                <button className="btn-export">Exportar</button>
              </div>
              <div className="privacy-option">
                <h4>Excluir Conta</h4>
                <p>Remova permanentemente sua conta e todos os dados</p>
                <button className="btn-delete-account">Excluir Conta</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
