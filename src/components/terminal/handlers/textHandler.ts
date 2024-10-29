// src/components/terminal/handlers/textHandler.ts
export const updateText = (
  setText: (value: string | ((prev: string) => string)) => void,
  newText: string
) => {
  setText(prev => `${prev}\n${newText}`);
};