'use client';

import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Mode } from 'context/index';
import { useSetThemeMutation } from 'queries/theme';

export interface ModeProviderProps {
  children?: ReactNode;
  defaultMode: Mode;
}

type ModeContextValue = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export const newModeContextValue = (): ModeContextValue => {
  return {
    mode: '',
    setMode: () => null,
  };
};

const ModeContext = createContext<ModeContextValue | null>(null);

const ModeProvider = ({ children, defaultMode }: ModeProviderProps) => {
  const [mode, setMode] = useState(defaultMode);
  const setTheme = useSetThemeMutation();

  const toggleTheme = (newMode: Mode): void => {
    const body = document.body;
    if (newMode === 'light') {
      body.classList.remove('dark');
      body.classList.add('light');
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
    }
    setMode(newMode);
    setTheme.mutate(newMode, {
      onSuccess: data => {
        console.log(data);
      },
      onError: () => {},
    });
  };

  const modeContextValue: ModeContextValue = {
    mode: mode,
    setMode: toggleTheme,
  };

  return <ModeContext.Provider value={modeContextValue}>{children}</ModeContext.Provider>;
};

export default ModeProvider;

export const useMode = (): ModeContextValue => {
  const context = useContext(ModeContext);
  if (context) return context;
  return newModeContextValue();
};