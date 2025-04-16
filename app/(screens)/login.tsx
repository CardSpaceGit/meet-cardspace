import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Pressable,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { signInWithGoogle, signInWithApple, user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // If user is logged in, redirect to home
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await signInWithGoogle();
      if (error) {
        Alert.alert('Error', error.message);
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      Alert.alert('Error', 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await signInWithApple();
      if (error) {
        Alert.alert('Error', error.message);
      }
    } catch (error) {
      console.error('Apple sign in error:', error);
      Alert.alert('Error', 'Failed to sign in with Apple');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    router.push('/email-login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F7FF', '#F0F0FF']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          {/* Logo */}
          <Image 
            source={require('../../assets/icons/splash-icon.png')} 
            style={styles.logo}
          />

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.welcomeTitle}>Welcome to</Text>
            <Text style={styles.cardSpaceTitle}>CardSpace</Text>
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Imagine all your rewards programs together in one place.
          </Text>

          {isLoading ? (
            <ActivityIndicator size="large" color="#5A31F4" style={styles.loader} />
          ) : (
            <>
              {/* Google Sign In Button */}
              <TouchableOpacity 
                style={styles.googleButton}
                onPress={handleGoogleLogin}
                disabled={isLoading}
              >
                <Image 
                  source={require('../../assets/icons/gpay.png')} 
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
                <View style={styles.arrowContainer}>
                  <Image 
                    source={require('../../assets/icons/arrow-right.png')} 
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>

              {/* Apple Sign In Button - Only visible on iOS */}
              {Platform.OS === 'ios' && (
                <TouchableOpacity 
                  style={styles.appleButton}
                  onPress={handleAppleLogin}
                  disabled={isLoading}
                >
                  <Text style={styles.appleButtonText}>Continue with Apple</Text>
                  <View style={styles.arrowContainerDark}>
                    <Image 
                      source={require('../../assets/icons/arrow-right.png')} 
                      style={[styles.arrowIcon, styles.whiteArrow]}
                    />
                  </View>
                </TouchableOpacity>
              )}

              {/* Separator */}
              <View style={styles.separatorContainer}>
                <Text style={styles.separatorText}>Or you can also Log in with your email</Text>
              </View>

              {/* Email Login Button */}
              <TouchableOpacity 
                style={styles.emailButton}
                onPress={handleEmailLogin}
                disabled={isLoading}
              >
                <Text style={styles.emailButtonText}>Log in with Email</Text>
                <View style={styles.arrowContainerPurple}>
                  <Image 
                    source={require('../../assets/icons/arrow-right.png')} 
                    style={[styles.arrowIcon, styles.whiteArrow]}
                  />
                </View>
              </TouchableOpacity>
            </>
          )}

          {/* Sign Up */}
          <View style={styles.signUpContainer}>
            <Text style={styles.noAccountText}>Don't have an account?</Text>
            <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginTop: 60,
    marginBottom: 12,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#5A31F4',
  },
  cardSpaceTitle: {
    fontSize: 38,
    fontWeight: '600',
    color: '#5A31F4',
  },
  subtitle: {
    fontSize: 16,
    color: '#6A6A8B',
    textAlign: 'center',
    marginBottom: 32,
  },
  loader: {
    marginVertical: 24,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    marginBottom: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#000000',
    borderRadius: 28,
    marginBottom: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  arrowContainer: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#F5F5F5',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainerDark: {
    position: 'absolute',
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainerPurple: {
    position: 'absolute',
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  whiteArrow: {
    tintColor: '#FFFFFF',
  },
  separatorContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  separatorText: {
    fontSize: 14,
    color: '#6A6A8B',
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#5A31F4',
    borderRadius: 28,
    marginBottom: 24,
    paddingHorizontal: 16,
    position: 'relative',
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  noAccountText: {
    fontSize: 14,
    color: '#6A6A8B',
    marginRight: 4,
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5A31F4',
  },
}); 