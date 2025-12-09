import React from 'react';
import { Stack } from 'expo-router';
import { ChallengeWizardProvider } from '@/hooks/useChallengeWizard';

const NewChallengeLayout = () => {
  return (
    <ChallengeWizardProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ChallengeWizardProvider>
  );
};

export default NewChallengeLayout;
