import React from 'react';
import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import AppButton from '../components/AppButton';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useEffect } from 'react';
import { useState } from 'react';
import StyleText from '../components/StyleText';
import { COLORS, FSTYLES } from '../components/constants/theme';
import Loader from '../components/Loader';

export default function LoginScreen({ navigation }) {

  const [register, setregister] = useState(false)
  
  const [loading, setloading] = useState(false)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: 'n@gmail.com',
      password: '123456',
    }
  });
  const onSubmit = data => {
    setloading(true)
    if (register) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          console.log(userCredential, 'credentials')
          ToastAndroid.show("Register Successfully", ToastAndroid.SHORT)
          setloading(false)
          setregister(false)
        })
        .catch((error) => {
          console.log(error)
          ToastAndroid.show("Register Failed", ToastAndroid.SHORT)
          setloading(false)
        });
    } else {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
          ToastAndroid.show("Login Successfully", ToastAndroid.SHORT)
          console.log(userCredential, 'credentials')
          navigation.navigate('HomeNavigation')
          setloading(false)
          try {
            await AsyncStorage.setItem('user', JSON.stringify(userCredential))
          } catch (error) {
            console.log(error)
          }
        })
        .catch((error) => {
          console.log(error)
          setloading(false)
          ToastAndroid.show("Please check email and password", ToastAndroid.SHORT)
        });
       
    }
  };
  const checkUserRegister = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        console.log('User is signed out')
        // User is signed out
        // ...
      }
    });
  }
  useEffect(() => {
    checkUserRegister()
  }, [])
  return (
    <>
      <Loader loading={loading} />
      <View style={styles.container}>
        <Text style={styles.title}>{register ? 'Register' : 'Login'}</Text>
        <View style={styles.inputStyle}>
          <FormInput
            control={control}
            rules={{
              required: 'This field is mandatory',
            }}
            placeholder={'Email'}
            name='email' />
        </View>
        <View style={styles.inputStyle}>
          <FormInput
            control={control}
            rules={{
              required: 'This field is mandatory',
              minLength: { value: 6, message: 'Password must be 6 digits' }
            }}
            placeholder={'Password'}
            name='password' />
        </View>
        <View style={{ ...FSTYLES, justifyContent: 'flex-end', width: '90%' }}>
          <StyleText style={{ fontSize: 9 }}>{!register ? 'Not have an account?' : 'Already have account?'}</StyleText>
          <Pressable onPress={() => setregister(!register)}>
            <StyleText style={{ fontSize: 9, color: COLORS.primary }}> {!register ? 'Sign up' : 'Sign In'} </StyleText>
          </Pressable>
        </View>
        <AppButton title={register ? "Register Now" : "Login"} style={{ width: '95%', marginVertical: 5 }} onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 12
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    alignSelf: 'center'
  },
  inputStyle: {
    width: '95%',
    marginVertical: 6
  }
});
