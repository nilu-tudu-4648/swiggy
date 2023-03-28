import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Pressable } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Entypo } from '@expo/vector-icons';

import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toggleBottomSheet } from '../redux/rootReducer';
import { addToCart } from '../redux/CartReducer';
const BottomSheet = () => {

    const { openSheet } = useSelector((state) => state.root);
    // ref
    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['35%', '60%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current.close();
        dispatch(toggleBottomSheet({ open: false, food: {} }))
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);
    useEffect(() => {
        if (openSheet.open) {
            handlePresentModalPress();
        } else {
            bottomSheetModalRef.current.close()
        }
    }, [openSheet])
    const dispatch = useDispatch()
    const image = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/m7osxfhdon2opecztidb"
    // renders
    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <View style={styles.contentContainer}>
                        {
                            openSheet.food &&
                            <>
                                <ImageBackground style={{ width: '100%', height: 200, flexDirection: 'row', justifyContent: 'flex-end' }} source={{ uri: openSheet.food.image }}>
                                    <Pressable onPress={handleCloseModalPress} style={{ margin: 13, width: 25, height: 25, borderRadius: 25 / 2, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                        <Entypo name="cross" size={24} color="gray" />
                                    </Pressable>
                                </ImageBackground>
                                <View>
                                    <Text style={{ fontSize: 15, fontWeight: "600" }}>{openSheet.food.name}</Text>
                                    <Text style={{ fontSize: 12, fontWeight: "600" }}>{openSheet.food.price}</Text>
                                    <Pressable
                                        onPress={() => {
                                            dispatch(addToCart(openSheet.food));
                                        }}
                                        style={{
                                            width: 100,
                                            paddingHorizontal: 25,
                                            paddingVertical: 8,
                                            alignItems: "center",
                                            backgroundColor: "white",
                                            borderRadius: 5,
                                            elevation: 6
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: "600",
                                                color: "#018749",
                                            }}
                                        >
                                            ADD
                                        </Text>
                                    </Pressable>
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            borderRadius: 4,
                                        }}
                                    >
                                        {[0, 0, 0, 0, 0].map((en, i) => (
                                            <FontAwesome
                                                key={i}
                                                style={{ paddingHorizontal: 3 }}
                                                name={"star-o"}
                                                size={12}
                                                color="#FFD700"
                                            />
                                        ))}
                                    </Text>
                                    <Text
                                        style={{ width: 180, marginTop: 8, color: "gray", fontSize: 13 }}
                                    >
                                        {openSheet.food.description?.length > 30
                                            ? openSheet.food.description.substr(0, 35) + "..."
                                            : openSheet.food.description}
                                    </Text>
                                </View>
                            </>
                        }
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    contentContainer: {
        alignItems: 'center',
    },
});

export default BottomSheet;