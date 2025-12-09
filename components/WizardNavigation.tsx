import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Button } from './Button';

const StyledView = styled(View);
const StyledText = styled(Text);

type Props = {
  onNext: () => void;
  onBack: () => void;
  onCancel?: () => void;
  disableBack?: boolean;
  disableNext?: boolean;
  nextLabel?: string;
};

export const WizardNavigation: React.FC<Props> = ({
  onNext,
  onBack,
  onCancel,
  disableBack = false,
  disableNext = false,
  nextLabel = 'Next',
}) => {
  const [showCancel, setShowCancel] = useState(false);

  return (
    <StyledView className="mt-6 w-full space-y-3">
      <StyledView className="flex-row justify-between space-x-3">
        <Button label="Back" onPress={onBack} variant="secondary" disabled={disableBack} className="flex-1" />
        <Button label={nextLabel} onPress={onNext} disabled={disableNext} className="flex-1" />
      </StyledView>
      <Button label="Cancel" onPress={() => setShowCancel(true)} variant="secondary" className="w-full" />

      <Modal transparent visible={showCancel} animationType="fade" onRequestClose={() => setShowCancel(false)}>
        <StyledView className="flex-1 items-center justify-center bg-black/50 px-6">
          <StyledView className="w-full rounded-2xl bg-white p-6 shadow-xl">
            <StyledText className="text-lg font-semibold text-gray-900">Cancel new challenge?</StyledText>
            <StyledText className="mt-2 text-base text-gray-600">
              Your progress will be lost. Are you sure you want to cancel?
            </StyledText>
            <StyledView className="mt-4 flex-row justify-end space-x-3">
              <Button label="No" variant="secondary" onPress={() => setShowCancel(false)} className="flex-1" />
              <Button
                label="Yes, cancel"
                onPress={() => {
                  setShowCancel(false);
                  onCancel?.();
                }}
                className="flex-1"
              />
            </StyledView>
          </StyledView>
        </StyledView>
      </Modal>
    </StyledView>
  );
};
