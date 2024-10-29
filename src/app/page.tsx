// src/app/page.tsx
'use client';
import { useState } from 'react';
import MonitorLayout from '@/components/layout/MonitorLayout';
import { InitialScene } from '@/components/terminal/scenes/InitialScene';
import { DevScene } from '@/components/terminal/scenes/DevScene';
import { NormalScene } from '@/components/terminal/scenes/NormalScene';

export default function Home() {
  const [currentScene, setCurrentScene] = useState<'initial' | 'dev' | 'normal'>('initial');
  const [statusItems, setStatusItems] = useState([
    { label: "Status", value: "INITIALIZING" },
    { label: "Mode", value: "DEFAULT" },
    { label: "Security", value: "ENABLED" }
  ]);

  const handleSceneComplete = (path: 'normal' | 'dev') => {
    setCurrentScene(path);
    setStatusItems(path === 'dev' 
      ? [
          { label: "Status", value: "ROOT ACCESS" },
          { label: "Mode", value: "DEVELOPER" },
          { label: "Security", value: "ENHANCED" }
        ]
      : [
          { label: "Status", value: "ACTIVE" },
          { label: "Mode", value: "USER" },
          { label: "Security", value: "STANDARD" }
        ]
    );
  };

  return (
    <MonitorLayout statusItems={statusItems}>
      {currentScene === 'initial' && <InitialScene onComplete={handleSceneComplete} />}
      {currentScene === 'dev' && <DevScene onComplete={handleSceneComplete} />}
      {currentScene === 'normal' && <NormalScene onComplete={handleSceneComplete} />}
    </MonitorLayout>
  );
}