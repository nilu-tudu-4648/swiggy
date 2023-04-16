import React from "react";
import { Text } from "react-native";
import { COLORS } from "./constants/theme";

const StyleText = ({ children, style, size, bold, color }) => {
    return (
        <Text style={[
            {
                color: color ? color : COLORS.black,
                fontWeight: bold ? '700' : '500',
                fontSize: (size ? size : 12)
            }, style]}>
            {children}
        </Text>
    );
};

export default StyleText;
