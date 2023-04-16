import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import LoadingScreen from './screens/LoadingScreen';
import OrderScreen from './screens/OrderScreen';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBottomSheet } from './redux/rootReducer';
import BottomSheet from './components/BottomSheet';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { db } from './firebaseConfig';
import { useState } from 'react';
import Loader from './components/Loader';
import { collection, getDocs, query } from 'firebase/firestore';
import Profile from './screens/Profile';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();
  const dispatch = useDispatch()
  const { openSheet } = useSelector((state) => state.root);
  BackHandler.addEventListener('hardwareBackPress', () => {
    if (openSheet) {
      dispatch(toggleBottomSheet({ open: false, food: {} }))
      return true;
    }
  }, []);
  const [loading, setloading] = useState(true)
  const [userExist, setuserExist] = useState(false)
  const checkLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if (value !== null) {
        setuserExist(true)
        const q = query(collection(db, "user"));
        const querySnapshot = await getDocs(q);
        let arr = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          const id = doc.id
          return arr.push({ id, ...data })
        });
      } else {
        setuserExist(false)
      }
      setloading(false)
    } catch (e) {
      setloading(false)
      console.log(e)
    }
  }
  useEffect(() => {
    checkLogin()
  }, [])
  const HomeNavigation = () => {
    return (
      <Tab.Navigator  barStyle={{ backgroundColor: 'white', height: 65, paddingVertical: 2 }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }} />
      </Tab.Navigator>
    )
  }
  const options = { headerShown: false }
  return (
    <NavigationContainer>
      {
        loading ?
          <Loader loading={loading} /> :
          <>
            <Stack.Navigator initialRouteName={userExist ? 'HomeNavigation' : 'LoginScreen'}>
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={options} />
              <Stack.Screen name="HomeNavigation" component={HomeNavigation} options={options} />
              <Stack.Screen name="Menu" component={MenuScreen} options={options} />
              <Stack.Screen name="Cart" component={CartScreen} options={options} />
              <Stack.Screen name="Loading" component={LoadingScreen} options={options} />
              <Stack.Screen name="Order" component={OrderScreen} options={options} />
            </Stack.Navigator>
            <BottomSheet />
          </>
      }
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})