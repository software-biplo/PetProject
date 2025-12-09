import 'dotenv/config';

export default {
  expo: {
    name: "challenge-app",
    slug: "challenge-app",
    scheme: "challengeapp",
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
};
