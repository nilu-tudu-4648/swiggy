import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, FONTS } from '../components/constants/theme'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WishlistItem = ({ item, onRemove, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemRestaurant} numberOfLines={1}>{item.restaurant}</Text>
        <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <MaterialCommunityIcons name="close" size={22} color={COLORS.darkgray} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const MyWishlist = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [wishlistItems, setWishlistItems] = useState([])

  // Sample data - in a real app, you would fetch this from storage or API
  const dummyWishlistItems = [
    {
      id: '1',
      name: 'Butter Chicken',
      restaurant: 'Punjab Grill',
      price: 350,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      restaurant: 'Domino\'s Pizza',
      price: 299,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '3',
      name: 'Veg Biryani',
      restaurant: 'Paradise',
      price: 250,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
  ]

  useEffect(() => {
    // Simulate loading data from storage or API
    const fetchWishlist = async () => {
      setLoading(true)
      try {
        // In a real app, you would get this from AsyncStorage or an API
        // const savedWishlist = await AsyncStorage.getItem('wishlist')
        // setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : [])
        
        // Using dummy data for demonstration
        setTimeout(() => {
          setWishlistItems(dummyWishlistItems)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.log('Error fetching wishlist:', error.message)
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  const handleRemoveItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
    // In a real app, you would also update the storage
    // AsyncStorage.setItem('wishlist', JSON.stringify(wishlistItems.filter(item => item.id !== id)))
  }

  const handleItemPress = (item) => {
    // Navigate to product details
    // navigation.navigate('ProductDetails', { productId: item.id })
    console.log('Navigate to product details for:', item.name)
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={{ width: 24 }} />
      </View>

      {wishlistItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="heart-outline" size={80} color={COLORS.lightgray1} />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtext}>
            Save your favorite items by tapping the heart icon on any product
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.browseButtonText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WishlistItem
              item={item}
              onRemove={() => handleRemoveItem(item.id)}
              onPress={() => handleItemPress(item)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

export default MyWishlist

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightgray,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightgray,
    elevation: 2,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  listContainer: {
    padding: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.lightgray,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  itemRestaurant: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  removeButton: {
    padding: 5,
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.darkgray,
    textAlign: 'center',
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  browseButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
}) 