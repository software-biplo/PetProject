import React, { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Input } from '@/components/Input';
import { StepHeader } from '@/components/StepHeader';
import { WizardNavigation } from '@/components/WizardNavigation';
import { useChallengeWizard } from '@/hooks/useChallengeWizard';

const StyledView = styled(View);
const StyledText = styled(Text);

const Step1General = () => {
  const router = useRouter();
  const { state, updateGeneral } = useChallengeWizard();
  const [startAtInput, setStartAtInput] = useState(state.general.startAt?.toISOString() ?? '');
  const [endAtInput, setEndAtInput] = useState(state.general.endAt?.toISOString() ?? '');

  const isValid = useMemo(() => {
    return (
      state.general.name.trim().length > 2 &&
      state.general.description.trim().length > 4 &&
      startAtInput &&
      endAtInput &&
      state.general.maxPlayers > 0
    );
  }, [state.general.name, state.general.description, startAtInput, endAtInput, state.general.maxPlayers]);

  const handleNext = () => {
    updateGeneral({
      startAt: startAtInput ? new Date(startAtInput) : null,
      endAt: endAtInput ? new Date(endAtInput) : null,
    });
    router.push('/(protected)/challenges/new/step2-goals-list');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 bg-gray-50 px-6 py-10">
          <StyledView className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
            <StepHeader currentStep={1} totalSteps={4} title="General info" subtitle="Describe your challenge." />
            <Input
              label="Challenge name"
              value={state.general.name}
              onChangeText={(text) => updateGeneral({ name: text })}
              placeholder="e.g. 30-day wellness"
            />
            <Input
              label="Description"
              value={state.general.description}
              onChangeText={(text) => updateGeneral({ description: text })}
              placeholder="What is this challenge about?"
              multiline
              numberOfLines={4}
            />
            <Input
              label="Start date & time (ISO)"
              value={startAtInput}
              onChangeText={setStartAtInput}
              placeholder="2024-06-01T08:00:00Z"
            />
            <Input
              label="End date & time (ISO)"
              value={endAtInput}
              onChangeText={setEndAtInput}
              placeholder="2024-07-01T08:00:00Z"
            />
            <Input
              label="Max players"
              value={String(state.general.maxPlayers)}
              onChangeText={(text) => updateGeneral({ maxPlayers: Number(text) || 0 })}
              keyboardType="numeric"
            />
            <StyledText className="text-sm text-gray-500">
              Dates use ISO format for now. UI pickers can be added later.
            </StyledText>
            <WizardNavigation onNext={handleNext} onBack={() => {}} disableBack disableNext={!isValid} />
          </StyledView>
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Step1General;
