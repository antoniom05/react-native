import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MoviesScreen = ({ navigation }) => {
  const [shuffledTrendingMovies, setShuffledTrendingMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);


  const trendingMovies = [
    { id: 1, title: 'Dune 2', imageUrl: require('./assets/dune2.webp'), progress: 0.6, rating: 4.3, genres: ['Action'] },
    { id: 2, title: 'Oppenheimer', imageUrl: require('./assets/openhaimer.jpg'), rating: 3.8, genres: ['Thriller', 'Drama'] },
    { id: 3, title: 'Barbie', imageUrl: require('./assets/barbie.jpg'), rating: 4.1, genres: ['Comedy', 'Family'] },
    { id: 4, title: 'Transformes', imageUrl: require('./assets/transformers.jpg'), rating: 3.9, genres: ['Action'] },
    { id: 5, title: 'Joker', imageUrl: require('./assets/joker.jpg'), rating: 4.7, genres: ['Thriller'] },
    { id: 6, title: 'Batman', imageUrl: require('./assets/batman.jpg'), rating: 4.2, genres: ['Action'] },
    { id: 7, title: 'BeeKeeper', imageUrl: require('./assets/beekeeper.jpg'), rating: 3.5, genres: ['Horror'] },
    { id: 8, title: 'Good Fellas', imageUrl: require('./assets/goodfellas.jpg'), progress: 0.7, rating: 4.4, genres: ['Thriller'] },
    { id: 9, title: 'Alien', imageUrl: require('./assets/alien.jpg'), progress: 0.9, rating: 4.0, genres: ['Horror'] },
    { id: 10, title: 'StarWars', imageUrl: require('./assets/starwars.jpeg'), progress: 0.4, rating: 4.6, genres: ['Action'] },
    { id: 11, title: 'Cars 1', imageUrl: require('./assets/cars1.jpeg'), progress: 0.1, rating: 3.5, genres: ['Comedy', 'Family', 'Family'] },
    { id: 12, title: 'Cars 2', imageUrl: require('./assets/cars2.jpg'), progress: 0.9, rating: 4.0, genres: ['Comedy', 'Family', 'Family'] },
    { id: 13, title: 'Cars 3', imageUrl: require('./assets/cars3.jpeg'), rating: 3.8, genres: ['Comedy', 'Family', 'Family'] },
    { id: 14, title: 'F&F 9', imageUrl: require('./assets/f9.jpg'), rating: 4.2, genres: ['Action'] },
    { id: 15, title: 'Avatar', imageUrl: require('./assets/avatar.jpg'), rating: 4.8, genres: ['Family'] },
    { id: 16, title: 'Ratatouille', imageUrl: require('./assets/ratatui.jpeg'), rating: 4.5, genres: ['Comedy', 'Family'] },
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
    setActiveCategory(category === activeCategory ? '' : category); // Toggle active category
  };

  const renderMovieItem = ({ item }) => {
    const genres = item.genres || []; 
    
    if (!selectedCategory || selectedCategory === 'Show All' || genres.includes(selectedCategory)) {
      return (
        <TouchableOpacity style={styles.movieItem} key={item.id}>
          <Image
            source={item.imageUrl}
            style={styles.movieItemImage}
            resizeMode="cover"
          />
          <View style={styles.movieInfo}>
        <Text style={styles.movieItemTitle}>{item.title}</Text>
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" style={{ marginRight: 5 }} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        )}
      </View>
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
            {['Show All', 'Action', 'Thriller', 'Horror', 'Comedy', 'Drama', 'Family'].map((category, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.categoryButton,
                  activeCategory === category && { backgroundColor: '#7B1818' } // Change color when active
                ]} 
                onPress={() => filterMoviesByCategory(category)}
              >
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
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
    height: 270, // Adjusted height
    borderRadius: 10,
  },
  movieInfo: {
    flexDirection: 'row', // Change from 'column' to 'row'
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  movieItemTitle: {
    color: '#FFF',
    marginTop: 5,
    flex: 1, // Added flex: 1 to allow title to take remaining space
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Added margin to separate rating from title
  },
  ratingText: {
    color: '#FFF',
    marginRight: 10,
  },
});

MoviesScreen.navigationOptions = {
  headerShown: false, // This hides the header title
};

export default MoviesScreen;
