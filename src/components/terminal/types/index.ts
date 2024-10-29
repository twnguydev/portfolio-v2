// src/components/terminal/types/index.ts
export type CommandAction = (args?: string) => void;

export type Command = {
  name: string;
  description: string;
  isSecret?: boolean;
  action: CommandAction;
};

export interface TerminalState {
  text: string;
  inputValue: string;
  currentSection: string;
  achievements: string[];
  hackerMode: boolean;
  showPrompt: boolean;
  attempts: number;
  showHint: boolean;
  commandHistory: string[];
}

export type SceneProps = {
  onComplete?: (path: 'normal' | 'dev') => void;
};

export type SetText = (text: string) => void;

export type HandleCommandOptions = {
  command: string;
  setState: React.Dispatch<React.SetStateAction<TerminalState>>;
  onComplete?: (path: 'normal' | 'dev') => void;
  availableCommands: Record<string, Command>;
};