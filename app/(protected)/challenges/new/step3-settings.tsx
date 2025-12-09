import React from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, Switch, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { StepHeader } from '@/components/StepHeader';
import { WizardNavigation } from '@/components/WizardNavigation';
import { useChallengeWizard } from '@/hooks/useChallengeWizard';

const StyledView = styled(View);
const StyledText = styled(Text);

const Step3Settings = () => {
  const router = useRouter();
  const { state, setSettings } = useChallengeWizard();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView className="flex-1 bg-gray-50 px-6 py-10">
        <StyledView className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
          <StepHeader currentStep={3} totalSteps={4} title="Settings" subtitle="Configure visibility." />
          <StyledView className="mb-4 flex-row items-center justify-between rounded-2xl border border-gray-200 p-4">
            <StyledView>
              <StyledText className="text-base font-semibold text-gray-900">Leaderboard visibility</StyledText>
              <StyledText className="text-sm text-gray-600">Allow participants to see standings.</StyledText>
            </StyledView>
            <Switch
              value={state.settings.leaderboardVisible}
              onValueChange={(value) => setSettings({ leaderboardVisible: value })}
            />
          </StyledView>
          <WizardNavigation
            onNext={() => router.push('/(protected)/challenges/new/step4-invite')}
            onBack={() => router.back()}
          />
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};

export default Step3Settings;
