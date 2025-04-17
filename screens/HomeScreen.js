import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import FoodTypes from "../components/FoodTypes";
import QuickFood from "../components/QuickFood";
import hotels from "../data/hotels";
import MenuItem from "../components/MenuItem";
import FilterTypes from "../components/FilterTypes";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const data = hotels;
  const [activeFilters, setActiveFilters] = useState({
    sortBy: null,
    fastDelivery: false,
  });

  const [displayData, setDisplayData] = useState(data);
  useEffect(() => {
    let result = [...data];

    if (activeFilters.fastDelivery) {
      result = result.filter(item => {
        const timeParts = (item.time || '').split('-').map(Number);
        return timeParts.length > 1 && timeParts[1] <= 30;
      });
    }

    if (activeFilters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (activeFilters.sortBy === 'time') {
      result.sort((a, b) => {
        const timeA = parseInt((a.time || '0').split('-')[0], 10);
        const timeB = parseInt((b.time || '0').split('-')[0], 10);
        return timeA - timeB;
      });
    } else if (activeFilters.sortBy === 'cost_asc') {
      result.sort((a, b) => a.cost_for_two - b.cost_for_two);
    } else if (activeFilters.sortBy === 'cost_desc') {
      result.sort((a, b) => b.cost_for_two - a.cost_for_two);
    }

    setDisplayData(result);
  }, [activeFilters, data]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Pressable 
          onPress={() => navigation.navigate('Search', { data: data })}
          style={styles.searchBarContainer}
        >
          <Text style={styles.searchPlaceholderText}>
            Search for Restaurant, item or more
          </Text>
          <AntDesign name="search1" size={20} color="#E52B50" />
        </Pressable>
      </View>

      <ScrollView style={styles.scrollView}>
        <Carousel />

        <FoodTypes />

        <QuickFood />

        <FilterTypes 
          activeFilters={activeFilters} 
          onFilterChange={handleFilterChange} 
        />

        {displayData.length > 0 ? (
          displayData.map((item, index) => (
            <MenuItem key={`${item.id}-${index}`} item={item} />
          ))
        ) : (
          <Text style={styles.noResultsText}>No restaurants found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#f0f0f0',
    borderWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  searchPlaceholderText: {
    fontSize: 14,
    color: '#838383',
    marginLeft: 8,
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: 'gray'
  },
});
