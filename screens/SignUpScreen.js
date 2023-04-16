import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, FSTYLES, SIZES, STYLES } from '../components/constants/theme';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { ScrollView } from 'react-native';
import AppText from '../components/AppText';
import FormInput from '../components/FormInput';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = () => {
    const [text, settext] = useState()
    const [checked, setChecked] = React.useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            mobileNo: '',
            address: '',
            city: '',
            pincode: '',
            state: '',
            country: ''
        }
    });
  
    const loginFunc = async () => {
        const email = 'nilesh@gmail.com'
        const password = '123456'
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential, 'credentials')
            })
            .catch((error) => {
                console.log(error)
            });
    }
    const onSubmit = data => {
        loginFunc()
        console.log(data)
    };
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView contentContainerStyle={{ backgroundColor: COLORS.background }}>
                <View style={{
                    width: SIZES.width,
                    height: SIZES.height * .8,
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    paddingHorizontal: 15,
                    paddingTop: 15,
                    paddingBottom: 15,
                    justifyContent: 'space-between',
                }}>
                    <View style={STYLES}>
                        <AppText style={{ ...FONTS.h5, marginVertical: 8, alignSelf: 'stretch' }}>Register</AppText>
                        <View style={{ ...FSTYLES }}>
                            <View style={styles.inputStyle}>
                                <FormInput
                                    control={control}
                                    rules={{
                                        required: 'This field is mandatory',
                                    }}
                                    placeholder={'First name'}
                                    name='firstName' />
                            </View>
                            <View style={styles.inputStyle}>
                                <FormInput
                                    control={control}
                                    rules={{
                                        required: 'This field is mandatory',
                                    }}
                                    placeholder={'Last name'}
                                    name='lastName' />
                            </View>
                        </View>
                        <FormInput
                            control={control}
                            rules={{
                                required: 'This field is mandatory',
                                minLength: { value: 10, message: 'Mobile no. must be 10 digits' }
                            }}
                            keyboardType='numeric'
                            maxLength={10}
                            placeholder={'Enter Mobile Number'}
                            name='mobileNo' />
                        <View style={{ height: 1, width: '100%', marginVertical: 8, backgroundColor: COLORS.purple2 }} />
                        <FormInput
                            control={control}
                            rules={{
                                required: 'This field is mandatory',
                            }}
                            placeholder={'Enter Address'}
                            inputStyle={{ height: SIZES.height * .17, textAlignVertical: 'top', }}
                            name='address' />
                        <View style={{ ...FSTYLES }}>
                            <AppTextInput
                                placeholder={'City'}
                                value={text}
                                style={styles.inputStyle}
                                onChangeText={settext} />
                            <AppTextInput
                                placeholder={'State'}
                                value={text}
                                style={styles.inputStyle}
                                onChangeText={settext} />
                        </View>
                        <View style={{ ...FSTYLES }}>
                            <AppTextInput
                                placeholder={'Pincode'}
                                value={text}
                                keyboardType='numeric'
                                style={styles.inputStyle}
                                onChangeText={settext} />
                            <AppTextInput
                                placeholder={'Country'}
                                value={text}
                                style={styles.inputStyle}
                                onChangeText={settext} />
                        </View>
                    </View>
                    <View>
                        <AppButton title={"Register Now"} style={{ alignSelf: 'center' }} onPress={handleSubmit(onSubmit)} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUpScreen
const styles = StyleSheet.create({
    inputStyle: {
        width: '49%',
        marginVertical: 6
    }
})