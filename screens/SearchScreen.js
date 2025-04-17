import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import MenuItem from "../components/MenuItem";
import { useNavigation, useRoute } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params; // Get data passed from HomeScreen

  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Focus the input on screen load
  const inputRef = React.useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Filter logic
  useEffect(() => {
    if (searchInput === "") {
      setFilteredData(data);
    } else {
      const lowercasedFilter = searchInput.toLowerCase();
      const filtered = data.filter((item) => {
        // Search in restaurant name or cuisines
        return (
          item.name.toLowerCase().includes(lowercasedFilter) ||
          item.cuisines.toLowerCase().includes(lowercasedFilter)
          // TODO: Add search in menu items if needed
        );
      });
      setFilteredData(filtered);
    }
  }, [searchInput, data]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Search Bar Header */}
      <View style={styles.headerContainer}>
         <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
             <Ionicons name="arrow-back" size={24} color="#E52B50" />
         </Pressable>
        <View style={styles.searchBarContainer}>
          <TextInput
            ref={inputRef} // Assign ref
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
            style={styles.searchInput}
            placeholder="Search for Restaurant, item or more"
            placeholderTextColor="#838383"
            autoFocus={true} // Automatically focus on mount
          />
          <AntDesign name="search1" size={20} color="#E52B50" />
        </View>
      </View>

      {/* Results Area */}
      <ScrollView style={styles.scrollView}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <MenuItem key={`${item.id}-search-${index}`} item={item} />
          ))
        ) : (
          <Text style={styles.noResultsText}>
            {searchInput ? 'No results found.' : 'Start typing to search...'}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row', // Align back button and search bar
    alignItems: 'center',
    borderBottomWidth: 1, // Add a subtle separator
    borderBottomColor: '#eee',
  },
   backButton: {
    padding: 5,
    marginRight: 5,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#f0f0f0',
    borderWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1, // Allow search bar to take remaining space
  },
  searchInput: {
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
    color: '#000',
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