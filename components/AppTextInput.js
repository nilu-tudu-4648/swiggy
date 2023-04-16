import React from "react";
import { KeyboardAvoidingView, StyleSheet, TextInput, } from "react-native";
import { COLORS,  SIZES,  } from "./constants/theme";

const AppTextInput = ({
    style,
    inputStyle,
    onChangeText,
    placeholder,
    keyboardType,
    ...otherProps
}) => {
    return (
        <KeyboardAvoidingView style={[styles.container, style]}>
            <TextInput
                placeholderTextColor={COLORS.purple2}
                placeholder={placeholder}
                style={[styles.textInput, inputStyle]}
                onChangeText={onChangeText}
                keyboardType={keyboardType ? keyboardType : "default"}
                {...otherProps}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: "100%",
    },
    textInput: {
        borderRadius: 5,
        padding: SIZES.base1,
        borderColor: COLORS.purple2,
        borderWidth: .5,
        fontSize: SIZES.h6,
        color: COLORS.black,
    }
});

export default AppTextInput;
