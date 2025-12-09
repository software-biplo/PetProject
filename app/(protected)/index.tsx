import React from 'react';
import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

const StyledView = styled(View);
const StyledText = styled(Text);

const ProtectedHome = () => {
  const { signOut, user } = useAuth();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView className="flex-1 items-center bg-gray-50 px-6 py-10">
        <StyledView className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
          <StyledText className="text-2xl font-bold text-gray-900">Hello {user?.email}</StyledText>
          <StyledText className="mt-2 text-base text-gray-600">
            Welcome to Challenge App. Create a challenge to start competing with friends.
          </StyledText>
          <StyledView className="mt-6 space-y-3">
            <Link href="/(protected)/challenges" asChild>
              <Button label="View challenges" onPress={() => {}} />
            </Link>
            <Link href="/(protected)/challenges/new/step1-general" asChild>
              <Button label="Create new challenge" onPress={() => {}} />
            </Link>
            <Button label="Sign out" variant="secondary" onPress={() => signOut()} />
          </StyledView>
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};

export default ProtectedHome;
