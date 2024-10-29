// src/components/terminal/scenes/InitialScene.tsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { SceneProps, TerminalState } from '../types';
import { createInitialCommands } from '../commands/initialCommands';
import { handleCommand } from '../handlers/commandHandler';
import '../Terminal.css';

const appendText = (
  setState: React.Dispatch<React.SetStateAction<TerminalState>>,
  newText: string
) => {
  setState(prev => ({
    ...prev,
    text: `${prev.text}\n${newText}`
  }));
};

export const InitialScene: React.FC<SceneProps> = ({ onComplete }): JSX.Element => {
  const textRef = useRef<HTMLPreElement>(null);
  const [state, setState] = useState<TerminalState>({
    text: '',
    inputValue: '',
    currentSection: 'initial',
    achievements: [],
    hackerMode: false,
    showPrompt: false,
    attempts: 0,
    showHint: false,
    commandHistory: []
  });

  const scrollToBottom = useCallback((): void => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, []);

  useEffect((): void => {
    scrollToBottom();
  }, [state.text, scrollToBottom]);

  const initialText = useMemo(() => `> Initialisation du système Tanguy_Dev...
> Chargement des compétences et projets...
> Détection des langages maîtrisés : JS, TS, React...
> Scan des projets en cours...
> Analyse du niveau de café dans le sang : Optimal
> Vérification du setup gaming : OK 🎮
> Activation du mode développeur créatif...
> Système prêt ! En attente de commande...

Type 'help' pour voir les commandes disponibles\n`, []);

  const commands = useMemo(
    () => createInitialCommands(setState, initialText, onComplete),
    [initialText, onComplete]
  );

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    let timer: NodeJS.Timeout;

    const typeText = () => {
      if (currentIndex < initialText.length) {
        currentText += initialText[currentIndex];
        setState(prev => ({ ...prev, text: currentText }));
        currentIndex++;
        timer = setTimeout(typeText, Math.random() * 50 + 30);
      } else {
        setState(prev => ({ ...prev, showPrompt: true }));
      }
    };

    const initialTimer = setTimeout(typeText, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(initialTimer);
    };
  }, [initialText]);

  const handleSubmit = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    if (!state.inputValue.trim()) return;

    appendText(setState, `> ${state.inputValue}`);

    handleCommand({
      command: state.inputValue,
      setState,
      onComplete,
      availableCommands: commands
    });

    setState(prev => ({
      ...prev,
      inputValue: '',
      commandHistory: [...prev.commandHistory, prev.inputValue]
    }));
  }, [state.inputValue, commands, onComplete]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setState(prev => ({ ...prev, inputValue: e.target.value }));
    },
    []
  );

  return (
    <>
      <header className="terminal-header">
        <div>
          <Terminal size={24} color="#0cff00" />
        </div>
        <h1 className="terminal-title">Tanguy_Dev OS v1.0.0</h1>
      </header>
      
      <div className="terminal-window">
        <pre ref={textRef} className="terminal-text">{state.text}</pre>
        
        {state.showPrompt && (
          <form onSubmit={handleSubmit} className="terminal-input-container">
            <span className="terminal-prompt-symbol">{'>'}</span>
            <input
              type="text"
              value={state.inputValue}
              onChange={handleInputChange}
              className="terminal-input"
              autoFocus
              spellCheck="false"
              aria-label="Terminal input"
            />
          </form>
        )}
      </div>
    </>
  );
};