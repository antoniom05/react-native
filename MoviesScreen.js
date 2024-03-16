import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const MoviesScreen = ({ navigation }) => {
  const [shuffledTrendingMovies, setShuffledTrendingMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);


  const trendingMovies = [
    { id: 1, title: 'Dune 2', imageUrl: require('./assets/dune2.webp'), progress: 0.6, genre: 'Action' },
    { id: 2, title: 'Oppenheimer', imageUrl: require('./assets/openhaimer.jpg'), progress: 0.3, genre: 'Thriller' },
    { id: 3, title: 'Barbie', imageUrl: require('./assets/barbie.jpg'), progress: 0.1, genre: 'Comedy' },
    { id: 4, title: 'Transformes', imageUrl: require('./assets/transformers.jpg'), progress: 0.8, genre: 'Action' },
    { id: 5, title: 'Joker', imageUrl: require('./assets/joker.jpg'), progress: 0.5, genre: 'Thriller' },
    { id: 6, title: 'Batman', imageUrl: require('./assets/batman.jpg'), progress: 0.2, genre: 'Action' },
    { id: 7, title: 'BeeKeeper', imageUrl: require('./assets/beekeeper.jpg'), progress: 0.4, genre: 'Horror' },
    { id: 8, title: 'Good Fellas', imageUrl: require('./assets/goodfellas.jpg'), progress: 0.7, genre: 'Thriller' },
    { id: 9, title: 'Alien', imageUrl: require('./assets/alien.jpg'), progress: 0.9, genre: 'Horror' },
    { id: 10, title: 'StarWars', imageUrl: require('./assets/starwars.jpeg'), progress: 0.4, genre: 'Action' },
  ];

  useEffect(() => {
    shuffleMovies(trendingMovies, setShuffledTrendingMovies);
  }, []);

  const shuffleMovies = (movies, setShuffledMovies) => {
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    setShuffledMovies(shuffled);
  };

  const filterMoviesByCategory = (category) => {
    setSelectedCategory(category);
  };

  const renderMovieItem = ({ item }) => {
    if (!selectedCategory || selectedCategory === 'Show All' || item.genre === selectedCategory) {
      return (
        <TouchableOpacity style={styles.movieItem} key={item.id}>
          <Image
            source={item.imageUrl}
            style={styles.movieItemImage}
            resizeMode="cover"
          />
          <Text style={styles.movieItemTitle}>{item.title}</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoryTitle}>Popular Categories</Text>
          {/* Horizontal ScrollView for Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Category Buttons */}
            <TouchableOpacity style={styles.categoryButton} onPress={() => filterMoviesByCategory('Show All')}>
              <Text style={styles.categoryButtonText}>Show All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton} onPress={() => filterMoviesByCategory('Action')}>
              <Text style={styles.categoryButtonText}>Action</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton} onPress={() => filterMoviesByCategory('Thriller')}>
              <Text style={styles.categoryButtonText}>Thriller</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton} onPress={() => filterMoviesByCategory('Horror')}>
              <Text style={styles.categoryButtonText}>Horror</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton} onPress={() => filterMoviesByCategory('Comedy')}>
              <Text style={styles.categoryButtonText}>Comedy</Text>
            </TouchableOpacity>
            {/* Add more categories as needed */}
          </ScrollView>
        </View>

        {/* Trending Now */}
        <View style={styles.trendingContainer}>
          <Text style={styles.sectionTitle}>Popular Movies</Text>
          {/* Render movies */}
          <View style={styles.moviesContainer}>
            {shuffledTrendingMovies.map((movie) => (
              renderMovieItem({ item: movie })
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 5,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 35,
    padding: '5%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoryTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  trendingContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  movieItem: {
    width: '48%', // Adjust according to your layout
    marginBottom: 20,
  },
  movieItemImage: {
    width: '100%',
    height: 220, // Adjusted height
    borderRadius: 10,
  },
  movieItemTitle: {
    color: '#FFF',
    marginTop: 5,
    padding: 5,
  },
});

MoviesScreen.navigationOptions = {
  headerShown: false, // This hides the header title
};

export default MoviesScreen;
