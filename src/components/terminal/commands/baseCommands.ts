// src/components/terminal/commands/baseCommands.ts
import { Command } from '../types';
import { updateText } from '../handlers/textHandler';

export const createBaseCommands = (
  setText: (value: string | ((prev: string) => string)) => void,
  initialText: string
): Record<string, Command> => ({
  'clear': {
    name: 'clear',
    description: 'Nettoie le terminal',
    action: () => {
      setText(initialText);
    }
  },
  'help': {
    name: 'help',
    description: 'Affiche l\'aide',
    action: () => {
      updateText(setText, `
=== Commandes Disponibles ===
clear     - Nettoie le terminal
help      - Affiche cette aide
about     - À propos de moi
menu      - Menu principal
`);
    }
  }
});