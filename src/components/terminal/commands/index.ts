// src/components/terminal/commands/index.ts
export const SECRET_COMMANDS: string[] = [
  'sudo su',
  'npm start',
  'yarn dev',
  'vim',
  'ls -la',
  'git status'
];

export const EASTER_EGG_COMMANDS: string[] = [
  'coffee',
  'game',
  '42',
  'matrix',
  'hack'
];

export * from './baseCommands';
export * from './normalCommands';
export * from './initialCommands';
export * from './devCommands';