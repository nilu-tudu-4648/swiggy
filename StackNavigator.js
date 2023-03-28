import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import LoadingScreen from './screens/LoadingScreen';
import OrderScreen from './screens/OrderScreen';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBottomSheet } from './redux/rootReducer';
import BottomSheet from './components/BottomSheet';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch()
  const { openSheet } = useSelector((state) => state.root);
  BackHandler.addEventListener('hardwareBackPress', () => {
    if (openSheet) {
      dispatch(toggleBottomSheet({ open: false, food: {} }))
      return true;
    }
  }, []);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <BottomSheet />
    </>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})