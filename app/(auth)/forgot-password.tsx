import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { resetPassword } from '@/lib/supabase';

const StyledView = styled(View);
const StyledText = styled(Text);

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    try {
      setLoading(true);
      await resetPassword(email.trim());
      setSuccess(true);
    } catch (error) {
      Alert.alert('Reset failed', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <StyledView className="flex-1 items-center justify-center px-6 py-10">
          <StyledView className="w-full max-w-md rounded-3xl bg-white/90 p-6 shadow-lg">
            <StyledText className="text-3xl font-bold text-gray-900">Reset password</StyledText>
            <StyledText className="mt-1 text-base text-gray-600">
              Enter the email associated with your account.
            </StyledText>
            <StyledView className="mt-6">
              <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
              <Button label="Send reset link" onPress={handleReset} loading={loading} disabled={!email} />
              {success ? (
                <StyledText className="mt-3 text-sm text-green-600">Check your inbox for reset instructions.</StyledText>
              ) : null}
              <StyledView className="mt-4 flex-row justify-center">
                <Link href="/login" asChild>
                  <StyledText className="text-sm font-medium text-primary">Back to login</StyledText>
                </Link>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
