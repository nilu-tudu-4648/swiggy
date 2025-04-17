import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, ToastAndroid, View, ScrollView, Image, StatusBar } from 'react-native';
import AppButton from '../components/AppButton';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AppText from '../components/AppText';
import { COLORS, FONTS, FSTYLES, SIZES, STYLES } from '../components/constants/theme';
import Loader from '../components/Loader';

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: 'nilesh@gmail.com',
      password: '123456',
    }
  });
  
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Authenticate user
      const userCredential = await auth().signInWithEmailAndPassword(data.email, data.password);
      const uid = userCredential.user.uid;
      console.log('User is signed in with uid:', uid);
      
      // Fetch user data from Firestore
      const userDoc = await firestore()
        .collection('users')
        .doc(uid)
        .get();
      
      if (userDoc.exists) {
        const userData = userDoc.data();
        
        // Store complete user data in AsyncStorage
        const completeUserData = {
          ...userCredential,
          userData: userData
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(completeUserData));
        ToastAndroid.show("Login Successfully", ToastAndroid.SHORT);
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeNavigation' }],
        });
      } else {
        console.log('User document not found in Firestore');
        ToastAndroid.show("User profile not found", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Please check email and password", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  
  const checkUserRegister = () => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        console.log('User is signed in with uid:', uid);
      } else {
        console.log('User is signed out')
      }
    });
  }
  
  useEffect(() => {
    checkUserRegister();
    
    // Ensure loading is reset when component unmounts
    return () => {
      setLoading(false);
    };
  }, []);
  
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Loader loading={loading} />
      <View style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.logoContainer}>
            {/* Using existing icon from assets */}
            <Image 
              source={require('../assets/icon.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
            <AppText style={styles.welcomeText}>Welcome Back!</AppText>
            <AppText style={styles.subtitleText}>Sign in to continue</AppText>
          </View>
          
          <View style={styles.formContainer}>
            <FormInput
              control={control}
              rules={{
                required: 'Email is mandatory',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              placeholder={'Email'}
              name='email'
              icon="email-outline"
              keyboardType='email-address' />
              
            <FormInput
              control={control}
              rules={{
                required: 'Password is mandatory',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              }}
              placeholder={'Password'}
              name='password'
              icon="lock-outline"
              secureTextEntry />
            
            <Pressable onPress={() => {}}>
              <AppText style={styles.forgotPassword}>Forgot Password?</AppText>
            </Pressable>
            
            <AppButton 
              title={"Login"} 
              style={styles.loginButton} 
              onPress={handleSubmit(onSubmit)} />
          </View>
          
          <View style={styles.footer}>
            <AppText style={styles.footerText}>Don't have an account?</AppText>
            <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
              <AppText style={styles.signupText}> Sign up </AppText>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    ...FONTS.h2,
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitleText: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  forgotPassword: {
    ...FONTS.body4,
    color: COLORS.primary,
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 20,
  },
  loginButton: {
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
  },
  footer: {
    ...FSTYLES,
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  signupText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  }
});
