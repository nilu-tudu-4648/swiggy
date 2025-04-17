import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { checkIsFavorite, toggleFavorite } from "../utils/firebaseUtils";

const MenuItem = ({ item }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const loadFavoriteStatus = async () => {
      const favoriteStatus = await checkIsFavorite(item.id);
      setIsFavorite(favoriteStatus);
    };
    
    loadFavoriteStatus();
  }, [item.id]);
  
  const handleToggleFavorite = async () => {
    try {
      const result = await toggleFavorite(item.id);
      
      if (result.success) {
        setIsFavorite(result.isFavorite);
        ToastAndroid.show(
          result.isFavorite ? "Added to favorites" : "Removed from favorites",
          ToastAndroid.SHORT
        );
      } else {
        ToastAndroid.show(
          result.message || "Error updating favorites",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      ToastAndroid.show("Failed to update favorites", ToastAndroid.SHORT);
    }
  };
  
  return (
    <View style={{ margin: 10 }}>
      <Pressable
        onPress={() =>
          navigation.navigate("Menu", {
            id: item.id,
            name:item.name,
            image:item.image,
            rating:item.rating,
            time:item.time,
            adress:item.adress,
            cost_for_two:item.cost_for_two,
            cuisines:item.cuisines,
            menu:item.menu,
          })
        }
        style={{ flexDirection: "row" }}
      >
        <View>
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{ aspectRatio: 5 / 6, height: 170 }}
            source={{ uri: item.image }}
          >
            <Pressable
              onPress={handleToggleFavorite}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 15,
                padding: 5,
              }}
            >
              <AntDesign
                name={isFavorite ? "heart" : "hearto"}
                size={24}
                color={isFavorite ? "#E52B50" : "white"}
              />
            </Pressable>
          </ImageBackground>
        </View>

        <View style={{ marginLeft: 10, overflow: 'scroll' }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.name}</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}
          >
            <MaterialIcons name="stars" size={20} color="green" />
            <Text style={{ marginLeft: 3, fontSize: 13, fontWeight: "400" }}>
              {item.rating}
            </Text>
            <Text style={{ marginLeft: 3 }}>•</Text>
            <Text style={{ marginLeft: 3, fontSize: 13, fontWeight: "400" }}>
              {item.time}mins
            </Text>
          </View>

          <Text style={{ fontSize: 12, color: "gray", marginTop: 6 }}>
            {item.adress}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#FFB6C1",
                width: 22,

                height: 22,
                borderRadius: 11,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                ₹
              </Text>
            </View>

            <Text
              style={{
                marginTop: 5,
                marginLeft: 4,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              {item.cost_for_two} for two
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <MaterialCommunityIcons name="bike-fast" size={24} color="black" />
            <Text style={{ marginLeft: 6, fontSize: 11 }}>FREE DELIVERY</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({});
