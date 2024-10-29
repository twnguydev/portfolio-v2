// src/components/terminal/commands/initialCommands.ts
import { Command, TerminalState } from '../types';
import { createBaseCommands } from './baseCommands';
import { SECRET_COMMANDS } from './index';

const appendText = (setState: React.Dispatch<React.SetStateAction<TerminalState>>, newText: string) => {
  setState((prev: TerminalState) => ({
    ...prev,
    text: `${prev.text}\n${newText}`
  }));
};

export const createInitialCommands = (
  setState: React.Dispatch<React.SetStateAction<TerminalState>>,
  initialText: string,
  onComplete?: (path: 'normal' | 'dev') => void
): Record<string, Command> => {
  const baseCommands: Record<string, Command> = createBaseCommands(
    (text) => {
      if (typeof text === 'string') {
        setState(prev => ({ ...prev, text }));
      } else {
        setState(prev => ({ ...prev, text: text(prev.text) }));
      }
    },
    initialText
  );

  return {
    ...baseCommands,
    'about': {
      name: 'about',
      description: 'À propos de moi',
      action: () => {
        appendText(setState, `
> Tanguy - Développeur Web Passionné
> Spécialisé en React/Next.js
> Amateur de café et de jeux vidéo
> Toujours en quête de nouveaux défis`);
      }
    },
    'start': {
      name: 'start',
      description: 'Démarre en mode normal',
      action: () => {
        appendText(setState, '> Démarrage en mode normal...');
        setTimeout(() => onComplete?.('normal'), 1500);
      }
    },
    'coffee': {
      name: 'coffee',
      description: 'Secret',
      isSecret: true,
      action: () => {
        appendText(setState, '☕ Niveau de café critique ! Recharge nécessaire...');
      }
    },
    '42': {
      name: '42',
      description: 'Secret',
      isSecret: true,
      action: () => {
        appendText(setState, '> La réponse à la grande question sur la vie, l\'univers et le reste...');
      }
    },
    'help': {
      name: 'help',
      description: 'Affiche l\'aide',
      action: () => {
        setState(prev => ({
          ...prev,
          text: `${prev.text}\n
Commandes disponibles:
  help     - Affiche cette aide
  start    - Démarre en mode normal
  about    - À propos de moi
  clear    - Nettoie le terminal
${prev.showHint ? '\nPssst... Il existe peut-être des commandes cachées 😉' : ''}`
        }));
      }
    },
    'clear': {
      name: 'clear',
      description: 'Nettoie le terminal',
      action: () => {
        setState(prev => ({
          ...prev,
          text: initialText
        }));
      }
    },
    ...Object.fromEntries(
      SECRET_COMMANDS.map(cmd => [
        cmd,
        {
          name: cmd,
          description: 'Secret dev command',
          isSecret: true,
          action: () => {
            appendText(setState, '> Mode développeur activé... Bienvenue !');
            setTimeout(() => onComplete?.('dev'), 1500);
          }
        }
      ])
    )
  };
};