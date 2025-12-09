import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';

const StyledView = styled(View);
const StyledText = styled(Text);

const LoginScreen = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn(email.trim(), password);
      router.replace('/(protected)');
    } catch (error) {
      Alert.alert('Login failed', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <StyledView className="flex-1 items-center justify-center px-6 py-10">
          <StyledView className="w-full max-w-md rounded-3xl bg-white/90 p-6 shadow-lg">
            <StyledText className="text-3xl font-bold text-gray-900">Welcome back</StyledText>
            <StyledText className="mt-1 text-base text-gray-600">Sign in to continue.</StyledText>
            <StyledView className="mt-6">
              <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
              <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
              <Button label="Login" onPress={handleLogin} loading={loading} disabled={!email || !password} />
              <StyledView className="mt-4 flex-row justify-between">
                <Link href="/forgot-password" asChild>
                  <StyledText className="text-sm font-medium text-primary">Forgot password?</StyledText>
                </Link>
                <Link href="/signup" asChild>
                  <StyledText className="text-sm font-medium text-primary">Create account</StyledText>
                </Link>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
