import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';

export default function EmailLogin() {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const handleSendMagicLink = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await signInWithEmail(email);
      
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to send login link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={['#F8F7FF', '#F0F0FF']}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleGoBack}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            
            <View style={styles.content}>
              <Text style={styles.title}>Log in with Email</Text>
              
              {emailSent ? (
                <View style={styles.successContainer}>
                  <Text style={styles.successTitle}>Check your inbox</Text>
                  <Text style={styles.successText}>
                    We've sent a magic link to {email}. Click the link in the email to log in.
                  </Text>
                  <TouchableOpacity 
                    style={styles.resendButton}
                    onPress={handleSendMagicLink}
                    disabled={isLoading}
                  >
                    <Text style={styles.resendButtonText}>Resend Email</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <Text style={styles.subtitle}>
                    Enter your email to receive a magic link for password-free sign in
                  </Text>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Your Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g hi@meetcard.space"
                      placeholderTextColor="#9A9AB0"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!isLoading}
                    />
                  </View>
                  
                  {isLoading ? (
                    <ActivityIndicator size="large" color="#5A31F4" style={styles.loader} />
                  ) : (
                    <TouchableOpacity 
                      style={styles.sendButton}
                      onPress={handleSendMagicLink}
                    >
                      <Text style={styles.sendButtonText}>Send Magic Link</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#5A31F4',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#5A31F4',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6A6A8B',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: '#6A6A8B',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
  },
  loader: {
    marginVertical: 24,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#5A31F4',
    borderRadius: 28,
    marginTop: 16,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  successContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#5A31F4',
    marginBottom: 16,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#6A6A8B',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  resendButton: {
    padding: 12,
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5A31F4',
  },
}); 