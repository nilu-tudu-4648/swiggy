import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import StyleText from "./StyleText";
import { COLORS, FONTS, SIZES } from "./constants/theme";


const AppButton = ({
    title,
    onPress,
    style,
    borderColor,
    textStyle,
    disabled,
    varient
}) => {
    return (
        <>
            {
                varient ?
                    <TouchableOpacity disabled={disabled}
                        onPress={onPress} style={
                            [{
                                ...styles.bntstyle,
                                backgroundColor: 'white',
                                borderColor: borderColor ? borderColor : 'green',
                            }, style]
                        }>
                        < StyleText bold={true} style={[{ fontSize: 7, color: borderColor ? borderColor : 'green' }, textStyle]} > {title}</StyleText >
                    </TouchableOpacity > :
                    <TouchableOpacity disabled={disabled}
                        onPress={onPress} style={[styles.bntstyle, style]}>
                        <StyleText style={[styles.text, textStyle]}>{title}</StyleText>
                    </TouchableOpacity>
            }
        </>
    );
};

const styles = StyleSheet.create({
    bntstyle: {
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        height: SIZES.height * .068,
        // borderWidth: 1,
        alignItems: 'center',
        marginHorizontal: 3,
        backgroundColor: COLORS.primary
    },
    text: {
        ...FONTS.h5,
        color: COLORS.white,
    },
});

export default React.memo(AppButton);
