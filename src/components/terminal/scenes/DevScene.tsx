// src/components/terminal/scenes/DevScene.tsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { SceneProps, TerminalState } from '../types';
import { createDevCommands } from '../commands/devCommands';
import { handleCommand } from '../handlers/commandHandler';
import '../Terminal.css';

export const DevScene: React.FC<SceneProps> = (): JSX.Element => {
  const textRef = useRef<HTMLPreElement>(null);
  const [state, setState] = useState<TerminalState>({
    text: '',
    inputValue: '',
    currentSection: 'dev',
    achievements: [],
    hackerMode: false,
    showPrompt: true,
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

  const initialText = useMemo(() => `
=== MODE DÉVELOPPEUR ACTIVÉ ===
Accès root accordé.
Niveau d'autorisation : Maximum

Commandes avancées déverrouillées:
- skills    : Affiche les compétences détaillées
- projects  : Liste les projets secrets
- inspect   : Analyse le code source

D'autres commandes secrètes existent...
`, []);

  const commands = useMemo(() => createDevCommands(setState), []);

  useEffect(() => {
    setState(prev => ({ ...prev, text: initialText }));
  }, [initialText]);

  const handleSubmit = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    if (!state.inputValue.trim()) return;
  
    setState(prev => ({
      ...prev,
      text: `${prev.text}\n\n> ${prev.inputValue}`,
      commandHistory: [...prev.commandHistory, prev.inputValue]
    }));
  
    handleCommand({
      command: state.inputValue,
      setState,
      availableCommands: commands
    });
  
    setState(prev => ({ ...prev, inputValue: '' }));
  }, [state.inputValue, commands]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setState(prev => ({ ...prev, inputValue: e.target.value }));
  }, []);

  return (
    <div className="dev-mode">
      <div className="dev-mode-header">
        <span className="dev-badge">ROOT ACCESS</span>
        <span className="dev-badge">DEVELOPER MODE</span>
        {state.achievements.length > 0 && (
          <span className="dev-badge">🏆 {state.achievements.length}</span>
        )}
      </div>

      <div className="terminal-window">
        <pre ref={textRef} className="terminal-text">{state.text}</pre>
        
        <form onSubmit={handleSubmit} className="terminal-input-container">
          <span className="terminal-prompt-symbol">root@tanguy:~$</span>
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
      </div>
    </div>
  );
};