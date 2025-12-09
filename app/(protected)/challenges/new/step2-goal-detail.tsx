import React, { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { StepHeader } from '@/components/StepHeader';
import { useChallengeWizard } from '@/hooks/useChallengeWizard';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const iconChoices = ['🏃', '📚', '🥗', '🧘', '💧', '🧹'];

const Step2GoalDetail = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ goalId?: string }>();
  const { state, addGoal, updateGoal } = useChallengeWizard();

  const existingGoal = useMemo(
    () => state.goals.find((goal) => goal.id === params.goalId),
    [params.goalId, state.goals],
  );

  const [title, setTitle] = useState(existingGoal?.title ?? '');
  const [iconKey, setIconKey] = useState(existingGoal?.iconKey ?? iconChoices[0]);
  const [description, setDescription] = useState(existingGoal?.description ?? '');
  const [points, setPoints] = useState(String(existingGoal?.points ?? 10));
  const [frequency, setFrequency] = useState(existingGoal?.frequency ?? 'daily');
  const [maxCompletionsPerPeriod, setMaxCompletionsPerPeriod] = useState(
    existingGoal?.maxCompletionsPerPeriod ? String(existingGoal.maxCompletionsPerPeriod) : '',
  );
  const [unlimitedCompletions, setUnlimitedCompletions] = useState(
    existingGoal?.unlimitedCompletions ?? false,
  );

  useEffect(() => {
    if (existingGoal) {
      setTitle(existingGoal.title);
      setIconKey(existingGoal.iconKey);
      setDescription(existingGoal.description);
      setPoints(String(existingGoal.points));
      setFrequency(existingGoal.frequency);
      setMaxCompletionsPerPeriod(existingGoal.maxCompletionsPerPeriod ? String(existingGoal.maxCompletionsPerPeriod) : '');
      setUnlimitedCompletions(existingGoal.unlimitedCompletions);
    }
  }, [existingGoal]);

  const isValid = useMemo(() => title.trim() && description.trim() && Number(points) > 0, [title, description, points]);

  const handleSave = () => {
    const payload = {
      title: title.trim(),
      iconKey,
      description: description.trim(),
      points: Number(points),
      frequency: frequency as any,
      maxCompletionsPerPeriod: unlimitedCompletions ? null : Number(maxCompletionsPerPeriod) || null,
      unlimitedCompletions,
    };

    if (existingGoal) {
      updateGoal(existingGoal.id, payload);
    } else {
      addGoal(payload);
    }

    router.back();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="flex-1 bg-gray-50 px-6 py-10">
          <StyledView className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
            <StepHeader
              currentStep={2}
              totalSteps={4}
              title={existingGoal ? 'Edit goal' : 'New goal'}
              subtitle="Define how players earn points."
            />
            <Input label="Title" value={title} onChangeText={setTitle} placeholder="Drink water" />
            <StyledView className="mb-4">
              <StyledText className="mb-2 text-sm font-medium text-gray-800">Icon</StyledText>
              <StyledView className="flex-row flex-wrap gap-2">
                {iconChoices.map((icon) => (
                  <StyledPressable
                    key={icon}
                    onPress={() => setIconKey(icon)}
                    className={`rounded-full border px-3 py-2 ${iconKey === icon ? 'border-primary bg-blue-50' : 'border-gray-200'}`}
                  >
                    <StyledText className="text-lg">{icon}</StyledText>
                  </StyledPressable>
                ))}
              </StyledView>
            </StyledView>
            <Input
              label="Description"
              value={description}
              onChangeText={setDescription}
              placeholder="Describe the goal"
              multiline
            />
            <Input label="Points" value={points} onChangeText={setPoints} keyboardType="numeric" />
            <StyledView className="mb-4">
              <StyledText className="mb-2 text-sm font-medium text-gray-800">Frequency</StyledText>
              <StyledView className="flex-row flex-wrap gap-2">
                {['daily', 'weekly', 'monthly', 'once'].map((freq) => (
                  <StyledPressable
                    key={freq}
                    onPress={() => setFrequency(freq)}
                    className={`rounded-full border px-3 py-2 capitalize ${
                      frequency === freq ? 'border-primary bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <StyledText className="text-base">{freq}</StyledText>
                  </StyledPressable>
                ))}
              </StyledView>
            </StyledView>
            <StyledView className="mb-4 flex-row items-center justify-between">
              <StyledText className="text-sm font-medium text-gray-800">Unlimited completions</StyledText>
              <Switch value={unlimitedCompletions} onValueChange={setUnlimitedCompletions} />
            </StyledView>
            {!unlimitedCompletions && (
              <Input
                label="Max completions per period"
                value={maxCompletionsPerPeriod}
                onChangeText={setMaxCompletionsPerPeriod}
                keyboardType="numeric"
              />
            )}
            <WizardNavigation
              onNext={handleSave}
              onBack={() => router.back()}
              nextLabel="Save goal"
              disableNext={!isValid}
            />
          </StyledView>
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Step2GoalDetail;
