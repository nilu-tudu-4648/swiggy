import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../components/AppButton';
import { STYLES } from '../components/constants/theme';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
    const navigation = useNavigation()
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user')
            navigation.navigate('LoginScreen')
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <View style={{ ...STYLES, flex: 1 }}>
            <Text>Profile</Text>
            <AppButton title={'Logout'} style={{ width: '95%', marginVertical: 5 }} onPress={logout} />
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})