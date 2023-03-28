import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import FoodItem from "../components/FoodItem";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";

const MenuScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  // console.log(total);
  // console.log(cart);
  const route = useRoute();
  const navigation = useNavigation();
  const [menu, setMenu] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const fetchMenu = () => {
      setMenu(route.params.menu);
    };

    fetchMenu();
  }, []);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        <View
          style={{
            height: 300,
            backgroundColor: "#B0C4DE",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign name="search1" size={22} color="black" />
              <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 7 }}>
                Search
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              height: 210,
              marginHorizontal: 10,
              marginVertical: 5,
              padding: 12,
              borderRadius: 15,
              elevation:7,
              justifyContent:'center'
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {route.params.name}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign
                  style={{ marginHorizontal: 14 }}
                  name="sharealt"
                  size={20}
                  color="black"
                />
                <AntDesign name="hearto" size={20} color="black" />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 7,
              }}
            >
              <MaterialIcons name="stars" size={20} color="green" />
              <Text style={{ marginLeft: 3, fontSize: 12, fontWeight: "400" }}>
                {route.params.rating}
              </Text>
              <Text style={{ marginLeft: 3 }}>•</Text>
              <Text style={{ marginLeft: 3, fontSize: 12, fontWeight: "400" }}>
                {route.params.time}mins
              </Text>
            </View>

            <Text style={{ marginTop: 8, color: "gray", fontSize: 12 }}>
              {route.params.cuisines}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "bold" }}>Outlet</Text>
              <Text
                style={{ marginLeft: 15, fontSize: 11 }}
              >
                {route.params.adress}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "bold" }}>22 mins</Text>
              <Text
                style={{ marginLeft: 15, fontSize: 11 }}
              >
                Home
              </Text>
            </View>

            <Text
              style={{
                borderColor: "gray",
                borderWidth: 0.25,
                height: .1,
                marginTop: 12,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <FontAwesome5 name="bicycle" size={20} color="orange" />
              <Text style={{ marginLeft: 7, color: "gray", fontSize: 11 }}>
                0-3 Kms |
              </Text>
              <Text style={{ marginLeft: 7, color: "gray", fontSize: 11 }}>
                35 Delivery Fee will Apply
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "500",
            marginTop: 10,
          }}
        >
          MENU
        </Text>
        <Text
          style={{
            borderColor: "gray",
            borderWidth: 0.6,
            height: 1,
            marginTop: 12,
          }}
        />

        {route.params?.menu.map((item, index) => (
          <FoodItem item={item} key={index} />
        ))}
      </ScrollView>

      <Pressable
        onPress={toggleModal}
        style={{
          width: 70,
          height: 70,
          borderRadius: 70 / 2,
          justifyContent: "center",
          backgroundColor: "black",
          marginLeft: "auto",
          position: "absolute",
          bottom: 70,
          right: 25,
          alignContent: "center",
        }}
      >
        <MaterialIcons
          style={{ textAlign: "center" }}
          name="menu-book"
          size={20}
          color="white"
        />
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "500", fontSize: 8 }}
        >
          MENU
        </Text>
      </Pressable>

      <Modal isVisible={modalVisible} onBackdropPress={toggleModal}>
        <View
          style={{
            height: 290,
            width: 280,
            backgroundColor: "black",
            position: "absolute",
            bottom: 35,
            right: 3,
            borderRadius: 15,
            overflow: 'hidden'
          }}
        >
          <ScrollView>
            {menu.map((item, i) => (
              <View
                style={{
                  padding: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                key={i}
              >
                <Text
                  style={{ color: "#D0D0D0", fontWeight: "600", fontSize: 13 }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{ color: "#D0D0D0", fontWeight: "600", fontSize: 13 }}
                >
                  {item.items.length}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: 120, height: 70, resizeMode: "contain" }}
              source={{
                uri: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza",
              }}
            />
          </View>
        </View>
      </Modal>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#00A877",
            width: "95%",
            padding: 10,
            marginBottom: 5,
            position: "absolute",
            borderRadius: 14,
            alignSelf: 'center',
            bottom: 0,
            elevation: 6
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 11, fontWeight: "bold", color: "white" }}
              >
                {cart.length} items | {total}
              </Text>
              <Text
                style={{
                  fontSize: 8,
                  fontWeight: "500",
                  marginTop: 3,
                  color: "white",
                }}
              >
                Extra Charges may Apply!
              </Text>
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate("Cart", {
                  name: route.params.name,
                })
              }
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>
                View Cart
              </Text>
            </Pressable>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});
