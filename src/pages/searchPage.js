import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SearchPage = ({ navigation }) => {
  // State variables to hold the search query and the search results
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Function to handle the search logic
  const handleSearch = async (text) => {
    setQuery(text); // Update the query state with the search input

    // If the search query is empty, clear the results
    if (text.trim().length === 0) {
      setResults([]); // Clear results if the search query is empty
      return;
    }

    try {
      // Fetch search results from the backend API using the query text
      const response = await axios.get(`http://10.0.2.2:3000/api/games/search`, {
        params: { query: text }, // Pass query as a parameter
      });
      setResults(response.data.games); // Set the search results in the state
    } catch (error) {
      console.error('Error fetching search results:', error); // Log errors if the request fails
    }
  };

  // Function to render each search result as a clickable item
  const renderResultItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem} 
      onPress={() => navigation.navigate('GameDetail', { game: item })}
    >
      <Text style={styles.resultText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Return container for search bar
  return (
    <View style={styles.container}> 
      <TextInput
        style={styles.searchBar} 
        placeholder="Type game name..." 
        placeholderTextColor="#aaa" 
        value={query} 
        onChangeText={handleSearch} 
      />
      {/* FlatList to display the search results */}
      {/* Extract a unique key for each item  and use*/ }
      <FlatList
        data={results} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderResultItem} 
        contentContainerStyle={styles.resultsContainer} 
        ListEmptyComponent={
          query.length > 0 ? <Text style={styles.noResultsText}>No results found</Text> : null 
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  resultsContainer: {
    marginTop: 16,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultText: {
    fontSize: 16,
    color: 'white',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#888',
  },
});

export default SearchPage;
