import React from "react";
import { KeyboardAvoidingView, StyleSheet, TextInput, View } from "react-native";
import { COLORS, SIZES } from "./constants/theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppTextInput = ({
    style,
    inputStyle,
    onChangeText,
    placeholder,
    keyboardType,
    icon,
    multiline,
    ...otherProps
}) => {
    return (
        <KeyboardAvoidingView style={[styles.container, style]}>
            <View style={styles.inputContainer}>
                {icon && (
                    <Icon 
                        name={icon} 
                        size={20} 
                        color={COLORS.gray} 
                        style={[
                            styles.icon,
                            multiline ? styles.iconMultiline : null
                        ]}
                    />
                )}
                <TextInput
                    placeholderTextColor={COLORS.gray}
                    placeholder={placeholder}
                    style={[
                        styles.textInput, 
                        inputStyle,
                        icon ? { paddingLeft: 40 } : {},
                        multiline ? styles.multilineInput : {}
                    ]}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType ? keyboardType : "default"}
                    multiline={multiline}
                    {...otherProps}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: "100%",
        marginBottom: 10,
    },
    inputContainer: {
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        left: 12,
        top: '50%',
        marginTop: -10,
        zIndex: 1,
    },
    iconMultiline: {
        top: 15,
        marginTop: 0,
    },
    textInput: {
        borderRadius: 10,
        padding: SIZES.base1,
        paddingVertical: 12,
        borderColor: COLORS.purple2,
        borderWidth: 1,
        fontSize: SIZES.h6,
        color: COLORS.black,
        backgroundColor: COLORS.lightGray,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    }
});

export default AppTextInput;
