import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from './constants/theme'

const Loader = ({ loading }) => {
    if (!loading) return null;
    
    return (
        <Modal 
            animationType='fade'
            visible={loading} 
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={styles.loadingText}>Please wait...</Text>
                </View>
            </View>
        </Modal>
    )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
    loaderContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    loadingText: {
        marginTop: 10,
        color: COLORS.gray,
        fontSize: 14,
    }
})