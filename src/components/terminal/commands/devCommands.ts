// src/components/terminal/commands/devCommands.ts
import { Command, TerminalState } from '../types';
import { createBaseCommands } from './baseCommands';
import { createInitialCommands } from './initialCommands';

const appendText = (
  setState: React.Dispatch<React.SetStateAction<TerminalState>>, 
  newText: string
) => {
  setState(prev => ({
    ...prev,
    text: `${prev.text}\n${newText}`
  }));
};

export const createDevCommands = (
  setState: React.Dispatch<React.SetStateAction<TerminalState>>
): Record<string, Command> => {
  const addAchievement = (achievement: string) => {
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

  const baseCommands = createBaseCommands(
    (value: string | ((prev: string) => string)) => {
      setState(prev => ({
        ...prev,
        text: typeof value === 'string' ? value : value(prev.text)
      }));
    },
    ''
  );

  const initialCommands = createInitialCommands(setState, '', () => {});

  return {
    ...baseCommands,
    ...initialCommands,
    'skills': {
      name: 'skills',
      description: 'Affiche les compétences détaillées',
      action: () => {
        appendText(setState, `
=== Compétences Techniques ===
Frontend:
  ▓▓▓▓▓▓▓▓▓▓ React/Next.js
  ▓▓▓▓▓▓▓▓░░ TypeScript
  ▓▓▓▓▓▓▓░░░ Three.js

Backend:
  ▓▓▓▓▓▓▓▓░░ Node.js
  ▓▓▓▓▓▓░░░░ API REST
  ▓▓▓▓▓░░░░░ GraphQL

DevOps:
  ▓▓▓▓▓▓░░░░ Git
  ▓▓▓▓░░░░░░ Docker
  ▓▓▓░░░░░░░ CI/CD`);
      }
    },

    'inspect': {
      name: 'inspect',
      description: 'Inspecte le code source',
      action: (args?: string) => {
        setState(prev => {
          const normalizedArgs = args?.toLowerCase().trim();
          let nextState = { ...prev };

          switch (normalizedArgs) {
            case 'docker':
              return {
                ...nextState,
                text: `${nextState.text}\n
    === Analyse du système Docker ===
    Détection de vulnérabilités...
    > Configuration non sécurisée détectée dans le conteneur "secret-project"
    > Variables d'environnement exposées
    > Port suspect : 1337
    > Tokens trouvés dans les logs

    Conseil: Utilisez 'docker inspect secret-project' pour plus de détails.`
              };

            case 'logs':
              return {
                ...nextState,
                text: `${nextState.text}\n
    === Analyse des logs système ===
    Scan des fichiers de log...
    > /var/log/coffee-machine.log : Activité suspecte détectée
    > /var/log/docker/secret-project/runtime.log : Accès restreint
    > /var/log/nginx/access.log : Tentatives d'accès au port 1337

    🔍 Indice: Le conteneur coffee-machine semble cacher quelque chose...`
              };

            case 'network':
              if (nextState.hackerMode) {
                return {
                  ...nextState,
                  text: `${nextState.text}\n
    === Analyse réseau ===
    Scan des connexions actives...
    > 127.0.0.1:1337 -> secret-project (ENCRYPTED)
    > 127.0.0.1:8080 -> coffee-machine (SUSPICIOUS)
    > 127.0.0.1:3000 -> portfolio (OK)

    🔐 Clé de chiffrement trouvée: CR4CK_TH3_C0FF33
    Note: Cette clé pourrait être utile pour d'autres commandes...`,
                  achievements: nextState.achievements.includes('network_explorer')
                    ? nextState.achievements
                    : [...nextState.achievements, 'network_explorer']
                };
              }
              return {
                ...nextState,
                text: `${nextState.text}\n> Accès refusé. Mode hacker requis.`
              };

            default:
              return {
                ...nextState,
                text: `${nextState.text}\n
    === Analyse du code source ===
    Détection de patterns intéressants...
    > Utilisation de hooks personnalisés
    > Architecture propre
    > Tests unitaires
    > Commentaires détaillés
    > Easter eggs détectés: 7

    Arguments disponibles:
      inspect docker    - Analyse la configuration Docker
      inspect logs     - Examine les logs système
      inspect network  - Scan réseau (nécessite le mode hacker)`
              };
          }
        });
      }
    },

    'curl': {
      name: 'curl',
      description: 'Simule une requête HTTP',
      action: (args?: string) => {
        if (!args) {
          appendText(setState, '> Utilisation: curl -X GET /');
          return;
        }

        const normalizedArgs = args.toLowerCase().trim();

        if (normalizedArgs === '-x get /' || 
            normalizedArgs === '-x get/' ||
            normalizedArgs === '--request get /' ||
            normalizedArgs === '--request get/') {
          appendText(setState, `
    HTTP/1.1 200 OK
    Server: TanguySoft/1.0
    X-Easter-Egg: You found me! 🎉
    X-Powered-By: Coffee & Dreams

    {
      "message": "Bien joué ! Tu as trouvé un header secret !",
      "achievement": "curl_master"
    }`);
          addAchievement('curl_master');
        } else {
          appendText(setState, '> Utilisation: curl -X GET /');
        }
      }
    },
    'cookies': {
      name: 'cookies',
      description: 'Inspecte les cookies',
      action: () => {
        appendText(setState, `
🍪 Cookies trouvés:
session=dev_mode_activated
user_type=developer
coffee_level=high
secret_token=y0u_f0und_m3

Easter egg trouvé dans les cookies ! 🎉`);
        addAchievement('cookie_monster');
      }
    },
    'nmap': {
      name: 'nmap',
      description: 'Scan des ports',
      action: () => {
        setState(prev => ({
          ...prev,
          hackerMode: true,
          text: `${prev.text}\n
Scanning ports...
PORT     STATE    SERVICE
80/tcp   open     http
443/tcp  open     https
3000/tcp open     development
1337/tcp open     h4ck3r
8080/tcp filtered unknown

Port secret 1337 trouvé ! Mode hacker activé !`
        }));
        addAchievement('port_scanner');
      }
    },
    'git': {
      name: 'git',
      description: 'Commandes git',
      action: (args?: string) => {
        if (args === 'log --secret') {
          appendText(setState, `
commit 133713371337
Author: Tanguy <dev@tanguy.dev>
Date: Thu Oct 31 2024 00:00:00

    🔒 [SECRET] Added hidden features

    - Easter eggs implemented
    - Secret mode unlocked
    - Hidden achievements added`);
          addAchievement('git_detective');
        } else {
          appendText(setState, '> Essayez \'git log --secret\'...');
        }
      }
    },
    'hack': {
      name: 'hack',
      description: 'Mode hacker',
      isSecret: true,
      action: () => {
        setState(prev => {
          if (prev.hackerMode) {
            addAchievement('master_hacker');
            return {
              ...prev,
              text: `${prev.text}\n
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█░░░░░░░░▀█▄▀▄▀██████░▀█▄▀▄▀██████░▀█▄▀▄▀██████ 
░░░░░░░░░░░▀█▄█▄███▀░░░░░▀█▄█▄███▀░░░░░▀█▄█▄███
[ACCESS GRANTED] Mode Super Hacker activé !
Nouveaux pouvoirs débloqués...`
            };
          }
          return {
            ...prev,
            text: `${prev.text}\n> Accès refusé. Scannez d'abord les ports...`
          };
        });
      }
    },
    'config': {
      name: 'config',
      description: 'Configuration système',
      action: () => {
        appendText(setState, `
=== Configuration Système ===
OS: TanguySoft v1.0.0
Node: v20.0.0
NPM: v10.0.0
Coffee Machine: Connected
Gaming Setup: Optimal
Easter Egg: Found!`);
        addAchievement('system_explorer');
      }
    },
    'headers': {
      name: 'headers',
      description: 'Analyse les headers HTTP',
      action: () => {
        appendText(setState, `
    === Analyse des Headers HTTP ===
    🔍 Headers trouvés dans la requête:

    User-Agent: TanguySoft/1.0 (Terminal; Dev Mode)
    Accept: application/json
    Authorization: Bearer *********************
    X-Dev-Mode: enabled
    X-Secret-Header: <hidden>
    X-Coffee-Level: High
    X-Gaming-Mode: Active

    Astuce: Certains de ces headers pourraient cacher des secrets...
    Essayez peut-être de les examiner avec curl ? 🤔`);

        setState(prev => {
          if (!prev.achievements.includes('header_hunter')) {
            return {
              ...prev,
              achievements: [...prev.achievements, 'header_hunter']
            };
          }
          return prev;
        });
      }
    },
    'docker': {
      name: 'docker',
      description: 'Commandes docker',
      action: (args?: string) => {
        setState(prev => {
          const normalizedArgs = args?.toLowerCase().trim();
          let nextState = { ...prev };
          console.log(normalizedArgs);

          switch (normalizedArgs) {
            case 'ps':
              return {
                ...nextState,
                text: `${nextState.text}\n
    CONTAINER ID   IMAGE                COMMAND      STATUS          PORTS                    NAMES
    abc123def4     portfolio-app       "npm start"  Up 2 days       0.0.0.0:3000->3000/tcp  portfolio
    ef5678gh9i     secret-project      "/bin.sh"    Up 7 days       0.0.0.0:1337->1337/tcp  classified
    jk0123lm4n     coffee-machine      "./brew"     Up 24 hours     0.0.0.0:8080->8080/tcp  coffee-service
    op5678qr9s     game-server         "./play"     Up 3 days       0.0.0.0:7000->7000/tcp  gaming-box`
              };

            case 'inspect secret-project':
              return {
                ...nextState,
                text: `${nextState.text}\n
    [
      {
        "Id": "ef5678gh9i",
        "Created": "2024-02-14T12:00:00.000Z",
        "Path": "/bin/sh",
        "Args": [],
        "State": {
          "Status": "running",
          "Running": true,
          "Paused": false
        },
        "Image": "secret-project:latest",
        "ResolvConfPath": "/var/lib/docker/containers/ef5678gh9i/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/ef5678gh9i/hostname",
        "HostsPath": "/var/lib/docker/containers/ef5678gh9i/hosts",
        "LogPath": "/var/lib/docker/containers/ef5678gh9i/ef5678gh9i-json.log",
        "Name": "/classified",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "Config": {
          "Env": [
            "SECRET_TOKEN=y0u_f0und_4n0th3r_s3cr3t",
            "ENCRYPTION_KEY=CR4CK_TH3_C0FF33"
          ]
        }
      }
    ]

    🔍 Un token secret a été trouvé dans les variables d'environnement !
    ℹ️ La clé de chiffrement correspond à celle du scan réseau...`,
                achievements: nextState.achievements.includes('docker_detective')
                  ? nextState.achievements
                  : [...nextState.achievements, 'docker_detective']
              };

            case 'logs coffee-machine':
              return {
                ...nextState,
                text: `${nextState.text}\n
    [INFO] Initializing coffee service...
    [INFO] Coffee maker connected
    [INFO] Checking coffee beans level... OK
    [INFO] Water temperature: 94°C
    [WARN] Coffee consumption reaching critical levels
    [INFO] Brewing new batch...
    [ERROR] Need more coffee beans!
    [DEBUG] Easter egg activated: coffee_overflow
    [SECRET] Hidden endpoint found: /coffee-machine/brew?secret=CR4CK_TH3_C0FF33
    [INFO] System stable, ready for more coffee...`,
                achievements: nextState.achievements.includes('coffee_master')
                  ? nextState.achievements
                  : [...nextState.achievements, 'coffee_master']
              };

            case 'exec coffee-machine brew':
              if (nextState.achievements.includes('network_explorer')) {
                return {
                  ...nextState,
                  text: `${nextState.text}\n
    [ACCESS GRANTED] - Commande spéciale activée !
    ☕ Super Coffee Maker v1.0 ☕

    Préparation d'un café spécial développeur...
    > Grains sélectionnés : JavaBeans™
    > Température : 127.0.0.1°C
    > Pression : 3000 bars
    > Format : overflow_cup

    SUCCÈS : Café développeur préparé avec succès !
    🎉 Achievement secret débloqué !`,
                  achievements: nextState.achievements.includes('coffee_overload')
                    ? nextState.achievements
                    : [...nextState.achievements, 'coffee_overload']
                };
              }
              return {
                ...nextState,
                text: `${nextState.text}\n> Erreur : Clé de chiffrement requise. Indice : Inspectez le réseau...`
              };

            case '--help':
            case 'help':
            default:
              return {
                ...nextState,
                text: `${nextState.text}\n
    Usage: docker <command>

    Commandes disponibles:
      ps                    Liste les conteneurs en cours d'exécution
      inspect <container>   Inspecte un conteneur
      logs <container>      Affiche les logs d'un conteneur
      exec <container> <cmd> Exécute une commande dans un conteneur

    Conteneurs connus:
    - portfolio-app
    - secret-project    [NIVEAU D'ACCÈS REQUIS]
    - coffee-machine    [CONFIGURATION SPÉCIALE]
    - game-server      [EN DÉVELOPPEMENT]

    Astuce: Certains conteneurs peuvent cacher des fonctionnalités secrètes...`
              };
          }
        });
      }
    },
    'help': {
      name: 'help',
      description: 'Affiche l\'aide',
      action: () => {
        setState(prev => ({
          ...prev,
          text: `${prev.text}\n
=== Commandes Disponibles ===
Standards:
  clear     - Nettoie le terminal
  help      - Affiche cette aide
  about     - À propos de moi
  menu      - Menu principal

Dev Tools:
  skills    - Affiche les compétences détaillées
  projects  - Liste les projets secrets
  inspect   - Analyse le code source
  curl      - Simule une requête HTTP
  nmap      - Scan des ports
  cookies   - Inspecte les cookies
  headers   - Analyse les headers HTTP
  git       - Commandes git
  docker    - Commandes docker
  config    - Configuration système
  hack      - ???

${prev.achievements.length > 0 ? `\nAchievements débloqués: ${prev.achievements.length}/10` : ''}
${prev.achievements.length >= 2 ? '\nIndice: Essayez de combiner des commandes avec des flags...' : ''}
${prev.hackerMode ? '\n[HACKER MODE ACTIVÉ] Nouvelles commandes débloquées...' : ''}`
        }));
      }
    }
  };
};