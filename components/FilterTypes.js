import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const FilterTypes = ({ activeFilters, onFilterChange }) => {

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
        {
            id: 'fastDelivery',
            name: 'Fast Delivery',
            isActive: activeFilters.fastDelivery,
            onPress: () => onFilterChange({ fastDelivery: !activeFilters.fastDelivery }),
        },
        {
            id: 'rating',
            name: 'Sort By Rating',
            isActive: activeFilters.sortBy === 'rating',
            onPress: () => onFilterChange({ sortBy: activeFilters.sortBy === 'rating' ? null : 'rating' }),
        },
        {
            id: 'time',
            name: 'Sort By Time',
            isActive: activeFilters.sortBy === 'time',
            onPress: () => onFilterChange({ sortBy: activeFilters.sortBy === 'time' ? null : 'time' }),
        },
        {
            id: 'cost_asc',
            name: 'Cost: Low to High',
            isActive: activeFilters.sortBy === 'cost_asc',
            onPress: () => onFilterChange({ sortBy: activeFilters.sortBy === 'cost_asc' ? null : 'cost_asc' }),
        },
        {
            id: 'cost_desc',
            name: 'Cost: High to Low',
            isActive: activeFilters.sortBy === 'cost_desc',
            onPress: () => onFilterChange({ sortBy: activeFilters.sortBy === 'cost_desc' ? null : 'cost_desc' }),
        },
    ]

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                {
                    filters.map((filter) => (
                        <Pressable
                            key={filter.id}
                            onPress={filter.onPress}
                            style={[
                                styles.filterButton,
                                filter.isActive && styles.activeFilterButton
                            ]}
                        >
                            <Text style={[
                                styles.filterText,
                                filter.isActive && styles.activeFilterText
                            ]}>
                                {filter.name}
                            </Text>
                            {/* Optional: Add icons based on filter type or state */}
                            {/* {filter.id === 'fastDelivery' && filter.isActive && 
                                <MaterialIcons name="timer" size={16} color="white" style={{marginLeft: 4}} />
                            } */}
                        </Pressable>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default FilterTypes

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        // backgroundColor: '#f8f8f8', // Optional background for the filter bar
    },
    scrollViewContent: {
        paddingHorizontal: 10, // Add padding so buttons don't touch edges
        alignItems: 'center',
    },
    filterButton: {
        marginHorizontal: 4,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D0D0D0",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: "center",
    },
    activeFilterButton: {
        backgroundColor: '#E52B50', // Active color
        borderColor: '#E52B50',
    },
    filterText: {
        fontSize: 12,
        color: '#4a4a4a',
    },
    activeFilterText: {
        color: 'white',
        fontWeight: '500',
    }
})