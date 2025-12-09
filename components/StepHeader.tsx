import React from 'react';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

type Props = {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
};

export const StepHeader: React.FC<Props> = ({ currentStep, totalSteps, title, subtitle }) => {
  return (
    <StyledView className="mb-6 w-full">
      <StyledText className="text-sm font-semibold uppercase text-primary">Step {currentStep} of {totalSteps}</StyledText>
      <StyledText className="mt-1 text-2xl font-bold text-gray-900">{title}</StyledText>
      {subtitle ? <StyledText className="mt-1 text-base text-gray-600">{subtitle}</StyledText> : null}
      <StyledView className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <StyledView style={{ width: `${(currentStep / totalSteps) * 100}%` }} className="h-full bg-primary" />
      </StyledView>
    </StyledView>
  );
};
