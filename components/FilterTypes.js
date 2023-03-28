import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Ionicons } from "@expo/vector-icons";
const FilterTypes = () => {

    const FilterType = ({ item }) => {
        return (
            <Pressable
                style={{
                    marginHorizontal: 3,
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#D0D0D0",
                    padding: 6,
                    paddingHorizontal: 9,
                    borderRadius: 20,
                    justifyContent: "center",
                    //   elevation: 2,
                    //   backgroundColor: 'white'
                }}
            >
                <Text style={{ marginRight: 6, fontSize: 12 }}>{item.name}</Text>
                {
                    item.icon &&
                    <Ionicons name="filter" size={20} color="black" />
                }
            </Pressable>
        )
    }
    const filters = [
        { name: 'Filter', icon: true },
        { name: 'Sort By Rating' },
        { name: 'Fast Delivery' },
        { name: 'Cuisness' },
        { name: 'Sort By Price' },
    ]
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    filters.map((item, i) => {
                        return <FilterType item={item} key={i} />
                    })
                }
            </ScrollView>
        </View>
    )
}

export default FilterTypes

const styles = StyleSheet.create({})