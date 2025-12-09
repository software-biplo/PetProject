import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';

const StyledView = styled(View);
const StyledText = styled(Text);

const SignupScreen = () => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await signUp(email.trim(), password);
      router.replace('/login');
    } catch (error) {
      Alert.alert('Sign up failed', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <StyledView className="flex-1 items-center justify-center px-6 py-10">
          <StyledView className="w-full max-w-md rounded-3xl bg-white/90 p-6 shadow-lg">
            <StyledText className="text-3xl font-bold text-gray-900">Create account</StyledText>
            <StyledText className="mt-1 text-base text-gray-600">Start challenging friends today.</StyledText>
            <StyledView className="mt-6">
              <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
              <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
              <Input label="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
              <Button
                label="Sign up"
                onPress={handleSignup}
                loading={loading}
                disabled={!email || !password || !confirmPassword}
              />
              <StyledView className="mt-4 flex-row justify-center">
                <StyledText className="text-sm text-gray-700">Already have an account? </StyledText>
                <Link href="/login" asChild>
                  <StyledText className="text-sm font-medium text-primary">Log in</StyledText>
                </Link>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
