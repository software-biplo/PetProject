import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
};

export const Input: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  error,
  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <StyledView className="mb-4 w-full">
      <StyledText className="mb-1 text-sm font-medium text-gray-800">{label}</StyledText>
      <StyledTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-primary focus:outline-none ${
          multiline ? 'min-h-[100px]' : ''
        }`}
        placeholderTextColor="#94a3b8"
      />
      {error ? <StyledText className="mt-1 text-sm text-red-500">{error}</StyledText> : null}
    </StyledView>
  );
};
