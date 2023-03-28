import React from "react";
import { StyleSheet, Text, } from "react-native";
import { NBFONTS } from "./constants/theme";


const AppText = ({ children, style, }) => {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        ...NBFONTS.h5,
    },
});

export default AppText;
