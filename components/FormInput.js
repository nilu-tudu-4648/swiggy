import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "./constants/theme";
import { Controller } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import AppText from "./AppText";

const FormInput = ({
    control,
    name,
    placeholder,
    rules = {},
    keyboardType,
    maxLength,
    inputStyle,
    icon,
    multiline,
    ...otherProps
}) => {

    return (
        <Controller
            control={control}
            rules={rules}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <>
                    <AppTextInput
                        onBlur={onBlur}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        onChangeText={onChange}
                        value={value}
                        maxLength={maxLength}
                        icon={icon}
                        multiline={multiline}
                        inputStyle={[{ borderColor: error ? 'red' : COLORS.purple2 }, inputStyle]}
                        {...otherProps}
                    />
                    {error ? <AppText style={styles.error}>{error.message || "Error"}</AppText> : <AppText style={styles.error}>{ }</AppText>}
                </>
            )}
        />
    );
};

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: SIZES.h7,
        alignSelf: 'stretch',
        top: 2
    }
});

export default FormInput;
