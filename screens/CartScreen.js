import { StyleSheet, Text, View, ScrollView, Pressable, Platform } from "react-native";
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

// Helper function for shadows
const generateShadow = (elevation) => {
  if (Platform.OS === 'android') {
    return { elevation };
  } else {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.3,
      shadowRadius: elevation * 0.8,
    };
  }
};

const CartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();

  const RenderItem = ({ item, onPress, isSelected }) => {
    return (
      <Pressable onPress={onPress} style={[styles.tipItemContainer, isSelected && styles.tipItemSelected, generateShadow(4)]}>
        <Text style={[styles.tipItemText, isSelected && styles.tipItemSelectedText]}>₹ {item}</Text>
      </Pressable>
    );
  };

  const [selectedTip, setSelectedTip] = React.useState(null);
  const [selectedInstruction, setSelectedInstruction] = React.useState(null); // Example state for instruction

  const tipAmounts = [20, 30, 50, 60]; // Keep tip amounts accessible

  const handleTipSelection = (tip) => {
    setSelectedTip(selectedTip === tip ? null : tip); // Allow deselecting
  };

  const handleInstructionSelection = (instruction) => {
    setSelectedInstruction(selectedInstruction?.id === instruction.id ? null : instruction); // Allow deselecting
  }

  // Calculate dynamic total including selected tip
  const taxesAndCharges = 95; // Keep as variable
  const deliveryFee = 0; // Assuming FREE for now
  const finalTotal = total + deliveryFee + (selectedTip || 0) + taxesAndCharges;

  const partnerMessage = 'Thank your delivery partner by leaving them a tip. 100% of the tip will go to your delivery partner.'

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Text style={styles.headerTitle}>
          {route.params.name}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {total > 0 ? (
          <>
            <View style={[styles.card, styles.orderingCard]}>
              <Text style={styles.cardText}>
                Ordering for Someone else ?{" "}
              </Text>
              <Text style={styles.cardLinkText}>
                Add Details
              </Text>
            </View>

            <View style={[styles.card, styles.cartItemsCard]}>
              {cart.map((item, index) => (
                <View style={styles.cartItem} key={index}>
                  <Text style={styles.cartItemName}>
                    {item.name}
                  </Text>

                  <Pressable style={styles.quantityControl}>
                    <Pressable
                      onPress={() => dispatch(decrementQuantity(item))}
                      hitSlop={10} // Increase touch area
                    >
                      <Text style={[styles.quantityButtonText, styles.quantityDecrement]}>-</Text>
                    </Pressable>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Pressable
                      onPress={() => dispatch(incrementQuantity(item))}
                       hitSlop={10} // Increase touch area
                    >
                      <Text style={[styles.quantityButtonText, styles.quantityIncrement]}>+</Text>
                    </Pressable>
                  </Pressable>

                  <Text style={styles.cartItemPrice}>
                    ₹{item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                Tip Your Delivery Partner
              </Text>
              <View style={[styles.card, styles.tipCard]}>
                <Text style={styles.tipMessage}>{partnerMessage}</Text>
                <View style={styles.tipOptionsContainer}>
                  {tipAmounts.map((item, i) => (
                    <RenderItem
                       item={item}
                       key={i}
                       onPress={() => handleTipSelection(item)}
                       isSelected={selectedTip === item}
                    />
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Delivery Instructions</Text>
                <ScrollView
                    horizontal
                    style={styles.instructionsScrollView}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.instructionsContentContainer}
                >
                    {instructions.map((item, i) => (
                        <Pressable
                            key={i}
                            onPress={() => handleInstructionSelection(item)}
                            style={[
                                styles.instructionItem,
                                generateShadow(4),
                                selectedInstruction?.id === item.id && styles.instructionItemSelected // Add selected style
                            ]}
                        >
                            <View style={styles.instructionContent}>
                                <FontAwesome5
                                    name={item.iconName}
                                    size={18}
                                    color={selectedInstruction?.id === item.id ? "#00A877" : "gray"}
                                />
                                <Text
                                    style={[
                                        styles.instructionText,
                                        selectedInstruction?.id === item.id && styles.instructionTextSelected
                                    ]}
                                >
                                    {item.name}
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                Billing Details
              </Text>
              <View style={[styles.card, styles.billingCard]}>
                <View style={styles.billingRow}>
                  <Text style={styles.billingLabel}>Item Total</Text>
                  <Text style={styles.billingValue}>₹{total}</Text>
                </View>

                <View style={styles.billingRow}>
                  <Text style={styles.billingLabel}>Delivery Fee | 1.2KM</Text>
                  <Text style={[styles.billingValue, styles.billingHighlight]}>FREE</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                   <Text style={styles.billingSubText}>Free Delivery on Your order</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.billingRow}>
                  <Text style={styles.billingLabel}>Delivery Tip</Text>
                  {selectedTip ? (
                    <Text style={styles.billingValue}>₹{selectedTip}</Text>
                  ) : (
                    <Text style={[styles.billingValue, styles.billingHighlight]}>Add Tip</Text>
                  )}
                </View>

                <View style={styles.billingRow}>
                  <Text style={styles.billingLabel}>Taxes and Charges</Text>
                  <Text style={[styles.billingValue, styles.billingHighlight]}>₹{taxesAndCharges}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.billingRow}>
                  <Text style={styles.billingLabelBold}>To Pay</Text>
                  <Text style={styles.billingValueBold}>₹{finalTotal}</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>
              Your Cart is Empty!
            </Text>
          </View>
        )}
      </ScrollView>

      {total > 0 && (
        <View style={[styles.bottomBar, generateShadow(4)]}>
          <View style={styles.bottomBarContent}>
            <Text style={styles.bottomBarTotal}>₹{finalTotal}</Text>
            <Text style={styles.bottomBarDetails}>View Detailed Bill</Text>
          </View>

          <Pressable
            onPress={() => {
              const orderDetails = {
                  cart,
                  total,
                  deliveryFee,
                  tip: selectedTip,
                  taxesAndCharges,
                  finalTotal,
                  deliveryInstruction: selectedInstruction,
              };
              console.log("Proceeding to pay with details:", orderDetails);
              dispatch(cleanCart());
              navigation.navigate("Loading", { orderDetails: orderDetails });
            }}
            style={styles.payButton}
          >
            <Text style={styles.payButtonText}>Proceed To pay</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Example background color
    paddingTop: Platform.OS === 'android' ? 40 : 50, // Adjust top padding for status bar
  },
  header: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#f8f8f8', // Match container or set desired header bg
  },
  headerTitle: {
    fontSize: 16, // Slightly larger title
    fontWeight: "600",
    marginLeft: 15, // Increased margin
  },
  scrollView: {
    flex: 1, // Takes available space
  },
  scrollViewContent: {
    paddingBottom: 20, // Add padding at the bottom of scroll content
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 15, // Spacing between cards
    padding: 15,
    ...generateShadow(4), // Apply shadow
  },
  orderingCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: 13,
    fontWeight: "500",
  },
  cardLinkText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF4500",
  },
  cartItemsCard: {
     paddingVertical: 5, // Adjust padding
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12, // Increased spacing
  },
  cartItemName: {
    flex: 1, // Allow name to take space
    fontSize: 14, // Slightly larger
    fontWeight: "600",
    marginRight: 10, // Add margin
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#BEBEBE",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 5, // Reduced horizontal padding
    paddingVertical: 3,   // Reduced vertical padding
  },
  quantityButtonText: {
    fontSize: 18, // Adjusted size
    color: "green",
    fontWeight: "600",
    paddingHorizontal: 8, // Consistent padding
  },
  quantityDecrement: {
     fontSize: 22, // Make minus slightly bigger for easier tap
     paddingBottom: 2, // Vertical alignment tweak
  },
  quantityIncrement: {
     fontSize: 18,
  },
  quantityText: {
    fontSize: 14, // Adjusted size
    color: "green",
    fontWeight: "600",
    paddingHorizontal: 10, // Increased padding for number
    minWidth: 25, // Ensure minimum width for number
    textAlign: 'center',
  },
  cartItemPrice: {
    fontSize: 14, // Slightly larger
    fontWeight: "bold",
    minWidth: 60, // Ensure minimum width
    textAlign: 'right', // Align price right
  },
  sectionContainer: {
    paddingHorizontal: 10, // Consistent horizontal padding
    marginBottom: 15, // Spacing between sections
  },
  sectionTitle: {
    fontSize: 14, // Consistent title size
    fontWeight: "600",
    marginBottom: 10, // Space below title
  },
  tipCard: {
     // Inherits base card style
     padding: 12,
  },
  tipMessage: {
     fontSize: 12, // Slightly larger
     marginBottom: 10, // Space below message
     color: '#555', // Softer color
  },
  tipOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute evenly
    marginVertical: 5,
  },
  tipItemContainer: {
    backgroundColor: "white",
    borderRadius: 8, // Slightly less rounded
    paddingHorizontal: 15, // More padding
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd', // Subtle border
  },
   tipItemSelected: {
    backgroundColor: '#E0F2F1', // Light green background when selected
    borderColor: '#00A877', // Green border when selected
  },
  tipItemText: {
    fontSize: 12, // Slightly larger
    fontWeight: "600",
  },
  tipItemSelectedText: {
      color: '#00A877', // Green text when selected
      fontWeight: '700',
  },
  instructionsScrollView: {
    marginTop: 5, // Reduced margin
  },
  instructionsContentContainer: {
     paddingHorizontal: 5, // Padding for the scroll content itself
  },
  instructionItem: {
    marginRight: 10, // Spacing between items
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    minWidth: 90, // Ensure minimum width
    alignItems: 'center', // Center content
    borderWidth: 1,
    borderColor: 'transparent', // For selection state change
  },
  instructionItemSelected: {
      borderColor: '#00A877', // Highlight border when selected
      backgroundColor: '#E0F2F1', // Light green background
  },
  instructionContent: {
      alignItems: 'center',
  },
  instructionText: {
    width: 75,
    fontSize: 11, // Slightly larger
    color: "#383838",
    paddingTop: 8, // Reduced padding
    textAlign: 'center', // Center text
  },
   instructionTextSelected: {
      color: '#00A877',
      fontWeight: '600',
  },
  billingCard: {
    padding: 15, // Increase padding
  },
  billingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6, // Adjusted spacing
  },
  billingLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: "gray",
  },
  billingSubText: {
     fontSize: 12,
     fontWeight: "500",
     color: "gray",
     marginLeft: 0, // Align with labels
     marginTop: -4, // Adjust spacing
     marginBottom: 4,
  },
  billingValue: {
    fontSize: 12,
    fontWeight: "400",
  },
  billingHighlight: {
    color: "#FF4500",
    fontWeight: "500", // Make highlight slightly bolder
  },
  divider: {
    borderColor: "#E0E0E0", // Lighter divider
    height: 1,
    borderWidth: 0.5,
    marginVertical: 8, // Consistent spacing
  },
  billingLabelBold: {
    fontSize: 13, // Slightly larger
    fontWeight: "bold",
  },
  billingValueBold: {
    fontSize: 14, // Slightly larger
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 16, // Larger text
    fontWeight: "600",
    color: 'gray', // Softer color
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1, // Add a top border
    borderTopColor: '#eee', // Light border color
    // Shadows applied via generateShadow in the component
  },
   bottomBarContent: {
     flex: 1, // Take available space
     marginRight: 10, // Space before button
  },
  bottomBarTotal: {
    fontSize: 16, // Larger total
    fontWeight: "700", // Bolder total
  },
  bottomBarDetails: {
    color: "#00A877",
    fontSize: 13,
    fontWeight: '500', // Slightly bolder
  },
  payButton: {
    backgroundColor: "#00A877",
    paddingVertical: 14,
    paddingHorizontal: 20, // Adjust padding
    borderRadius: 8, // Consistent rounding
    minWidth: 150, // Ensure minimum width
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: "white",
    fontSize: 14, // Slightly larger
    fontWeight: "bold",
    textAlign: "center",
  },
});
