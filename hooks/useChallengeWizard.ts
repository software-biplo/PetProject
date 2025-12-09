import { createContext, useContext, useMemo, useState } from 'react';
import { nanoid } from 'nanoid/non-secure';

export type Goal = {
  id: string;
  title: string;
  iconKey: string;
  description: string;
  points: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'once';
  maxCompletionsPerPeriod: number | null;
  unlimitedCompletions: boolean;
};

export type ChallengeWizardState = {
  general: {
    name: string;
    description: string;
    startAt: Date | null;
    endAt: Date | null;
    maxPlayers: number;
  };
  goals: Goal[];
  settings: {
    leaderboardVisible: boolean;
  };
  invite: {
    emails: string[];
  };
};

const initialState: ChallengeWizardState = {
  general: {
    name: '',
    description: '',
    startAt: null,
    endAt: null,
    maxPlayers: 64,
  },
  goals: [],
  settings: {
    leaderboardVisible: true,
  },
  invite: {
    emails: [],
  },
};

type ChallengeWizardContextValue = {
  state: ChallengeWizardState;
  updateGeneral: (payload: Partial<ChallengeWizardState['general']>) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  removeGoal: (goalId: string) => void;
  setSettings: (payload: Partial<ChallengeWizardState['settings']>) => void;
  setInvite: (emails: string[]) => void;
  reset: () => void;
};

const ChallengeWizardContext = createContext<ChallengeWizardContextValue | undefined>(undefined);

export const ChallengeWizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ChallengeWizardState>(initialState);

  const updateGeneral = (payload: Partial<ChallengeWizardState['general']>) => {
    setState((prev) => ({ ...prev, general: { ...prev.general, ...payload } }));
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const goalWithId: Goal = { ...goal, id: nanoid() };
    setState((prev) => ({ ...prev, goals: [...prev.goals, goalWithId] }));
  };

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    setState((prev) => ({
      ...prev,
      goals: prev.goals.map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal)),
    }));
  };

  const removeGoal = (goalId: string) => {
    setState((prev) => ({ ...prev, goals: prev.goals.filter((goal) => goal.id !== goalId) }));
  };

  const setSettings = (payload: Partial<ChallengeWizardState['settings']>) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...payload } }));
  };

  const setInvite = (emails: string[]) => {
    setState((prev) => ({ ...prev, invite: { emails } }));
  };

  const reset = () => setState(initialState);

  const value = useMemo(
    () => ({ state, updateGeneral, addGoal, updateGoal, removeGoal, setSettings, setInvite, reset }),
    [state],
  );

  return <ChallengeWizardContext.Provider value={value}>{children}</ChallengeWizardContext.Provider>;
};

export const useChallengeWizard = () => {
  const ctx = useContext(ChallengeWizardContext);
  if (!ctx) {
    throw new Error('useChallengeWizard must be used within a ChallengeWizardProvider');
  }
  return ctx;
};
