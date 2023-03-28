import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cleanCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import instructions from "../data/instructions";
const CartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();

  const RenderItem = ({ item }) => {
    return (
      <View style={{
        backgroundColor: "white",
        borderRadius: 12,
        width: 60,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4
      }}>
        <Text style={{ fontSize: 11, fontWeight: "600" }}>₹ {item}</Text>
      </View>
    )
  }
  const partnerMessage = 'Thank your deliver partner by leaving them a tip 100% of the tip will go to your delivery partner.'
  return (
    <>
      <View
        style={{
          padding: 10,
          marginTop: 40,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Text style={{ fontSize: 13, fontWeight: "600", marginLeft: 13 }}>
          {route.params.name}
        </Text>
      </View>
      <ScrollView>
        {total > 0 ? (
          <>
            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 8,
                marginHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "500" }}>
                Ordering for Someone else ?{" "}
              </Text>
              <Text
                style={{ fontSize: 13, fontWeight: "700", color: "#FF4500" }}
              >
                Add Details
              </Text>
            </View>

            <View
              style={{
                marginTop: 13,
                marginHorizontal: 5,
                backgroundColor: "white",
                borderRadius: 12,
                padding: 14,
                marginLeft: 10,
                marginRight: 10,
                elevation: 4
              }}
            >
              {cart.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                  key={index}
                >
                  <Text style={{ width: 100, fontSize: 13, fontWeight: "600" }}>
                    {item.name}
                  </Text>

                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: "center",
                      borderColor: "#BEBEBE",
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item));
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "green",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "green",
                          paddingHorizontal: 8,
                          fontWeight: "600",
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item));
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: "green",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>

                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    ₹{item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                Tip Your Delivery Partner
              </Text>
              <View
                style={{
                  marginTop: 13,
                  marginHorizontal: 5,
                  backgroundColor: "white",
                  borderRadius: 12,
                  padding: 12,
                  elevation: 4,
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontSize: 11 }}>{partnerMessage}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                  {
                    [20, 30, 50, 60].map((item, i) => {
                      return <RenderItem item={item} key={i} />
                    })
                  }
                </View>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: "600" }}>
                Delivery Instructions
              </Text>
              <ScrollView
                horizontal
                style={{ marginTop: 10 }}
                showsHorizontalScrollIndicator={false}
              >
                {instructions.map((item, i) => (
                  <Pressable
                    key={i}
                    style={{
                      margin: 10,
                      borderRadius: 10,
                      padding: 10,
                      paddingVertical: 18,
                      backgroundColor: "white",
                      elevation: 4
                    }}
                  >
                    <View>
                      <FontAwesome5
                        name={item.iconName}
                        size={18}
                        color={"gray"}
                      />
                      <Text
                        style={{
                          width: 75,
                          fontSize: 10,
                          color: "#383838",
                          paddingTop: 10,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginVertical: 15,
                  elevation: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>
                    ₹{total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: "400", color: "gray" }}
                  >
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#FF4500",
                    }}
                  >
                    FREE
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 12, fontWeight: "500", color: "gray" }}
                  >
                    Free Delivery on Your order
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: "500", color: "gray" }}
                  >
                    Delivery Tip
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#FF4500",
                    }}
                  >
                    Add Tip
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 12, fontWeight: "500", color: "gray" }}
                  >
                    Taxes and Charges
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#FF4500",
                    }}
                  >
                    95
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {total + 95}
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 13, fontWeight: "600" }}
            >
              Your Cart is Empty!
            </Text>
          </View>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            bottom: 0,
            padding: 10,
            elevation: 4
          }}
        >
          <View>
            <Text style={{ fontSize: 13, fontWeight: "600" }}>₹{total + 95}</Text>
            <Text style={{ color: "#00A877", fontSize: 13 }}>View Detailed Bill</Text>
          </View>

          <Pressable
            onPress={() => {
              navigation.navigate("Loading");
              dispatch(cleanCart());
            }}
            style={{
              backgroundColor: "#00A877",
              padding: 14,
              width: 150,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold", textAlign: "center" }}>Proceed To pay</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
