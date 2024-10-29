// src/components/terminal/handlers/achievementHandler.ts
import { TerminalState } from '../types';

export const addAchievement = (
  achievement: string,
  setState: React.Dispatch<React.SetStateAction<TerminalState>>
) => {
  setState(prev => {
    if (!prev.achievements.includes(achievement)) {
      return {
        ...prev,
        achievements: [...prev.achievements, achievement],
        text: `${prev.text}\n🏆 Achievement débloqué: ${achievement}`
      };
    }
    return prev;
  });
};