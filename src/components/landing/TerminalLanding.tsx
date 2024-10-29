// src/components/landing/TerminalLanding.tsx
import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import './TerminalLanding.css';

const TerminalLanding = () => {
  const [text, setText] = useState('');
  const [isAccessing, setIsAccessing] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const fullText = `> Initialisation de la connexion sécurisée...
> Scan des ports disponibles...
> Point d'accès détecté
> Tentative d'infiltration du système...
> Protocoles de sécurité contournés
> Bienvenue dans le système. Procédez avec précaution.`;

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setText(currentText);
        currentIndex++;
        setTimeout(typeText, Math.random() * 50 + 30);
      } else {
        setShowPrompt(true);
      }
    };

    setTimeout(typeText, 1000);
  }, []);

  const handleAccess = () => {
    setIsAccessing(true);
    // Logique de navigation à ajouter
  };

  return (
    <div className="monitor-container">
      <div className="monitor">
        <div className="screen">
          <div className="terminal-container">
            <header className="terminal-header">
              <Terminal size={24} color="#00ff00" />
              <h1 className="terminal-title">Tanguy Software v1.0.0</h1>
            </header>
            
            <div className="terminal-window">
              <pre className="terminal-text">{text}</pre>
              
              {showPrompt && !isAccessing && (
                <div className="terminal-prompt">
                  <button 
                    onClick={handleAccess}
                    className="access-button"
                  >
                    Initier la séquence d'accès
                  </button>
                </div>
              )}
              
              {isAccessing && (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <span>Accès au système principal en cours...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="terminal-status">
        <div>Connection: SECURE</div>
        <div>Protocol: SSH-2.0</div>
        <div>Encryption: AES-256</div>
      </div>
    </div>
  );
};

export default TerminalLanding;