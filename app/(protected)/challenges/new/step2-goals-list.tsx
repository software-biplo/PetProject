import React from 'react';
import { Link, useRouter } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '@/components/Button';
import { StepHeader } from '@/components/StepHeader';
import { WizardNavigation } from '@/components/WizardNavigation';
import { useChallengeWizard } from '@/hooks/useChallengeWizard';

const StyledView = styled(View);
const StyledText = styled(Text);

const Step2GoalsList = () => {
  const router = useRouter();
  const { state, removeGoal } = useChallengeWizard();

  const renderGoal = ({ item }: any) => (
    <StyledView className="mb-3 rounded-2xl border border-gray-200 bg-white p-4">
      <StyledText className="text-lg font-semibold text-gray-900">{item.title}</StyledText>
      <StyledText className="text-sm text-gray-600">{item.description}</StyledText>
      <StyledText className="mt-1 text-xs uppercase text-primary">{item.frequency}</StyledText>
      <StyledView className="mt-2 flex-row space-x-2">
        <Link
          href={{ pathname: '/(protected)/challenges/new/step2-goal-detail', params: { goalId: item.id } }}
          asChild
        >
          <Button label="Edit" onPress={() => {}} variant="secondary" className="flex-1" />
        </Link>
        <Button label="Remove" variant="secondary" onPress={() => removeGoal(item.id)} className="flex-1" />
      </StyledView>
    </StyledView>
  );

  return (
    <StyledView className="flex-1 bg-gray-50 px-6 py-10">
      <StyledView className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
        <StepHeader currentStep={2} totalSteps={4} title="Goals" subtitle="Define how players earn points." />
        <FlatList
          data={state.goals}
          keyExtractor={(item) => item.id}
          renderItem={renderGoal}
          ListEmptyComponent={<StyledText className="text-gray-600">No goals yet. Add your first goal.</StyledText>}
        />
        <StyledView className="mt-4 space-y-3">
          <Link href="/(protected)/challenges/new/step2-goal-detail" asChild>
            <Button label="Add goal" onPress={() => {}} />
          </Link>
          <WizardNavigation
            onNext={() => router.push('/(protected)/challenges/new/step3-settings')}
            onBack={() => router.back()}
            disableNext={state.goals.length === 0}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default Step2GoalsList;
