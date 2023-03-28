import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import FoodTypes from "../components/FoodTypes";
import QuickFood from "../components/QuickFood";
import { Ionicons } from "@expo/vector-icons";
import hotels from "../data/hotels";
import MenuItem from "../components/MenuItem";
import FilterTypes from "../components/FilterTypes";

const HomeScreen = () => {
  const data = hotels;

  return (
    <ScrollView style={{ marginTop: 50 }}>
      {/* Search Bar  */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          margin: 10,
          padding: 10,
          borderColor: "#C0C0C0",
          borderRadius: 7,
        }}
      >
        <TextInput
          style={{ fontSize: 12 }}
          placeholder="Search for Restaurant item or more"
        />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>

      {/* Image slider Component */}
      <Carousel />

      {/* Food Item Types */}
      <FoodTypes />

      {/* Quick Food Component */}
      <QuickFood />

      {/* Filter buttons */}
      <FilterTypes />

      {data.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
