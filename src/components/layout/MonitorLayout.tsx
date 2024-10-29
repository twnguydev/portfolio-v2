// src/components/layout/MonitorLayout.tsx
import React, { ReactNode } from 'react';
import './MonitorLayout.css';

interface MonitorLayoutProps {
  children: ReactNode;
  statusItems?: Array<{ label: string; value: string }>;
}

const MonitorLayout: React.FC<MonitorLayoutProps> = ({ 
  children,
  statusItems = [
    { label: "Connection", value: "SECURE" },
    { label: "Protocol", value: "SSH-2.0" },
    { label: "Encryption", value: "AES-256" }
  ]
}) => {
  return (
    <div className="monitor-container">
      <div className="monitor">
        <div className="screen">
          <div className="terminal-container">
            {children}
          </div>
        </div>
      </div>
      <div className="terminal-status">
        {statusItems.map((item, index) => (
          <div key={index}>{item.label}: {item.value}</div>
        ))}
      </div>
    </div>
  );
};

export default MonitorLayout;