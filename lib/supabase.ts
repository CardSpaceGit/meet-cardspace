import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// SecureStore is not supported on web, so we need to use localStorage instead
const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    if (Platform.OS === 'web') {
      const value = localStorage.getItem(key);
      return value;
    }
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    return SecureStore.deleteItemAsync(key);
  },
};

// Initialize Supabase with your project URL and public API key
// Replace these with your actual project values
const supabaseUrl = 'https://gqlslugwzmcwxwyxybut.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxbHNsdWd3em1jd3h3eXh5YnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNzY3ODMsImV4cCI6MjA1Njc1Mjc4M30._AZBq-KqqDJKUadXzjM1ET8ZDEKi85FDyRjdnf4WtS8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 