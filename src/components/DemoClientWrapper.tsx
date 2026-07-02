'use client';

import { useState } from 'react';
import { DemoPreset } from '@/lib/demoPresets';
import DemoWelcome from './DemoWelcome';
import DemoChatPage from './DemoChatPage';

interface DemoClientWrapperProps {
  preset: DemoPreset;
}

export default function DemoClientWrapper({ preset }: DemoClientWrapperProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [businessName, setBusinessName] = useState('');

  const handleStart = (name: string) => {
    setBusinessName(name);
    setHasStarted(true);
  };

  const handleBack = () => {
    setHasStarted(false);
  };

  if (!hasStarted) {
    return (
      <DemoWelcome 
        preset={preset} 
        onStart={handleStart} 
      />
    );
  }

  return (
    <DemoChatPage 
      preset={preset} 
      businessName={businessName} 
      onBack={handleBack}
    />
  );
}
