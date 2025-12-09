import React from 'react';
import { Link } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '@/components/Button';

const StyledView = styled(View);
const StyledText = styled(Text);

const mockChallenges = [
  { id: '1', name: '30-day fitness', status: 'active' },
];

const ChallengesScreen = () => {
  return (
    <StyledView className="flex-1 bg-gray-50 px-6 py-10">
      <StyledView className="mb-4 flex-row items-center justify-between">
        <StyledText className="text-2xl font-bold text-gray-900">Challenges</StyledText>
        <Link href="/(protected)/challenges/new/step1-general" asChild>
          <Button label="New challenge" onPress={() => {}} />
        </Link>
      </StyledView>
      <FlatList
        data={mockChallenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledView className="mb-3 rounded-2xl bg-white p-4 shadow-sm">
            <StyledText className="text-lg font-semibold text-gray-900">{item.name}</StyledText>
            <StyledText className="mt-1 text-sm capitalize text-gray-600">Status: {item.status}</StyledText>
          </StyledView>
        )}
      />
    </StyledView>
  );
};

export default ChallengesScreen;
