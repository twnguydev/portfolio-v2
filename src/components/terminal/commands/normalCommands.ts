// src/components/terminal/commands/normalCommands.ts
import { Command, TerminalState } from '../types';
import { createBaseCommands } from './baseCommands';
import { SECRET_COMMANDS } from './index';

const appendText = (setState: React.Dispatch<React.SetStateAction<TerminalState>>, newText: string) => {
  setState((prev: TerminalState) => ({
    ...prev,
    text: `${prev.text}\n${newText}`
  }));
};

export const createNormalCommands = (
  setState: React.Dispatch<React.SetStateAction<TerminalState>>,
  onComplete?: (path: 'normal' | 'dev') => void
): Record<string, Command> => {
  const showMainMenu = () => {
    appendText(setState, `
=== Menu Principal ===
Bienvenue sur mon portfolio ! 👋  

Utilisez ces commandes pour naviguer :
  
about    - En savoir plus sur moi
projects - Découvrir mes projets
skills   - Explorer mes compétences
contact  - Me contacter
help     - Voir toutes les commandes

Que souhaitez-vous découvrir ?`);
  };

  const baseCommands = createBaseCommands(
    (value: string | ((prev: string) => string)) => {
      setState(prev => ({
        ...prev,
        text: typeof value === 'string' ? value : value(prev.text)
      }));
    },
    ''
  );

  return {
    ...baseCommands,
    'about': {
      name: 'about',
      description: 'En savoir plus sur moi',
      action: () => {
        setState(prev => ({
          ...prev,
          currentSection: 'about',
          text: `${prev.text}\n
=== À Propos de Moi ===
Hey ! Je suis Tanguy, développeur web passionné 👋

🎓 Formation
- Étudiant en développement web
- Spécialisé en React/Next.js

💡 Ce qui me motive
- Créer des expériences web uniques
- Résoudre des problèmes complexes
- Apprendre constamment
- Partager mes connaissances

🎮 Quand je ne code pas
- Je joue aux jeux vidéo
- Je bois (beaucoup) de café
- J'explore de nouvelles technologies

Tapez 'menu' pour revenir au menu principal`
        }));
      }
    },
    'projects': {
      name: 'projects',
      description: 'Voir mes projets',
      action: () => {
        setState(prev => ({
          ...prev,
          currentSection: 'projects',
          text: `${prev.text}\n
=== Mes Projets ===
        
🚀 Portfolio Interactif
- Interface terminal avec easter eggs
- React, Next.js, Animations CSS
- Mode développeur caché
        
🎮 [Projet 2]
- Description du projet 2...
- Technologies utilisées
- Lien vers démo
        
📱 [Projet 3]
- Description du projet 3...
- Technologies utilisées
- Lien vers démo

Tapez 'menu' pour revenir au menu principal`
        }));
      }
    },
    'skills': {
      name: 'skills',
      description: 'Voir mes compétences',
      action: () => {
        setState(prev => ({
          ...prev,
          currentSection: 'skills',
          text: `${prev.text}\n
=== Compétences ===

Frontend 🎨
- React / Next.js
- TypeScript
- CSS / SASS

Backend 🔧
- Node.js
- API REST
- Bases de données

Outils 🛠
- Git
- VS Code
- Docker

Soft Skills 🤝
- Travail d'équipe
- Communication
- Autonomie

Tapez 'menu' pour revenir au menu principal`
        }));
      }
    },
    'contact': {
      name: 'contact',
      description: 'Me contacter',
      action: () => {
        setState(prev => ({
          ...prev,
          currentSection: 'contact',
          text: `${prev.text}\n
=== Contact ===

📧 Email: [Votre email]
💼 LinkedIn: [Votre profil LinkedIn]
🐱 GitHub: [Votre profil GitHub]

N'hésitez pas à me contacter !

Tapez 'menu' pour revenir au menu principal`
        }));
      }
    },
    'menu': {
      name: 'menu',
      description: 'Menu principal',
      action: () => {
        setState(prev => ({
          ...prev,
          currentSection: 'main'
        }));
        showMainMenu();
      }
    },
    'help': {
      name: 'help',
      description: 'Voir les commandes',
      action: () => {
        setState(prev => ({
          ...prev,
          text: `${prev.text}\n
=== Commandes Disponibles ===

about    - En savoir plus sur moi
projects - Voir mes projets
skills   - Voir mes compétences
contact  - Me contacter
menu     - Menu principal
clear    - Effacer l'écran
help     - Voir cette aide

${prev.achievements.length > 0 ? `Fonctionnalités découvertes: ${prev.achievements.length}/8` : ''}
${prev.attempts >= 3 ? "\nPssst... Essayez des commandes comme 'sudo' ou 'npm'... 👨‍💻" : ''}
Il y a peut-être d'autres commandes cachées... 👀`
        }));
      }
    },
    'coffee': {
      name: 'coffee',
      description: 'Secret',
      isSecret: true,
      action: () => {
        setState(prev => ({
          ...prev,
          achievements: [...prev.achievements, 'coffee'],
          text: `${prev.text}\n
☕☕☕ MODE CAFÉ ACTIVÉ ☕☕☕
Niveau de caféine augmenté !
Productivité +100%
Bugs -50%
Créativité +75%`
        }));
      }
    },
    'game': {
      name: 'game',
      description: 'Secret',
      isSecret: true,
      action: () => {
        setState(prev => ({
          ...prev,
          achievements: [...prev.achievements, 'game'],
          text: `${prev.text}\n
🎮 MODE GAMING ACTIVÉ 🎮
Loading game settings...
Resolution: 4K
FPS: 144
RGB: Enabled
Game Mode: ON`
        }));
      }
    },
    '42': {
      name: '42',
      description: 'Secret',
      isSecret: true,
      action: () => {
        setState(prev => ({
          ...prev,
          achievements: [...prev.achievements, '42'],
          text: `${prev.text}\n> La réponse à la grande question sur la vie, l'univers et le reste...`
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