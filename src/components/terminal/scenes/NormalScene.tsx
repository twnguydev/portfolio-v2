// src/components/terminal/scenes/NormalScene.tsx
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { SceneProps, TerminalState } from '../types';
import { handleCommand } from '../handlers/commandHandler';
import { createNormalCommands } from '../commands';
import { Command } from '../types';
import { Terminal, Mail, Github, Linkedin } from 'lucide-react';
import '../Terminal.css';

export const NormalScene: React.FC<SceneProps> = ({ onComplete }) => {
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

  const textRef = useRef<HTMLPreElement>(null);

  const scrollToBottom = useCallback(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [state.text, scrollToBottom]);

  const commands = useMemo((): Record<string, Command> => createNormalCommands(
    (newState: React.SetStateAction<TerminalState>): void => {
      setState(prev => {
        const nextState = typeof newState === 'function' 
          ? newState(prev)
          : newState;
        return { ...prev, ...nextState };
      });
    },
    onComplete
  ), [onComplete]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!state.inputValue.trim()) return;

    setState(prev => ({
      ...prev,
      text: `${prev.text}\n> ${prev.inputValue}`
    }));

    console.log('Command:', state.inputValue);

    handleCommand({
      command: state.inputValue,
      setState: (newState: React.SetStateAction<TerminalState>) => {
        setState(prev => {
          const nextState = typeof newState === 'function'
            ? newState(prev)
            : newState;
          return { ...prev, ...nextState };
        });
      },
      onComplete,
      availableCommands: commands
    });

    setState(prev => ({ ...prev, inputValue: '' }));
  }, [state.inputValue, commands, onComplete]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, inputValue: e.target.value }));
  }, []);

  useEffect(() => {
    commands.menu.action();
  }, [commands]);

  return (
    <div className="normal-mode">
      <header className="terminal-header">
        <div>
          <Terminal size={24} color="#0cff00" />
        </div>
        <h1 className="terminal-title">Portfolio interactif</h1>
      </header>

      <div className="terminal-window">
        <pre ref={textRef} className="terminal-text">{state.text}</pre>
        
        <form onSubmit={handleSubmit} className="terminal-input-container">
          <span className="terminal-prompt-symbol">guest@portfolio:~$</span>
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

      {state.currentSection === 'contact' && (
        <div className="social-links">
          <a 
            href="#" 
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <Github size={20} />
          </a>
          <a 
            href="#" 
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="#" 
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      )}
    </div>
  );
};