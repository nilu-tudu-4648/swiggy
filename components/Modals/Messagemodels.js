import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StyleButton from '../StyleButton'
const Messagemodels = ({ modalVisible = false, onPress, type, headerText, message, buttonText }) => {
    return (
        <Modal animationType='slide' visible={modalVisible} transparent={true}>
            <Pressable style={styles.container} onPress={onPress}>
                <View style={styles.modal}>
                    <MaterialCommunityIcons
                        name={type === 'success' ? "check-circle" : "close-circle"}
                        size={90} color={type === 'success' ? 'green' : 'red'} />
                    <Text style={{ marginVertical: 8, fontWeight: 'bold', fontSize: 18 }}>{headerText}</Text>
                    <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 14 }}>{message}</Text>
                    <StyleButton title={buttonText} />
                </View>
            </Pressable>
        </Modal>
    )
}

export default Messagemodels

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    }, modal: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        elevation: 5,
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOpacity: 0.25
    }
})