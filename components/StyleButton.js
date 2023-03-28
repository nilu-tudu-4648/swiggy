import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from './constants/theme'
import AppText from './AppText'

const StyleButton = ({ style, title, textstyle, onPress, width = 220 }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{
            width: width, height: width / 4.8, backgroundColor: COLORS.primary, borderRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
        }, style]}>
            <AppText style={[{ fontSize: 14, color: COLORS.white }, textstyle]}>{title}</AppText>
        </TouchableOpacity>
    )
}

export default StyleButton

const styles = StyleSheet.create({})