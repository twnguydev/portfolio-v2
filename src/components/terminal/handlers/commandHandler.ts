// src/components/terminal/handlers/commandHandler.ts
import { HandleCommandOptions, Command } from '../types';
import { SECRET_COMMANDS } from '../commands';

export const handleCommand = ({
  command,
  setState,
  onComplete,
  availableCommands
}: HandleCommandOptions): void => {
  const [baseCommand, ...args] = command.toLowerCase().trim().split(' ');
  const cmd = availableCommands[baseCommand];
  
  if (SECRET_COMMANDS.includes(command)) {
    const secretCommand = {
      name: command,
      action: availableCommands[command].action
    };
    secretCommand.action();
  } else if (cmd) {
    cmd.action(args.join(' '));
  } else {
    setState(prev => ({
      ...prev,
      attempts: prev.attempts + 1,
      text: `${prev.text}\n> Commande non reconnue. Tapez 'help' pour voir les commandes disponibles.`
    }));
  }
};