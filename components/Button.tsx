import { Pressable, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

export type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  className,
}) => {
  const baseStyles =
    variant === 'primary'
      ? 'bg-primary text-white'
      : 'bg-white border border-primary text-primary';

  return (
    <StyledPressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center rounded-xl px-4 py-3 ${
        disabled ? 'opacity-60' : ''
      } ${baseStyles} ${className ?? ''}`}
    >
      {loading && <ActivityIndicator color={variant === 'primary' ? '#fff' : '#2563eb'} className="mr-2" />}
      <StyledText className={`text-base font-semibold ${variant === 'primary' ? 'text-white' : 'text-primary'}`}>
        {label}
      </StyledText>
    </StyledPressable>
  );
};
