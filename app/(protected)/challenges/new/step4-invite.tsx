import React, { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '@/components/Button';
import { StepHeader } from '@/components/StepHeader';
import { WizardNavigation } from '@/components/WizardNavigation';
import { useChallengeWizard } from '@/hooks/useChallengeWizard';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const Step4Invite = () => {
  const router = useRouter();
  const { state, setInvite, reset } = useChallengeWizard();
  const { user } = useAuth();
  const [emailInput, setEmailInput] = useState(state.invite.emails.join(', '));
  const [loading, setLoading] = useState(false);

  const emails = useMemo(
    () =>
      emailInput
        .split(',')
        .map((email) => email.trim())
        .filter((email) => email.length > 0),
    [emailInput],
  );

  const handleLaunch = async () => {
    if (!user) {
      Alert.alert('Not authenticated');
      return;
    }
    setInvite(emails);

    try {
      setLoading(true);
      const { data: challengeData, error: challengeError } = await supabase
        .from('challenges')
        .insert({
          name: state.general.name,
          description: state.general.description,
          start_at: state.general.startAt?.toISOString(),
          end_at: state.general.endAt?.toISOString(),
          max_players: state.general.maxPlayers,
          leaderboard_visible: state.settings.leaderboardVisible,
          owner_id: user.id,
          status: 'active',
        })
        .select()
        .single();

      if (challengeError) throw challengeError;

      const { error: goalsError } = await supabase.from('challenge_goals').insert(
        state.goals.map((goal) => ({
          challenge_id: challengeData.id,
          title: goal.title,
          icon_key: goal.iconKey,
          description: goal.description,
          points: goal.points,
          frequency: goal.frequency,
          max_completions_per_period: goal.maxCompletionsPerPeriod,
          unlimited_completions: goal.unlimitedCompletions,
        })),
      );
      if (goalsError) throw goalsError;

      const { error: participantError } = await supabase.from('challenge_participants').insert({
        challenge_id: challengeData.id,
        user_id: user.id,
        role: 'owner',
      });
      if (participantError) throw participantError;

      if (emails.length > 0) {
        const { error: invitesError } = await supabase.from('challenge_invites').insert(
          emails.map((email) => ({ challenge_id: challengeData.id, email })),
        );
        if (invitesError) throw invitesError;
      }

      Alert.alert('Challenge launched', 'Your challenge is live!');
      reset();
      router.replace('/(protected)/challenges');
    } catch (error) {
      Alert.alert('Launch failed', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StyledView className="flex-1 bg-gray-50 px-6 py-10">
        <StyledView className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-lg">
          <StepHeader currentStep={4} totalSteps={4} title="Invite friends" subtitle="Invite by email." />
          <StyledText className="mb-2 text-sm font-medium text-gray-800">Emails (comma-separated)</StyledText>
          <StyledTextInput
            value={emailInput}
            onChangeText={setEmailInput}
            placeholder="friend1@example.com, friend2@example.com"
            multiline
            className="min-h-[120px] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm"
            placeholderTextColor="#94a3b8"
          />
          <WizardNavigation
            onNext={handleLaunch}
            onBack={() => router.back()}
            onCancel={() => router.replace('/(protected)/challenges')}
            nextLabel="Launch challenge"
            disableNext={state.goals.length === 0 || loading}
          />
          {loading ? <StyledText className="mt-3 text-sm text-gray-600">Launching...</StyledText> : null}
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};

export default Step4Invite;
