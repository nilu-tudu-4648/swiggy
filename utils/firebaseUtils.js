import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Get current user ID
export const getCurrentUserId = () => {
  const currentUser = auth().currentUser;
  return currentUser ? currentUser.uid : null;
};

// Toggle like status for a restaurant
export const toggleFavorite = async (restaurantId) => {
  const userId = getCurrentUserId();
  
  if (!userId) {
    console.log('User not authenticated');
    return { success: false, message: 'User not authenticated' };
  }
  
  const userFavoritesRef = firestore()
    .collection('userFavorites')
    .doc(userId);
    
  try {
    // Get current favorites
    const doc = await userFavoritesRef.get();
    
    if (doc.exists) {
      // Check if restaurant is already favorited
      const data = doc.data();
      const favorites = data.favorites || [];
      
      if (favorites.includes(restaurantId)) {
        // Remove from favorites
        await userFavoritesRef.update({
          favorites: firestore.FieldValue.arrayRemove(restaurantId)
        });
        return { success: true, isFavorite: false };
      } else {
        // Add to favorites
        await userFavoritesRef.update({
          favorites: firestore.FieldValue.arrayUnion(restaurantId)
        });
        return { success: true, isFavorite: true };
      }
    } else {
      // Create new favorites document
      await userFavoritesRef.set({
        favorites: [restaurantId]
      });
      return { success: true, isFavorite: true };
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return { success: false, message: error.message };
  }
};

// Check if restaurant is favorited
export const checkIsFavorite = async (restaurantId) => {
  const userId = getCurrentUserId();
  
  if (!userId) {
    return false;
  }
  
  try {
    const doc = await firestore()
      .collection('userFavorites')
      .doc(userId)
      .get();
      
    if (doc.exists) {
      const data = doc.data();
      return data.favorites && data.favorites.includes(restaurantId);
    }
    
    return false;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

// Get all favorite restaurants
export const getFavoriteRestaurants = async (allRestaurants) => {
  const userId = getCurrentUserId();
  
  if (!userId) {
    return [];
  }
  
  try {
    const doc = await firestore()
      .collection('userFavorites')
      .doc(userId)
      .get();
      
    if (doc.exists) {
      const data = doc.data();
      const favorites = data.favorites || [];
      
      // Filter restaurants to only those in favorites
      return allRestaurants.filter(restaurant => favorites.includes(restaurant.id));
    }
    
    return [];
  } catch (error) {
    console.error('Error getting favorite restaurants:', error);
    return [];
  }
}; 