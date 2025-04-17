import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  Platform,
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
      setMenu(route.params.menu || []);
    };

    fetchMenu();
  }, [route.params.menu]);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
            <View style={styles.searchContainer}>
              <AntDesign name="search1" size={22} color="black" />
              <Text style={styles.searchText}>Search</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoCardTopRow}>
              <Text style={styles.restaurantName}>{route.params.name}</Text>
              <View style={styles.infoCardIcons}>
                <AntDesign
                  style={styles.shareIcon}
                  name="sharealt"
                  size={20}
                  color="black"
                />
                <AntDesign name="hearto" size={20} color="black" />
              </View>
            </View>

            <View style={styles.ratingTimeContainer}>
              <MaterialIcons name="stars" size={20} color="green" />
              <Text style={styles.ratingText}>{route.params.rating}</Text>
              <Text style={styles.dotSeparator}>•</Text>
              <Text style={styles.timeText}>{route.params.time}mins</Text>
            </View>

            <Text style={styles.cuisinesText}>{route.params.cuisines}</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Outlet</Text>
              <Text style={styles.detailValue}>{route.params.adress}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>22 mins</Text>
              <Text style={styles.detailValue}>Home</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.deliveryInfoRow}>
              <FontAwesome5 name="bicycle" size={20} color="orange" />
              <Text style={styles.deliveryText}>0-3 Kms |</Text>
              <Text style={styles.deliveryFeeText}>
                35 Delivery Fee will Apply
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.menuTitle}>MENU</Text>
        <View style={styles.menuSeparator} />

        {menu.map((item) => (
          <FoodItem item={item} key={item.id} />
        ))}
      </ScrollView>

      <Pressable onPress={toggleModal} style={styles.menuFab}>
        <MaterialIcons
          style={styles.menuFabIcon}
          name="menu-book"
          size={24}
          color="white"
        />
        <Text style={styles.menuFabText}>MENU</Text>
      </Pressable>

      <Modal isVisible={modalVisible} onBackdropPress={toggleModal} style={styles.modal}>
        <View style={styles.modalContent}>
          <ScrollView>
            {menu.map((item) => (
              <View key={item.id} style={styles.modalItem}>
                <Text style={styles.modalItemName}>{item.name}</Text>
                <Text style={styles.modalItemCount}>
                  {item.items?.length || 0}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.modalLogoContainer}>
            <Image
              style={styles.modalLogo}
              source={{
                uri: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza",
              }}
            />
          </View>
        </View>
      </Modal>

      {total === 0 ? null : (
        <Pressable
          style={styles.cartBar}
          onPress={() =>
            navigation.navigate("Cart", {
              name: route.params.name,
            })
          }
        >
          <View style={styles.cartBarContent}>
            <View>
              <Text style={styles.cartBarInfoText}>
                {cart.length} {cart.length === 1 ? 'item' : 'items'} | ₹{total}
              </Text>
              <Text style={styles.cartBarSubText}>
                Extra Charges may Apply!
              </Text>
            </View>

            <Text style={styles.cartBarViewText}>View Cart</Text>
          </View>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: Platform.OS === 'android' ? 0 : 50,
    flex: 1,
  },
  headerContainer: {
    height: 300,
    backgroundColor: "#B0C4DE",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 10,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 7,
  },
  infoCard: {
    backgroundColor: "white",
    height: 210,
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
    elevation:7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  infoCardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoCardIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  shareIcon: {
    marginHorizontal: 14,
  },
  ratingTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  ratingText: {
    marginLeft: 3,
    fontSize: 14,
    fontWeight: "500",
  },
  dotSeparator: {
    marginLeft: 5,
    marginRight: 5,
    fontWeight: 'bold',
    color: 'gray',
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  cuisinesText: {
    marginTop: 8,
    color: "gray",
    fontSize: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: "bold",
    width: 60,
  },
  detailValue: {
    marginLeft: 15,
    fontSize: 13,
    color: 'gray',
  },
  separator: {
    borderColor: "#E0E0E0",
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 12,
  },
  deliveryInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  deliveryText: {
    marginLeft: 10,
    color: "gray",
    fontSize: 13,
  },
  deliveryFeeText: {
    marginLeft: 7,
    color: "gray",
    fontSize: 13,
  },
  menuTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    letterSpacing: 1,
  },
  menuSeparator: {
    borderColor: "#E0E0E0",
    borderWidth: StyleSheet.hairlineWidth,
    height: 1,
    marginTop: 12,
    marginHorizontal: 20,
  },
  menuFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    position: "absolute",
    bottom: 85,
    right: 25,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  menuFabIcon: {
  },
  menuFabText: {
    color: "white",
    fontWeight: "500",
    fontSize: 10,
    marginTop: 2,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    height: 350,
    width: '100%',
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalItemName: {
    color: "#E0E0E0",
    fontWeight: "600",
    fontSize: 16,
  },
  modalItemCount: {
    color: "#A0A0A0",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 10,
  },
  modalLogoContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderTopColor: '#333',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  modalLogo: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
  cartBar: {
    backgroundColor: "#00A877",
    width: "95%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    position: "absolute",
    borderRadius: 10,
    alignSelf: "center",
    bottom: Platform.OS === 'ios' ? 20 : 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  cartBarContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartBarInfoText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  cartBarSubText: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 3,
    color: "white",
  },
  cartBarViewText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});

export default MenuScreen;
