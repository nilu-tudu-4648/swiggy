import { BackHandler, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import firestore from '@react-native-firebase/firestore';
import Loader from './components/Loader';
import Profile from './screens/Profile';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MyWishlist from './screens/MyWishlist';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();
  const dispatch = useDispatch()
  const { openSheet } = useSelector((state) => state.root);
  const [loading, setLoading] = useState(true);
  const [userExist, setUserExist] = useState(false);
  
  // Handle hardware back button when bottom sheet is open
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (openSheet) {
        dispatch(toggleBottomSheet({ open: false, food: {} }));
        return true;
      }
      return false;
    });
    
    return () => backHandler.remove();
  }, [openSheet]);
  
  const checkLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      
      if (userData !== null) {
        // Parse the JSON string from AsyncStorage
        const parsedUserData = JSON.parse(userData);
        setUserExist(true);
        
        // Could add additional user data validation or token verification here
      } else {
        setUserExist(false);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
      setUserExist(false);
    } finally {
      // Always set loading to false when check is complete
      setLoading(false);
    }
  };
  
  useEffect(() => {
    checkLogin();
  }, []);
  
  // Tab Navigator component
  const HomeNavigation = () => {
    return (
      <Tab.Navigator barStyle={{ backgroundColor: 'white', height: 65, paddingVertical: 2 }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color }) => (
            <AntDesign name="heart" color={color} size={24} />
          ),
        }} />
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }} />
      </Tab.Navigator>
    );
  };
  
  const options = { headerShown: false };
  
  if (loading) {
    return <Loader loading={loading} />;
  }
  
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Navigator initialRouteName={userExist ? 'HomeNavigation' : 'LoginScreen'}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={options} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={options} />
        <Stack.Screen name="HomeNavigation" component={HomeNavigation} options={options} />
        <Stack.Screen name="Menu" component={MenuScreen} options={options} />
        <Stack.Screen name="Cart" component={CartScreen} options={options} />
        <Stack.Screen name="Loading" component={LoadingScreen} options={options} />
        <Stack.Screen name="Order" component={OrderScreen} options={options} />
        <Stack.Screen name="Search" component={SearchScreen} options={options} />
        <Stack.Screen name="MyWishlist" component={MyWishlist} options={options} />
      </Stack.Navigator>
      <BottomSheet />
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({})