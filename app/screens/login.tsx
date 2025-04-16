import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Pressable 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (text: string) => {
    setFormData({ ...formData, email: text });
  };

  const handlePasswordChange = (text: string) => {
    setFormData({ ...formData, password: text });
  };

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login with:', formData);
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login logic
    console.log('Login with Google');
  };

  const handleSignUp = () => {
    // TODO: Navigate to sign up screen
    console.log('Navigate to sign up');
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

          {/* Google Sign In Button */}
          <TouchableOpacity 
            style={styles.googleButton}
            onPress={handleGoogleLogin}
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

          {/* Separator */}
          <View style={styles.separatorContainer}>
            <Text style={styles.separatorText}>Or you can also Log in with your email</Text>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your Email</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g hi@meetcard.space"
              placeholderTextColor="#9A9AB0"
              value={formData.email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="enter password"
                placeholderTextColor="#9A9AB0"
                value={formData.password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.eyeIconContainer}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Log in with Email</Text>
            <View style={styles.loginArrowContainer}>
              <Image 
                source={require('../../assets/icons/arrow-right.png')} 
                style={[styles.arrowIcon, styles.whiteArrow]}
              />
            </View>
          </TouchableOpacity>

          {/* Sign Up */}
          <View style={styles.signUpContainer}>
            <Text style={styles.noAccountText}>Don't have an account?</Text>
            <TouchableOpacity onPress={handleSignUp}>
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
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
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
  inputContainer: {
    width: '100%',
    marginBottom: 16,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
  },
  eyeIconContainer: {
    width: 48,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 20,
    color: '#9A9AB0',
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#6A6A8B',
  },
  loginButton: {
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
  loginButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  loginArrowContainer: {
    position: 'absolute',
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteArrow: {
    tintColor: '#FFFFFF',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
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