import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const SplashScreen: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['#F8F7FF', '#F0F0FF']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.centerContent}>
            <Image 
              source={require('../../assets/icons/splash-icon.png')} 
              style={styles.logo}
            />
            
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.cardSpaceText}>to CardSpace</Text>
            </View>
          </View>
          
          <View style={styles.footerContent}>
            <Text style={styles.quoteText}>
              "When something is important enough, you do it even if the odds are not in your favour."
            </Text>
            
            <Text style={styles.copyrightText}>
              CardSpace © 2024.
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

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
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  textContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: '600',
    color: '#5A31F4',
    textAlign: 'center',
  },
  cardSpaceText: {
    fontSize: 44,
    fontWeight: '600',
    color: '#5A31F4',
    textAlign: 'center',
  },
  footerContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#6A6A8B',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  copyrightText: {
    fontSize: 14,
    color: '#5A31F4',
    fontWeight: '500',
  },
});

export default SplashScreen; 