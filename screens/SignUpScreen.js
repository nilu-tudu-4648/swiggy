import { StyleSheet, View, ToastAndroid, Pressable, Image, StatusBar, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONTS, FSTYLES } from '../components/constants/theme';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import FormInput from '../components/FormInput';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const SignUpScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm({
        defaultValues: {
            firstName: 'Nilesh',
            lastName: 'Kumar',
            email: 'nilesh@gmail.com',
            password: '123456',
            mobileNo: '9876543210',
            address: '123, Main St, Anytown, USA',
            city: 'Anytown',
            pincode: '12345',
            state: 'California',
            country: 'USA'
        }
    });
  
    const checkUserExists = async (mobileNo) => {
        try {
            const userSnapshot = await firestore()
                .collection('users')
                .where('mobileNo', '==', mobileNo)
                .get();
            
            return !userSnapshot.empty;
        } catch (error) {
            console.log('Error checking existing user:', error);
            return false;
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            
            // Check if user with same mobile number exists
            const userExists = await checkUserExists(data.mobileNo);
            if (userExists) {
                ToastAndroid.show("User with this mobile number already exists", ToastAndroid.LONG);
                return;
            }
            
            // Create user in Authentication
            const userCredential = await auth().createUserWithEmailAndPassword(data.email, data.password);
            console.log(userCredential, 'credentials');
            const uid = userCredential.user.uid;
            
            // Save user data to Firestore
            const userData = {
                id: uid,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                mobileNo: data.mobileNo,
                address: data.address,
                city: data.city,
                pincode: data.pincode,
                state: data.state,
                country: data.country,
                createdAt: firestore.FieldValue.serverTimestamp(),
            };
            
            await firestore()
                .collection('users')
                .doc(uid)
                .set(userData);
            
            // Store user data in AsyncStorage
            const completeUserData = {
                user: userCredential.user,
                userData: userData
            };
            
            await AsyncStorage.setItem('user', JSON.stringify(completeUserData));
            
            ToastAndroid.show("User registered successfully", ToastAndroid.SHORT);
            
            // Navigate directly to HomeNavigation after registration
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeNavigation' }],
            });
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`Registration Failed: ${error.message}`, ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };

    // Reset loading state when component unmounts
    useEffect(() => {
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
                        <AppText style={styles.welcomeText}>Create Account</AppText>
                        <AppText style={styles.subtitleText}>Sign up to get started</AppText>
                    </View>
                    
                    <View style={styles.formContainer}>
                        <View style={styles.rowInputs}>
                            <View style={styles.halfInput}>
                                <FormInput
                                    control={control}
                                    rules={{
                                        required: 'This field is mandatory',
                                    }}
                                    placeholder={'First name'}
                                    icon="account-outline"
                                    name='firstName' />
                            </View>
                            <View style={styles.halfInput}>
                                <FormInput
                                    control={control}
                                    rules={{
                                        required: 'This field is mandatory',
                                    }}
                                    placeholder={'Last name'}
                                    icon="account-outline"
                                    name='lastName' />
                            </View>
                        </View>
                        
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
                            icon="email-outline"
                            name='email'
                            keyboardType='email-address' />
                            
                        <FormInput
                            control={control}
                            rules={{
                                required: 'Password is mandatory',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' }
                            }}
                            placeholder={'Password'}
                            icon="lock-outline"
                            name='password'
                            secureTextEntry />
                            
                        <FormInput
                            control={control}
                            rules={{
                                required: 'Mobile number is mandatory',
                                minLength: { value: 10, message: 'Mobile no. must be 10 digits' }
                            }}
                            keyboardType='numeric'
                            maxLength={10}
                            icon="phone-outline"
                            placeholder={'Enter Mobile Number'}
                            name='mobileNo' />
                        
                        <View style={styles.divider} />
                        <AppText style={styles.sectionTitle}>Address Details</AppText>
                        
                        <FormInput
                            control={control}
                            rules={{
                                required: 'Address is mandatory',
                            }}
                            placeholder={'Enter Address'}
                            icon="map-marker-outline"
                            multiline={true}
                            name='address' />
                            
                        <View style={styles.rowInputs}>
                            <View style={styles.halfInput}>
                                <FormInput
                                    control={control}
                                    rules={{ required: 'City is mandatory' }}
                                    placeholder={'City'}
                                    icon="city"
                                    name='city' />
                            </View>
                            <View style={styles.halfInput}>
                                <FormInput
                                    control={control}
                                    rules={{ required: 'State is mandatory' }}
                                    placeholder={'State'}
                                    icon="map-outline"
                                    name='state' />
                            </View>
                        </View>
                        
                        <View style={styles.rowInputs}>
                            <View style={styles.halfInput}>
                                <FormInput
                                    control={control}
                                    rules={{ required: 'Pincode is mandatory' }}
                                    placeholder={'Pincode'}
                                    icon="numeric"
                                    name='pincode'
                                    keyboardType='numeric' />
                            </View>
                            <View style={styles.halfInput}>
                                <FormInput
                                    control={control}
                                    rules={{ required: 'Country is mandatory' }}
                                    placeholder={'Country'}
                                    icon="earth"
                                    name='country' />
                            </View>
                        </View>
                        
                        <AppButton 
                            title={"Register Now"} 
                            style={styles.registerButton} 
                            onPress={handleSubmit(onSubmit)} />
                    </View>
                    
                    <View style={styles.footer}>
                        <AppText style={styles.footerText}>Already have an account?</AppText>
                        <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                            <AppText style={styles.loginText}> Login </AppText>
                        </Pressable>
                    </View>
                    
                </ScrollView>
            </View>
        </>
    )
}

export default SignUpScreen

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
        marginTop: 40,
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 15,
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
    rowInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    divider: {
        height: 1,
        width: '100%',
        marginVertical: 15,
        backgroundColor: COLORS.lightGray,
    },
    sectionTitle: {
        ...FONTS.body4,
        color: COLORS.gray,
        marginBottom: 10,
    },
    registerButton: {
        alignSelf: 'center',
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 15,
    },
    footer: {
        ...FSTYLES,
        justifyContent: 'center',
        marginTop: 10,
    },
    footerText: {
        ...FONTS.body4,
        color: COLORS.gray,
    },
    loginText: {
        ...FONTS.body4,
        color: COLORS.primary,
        fontWeight: 'bold',
    }
});