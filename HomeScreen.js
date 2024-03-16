import React, { useEffect, useState, useLayoutEffect  } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const [shuffledTrendingMovies, setShuffledTrendingMovies] = useState([]);
  const [shuffledContinueWatchingMovies, setShuffledContinueWatchingMovies] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const trendingMovies = [
    { id: 1, title: 'Dune 2', imageUrl: require('./assets/dune2.webp'),  genres: ['Action'] },
    { id: 2, title: 'Oppenheimer', imageUrl: require('./assets/openhaimer.jpg'), genres: ['Thriller', 'Drama'] },
    { id: 3, title: 'Barbie', imageUrl: require('./assets/barbie.jpg'), genres: ['Comedy', 'Family'] },
    { id: 4, title: 'Transformes', imageUrl: require('./assets/transformers.jpg'), progress: 0.8, genres: ['Action'] },
    { id: 5, title: 'Joker', imageUrl: require('./assets/joker.jpg'),  genres: ['Thriller'] },
    { id: 6, title: 'Batman', imageUrl: require('./assets/batman.jpg'), progress: 0.2, genres: ['Action'] },
    { id: 7, title: 'BeeKeeper', imageUrl: require('./assets/beekeeper.jpg'), genres: ['Horror'] },
    { id: 8, title: 'Good Fellas', imageUrl: require('./assets/goodfellas.jpg'), progress: 0.7, genres: ['Thriller'] },
    { id: 9, title: 'Alien', imageUrl: require('./assets/alien.jpg'), progress: 0.9, genres: ['Horror'] },
    { id: 10, title: 'StarWars', imageUrl: require('./assets/starwars.jpeg'), progress: 0.4, genres: ['Action'] },
    { id: 11, title: 'Cars 1', imageUrl: require('./assets/cars1.jpeg'),  genres: ['Comedy', 'Family', 'Family'] },
    { id: 12, title: 'Cars 2', imageUrl: require('./assets/cars2.jpg'), progress: 0.9, genres: ['Comedy', 'Family', 'Family'] },
    { id: 13, title: 'Cars 3', imageUrl: require('./assets/cars3.jpeg'), progress: 0.9, genres: ['Comedy', 'Family', 'Family'] },
    { id: 14, title: 'F&F 9', imageUrl: require('./assets/f9.jpg'), genres: ['Action'] },
    { id: 15, title: 'Avatar', imageUrl: require('./assets/avatar.jpg'), genres: ['Family'] },
    { id: 16, title: 'Ratatouille', imageUrl: require('./assets/ratatui.jpeg'), genres: ['Comedy', 'Family'] },
  ];

  useEffect(() => {
    const continueWatching = trendingMovies.filter(movie => movie.progress);
    const trendingNow = trendingMovies.filter(movie => !movie.progress);
    shuffleMovies(continueWatching, setShuffledContinueWatchingMovies);
    shuffleMovies(trendingNow, setShuffledTrendingMovies);
  }, []);

  const shuffleMovies = (movies, setShuffledMovies) => {
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    setShuffledMovies(shuffled);
  };

  const renderMovieItem = ({ item, section }) => {
    return (
      <TouchableOpacity style={styles.movieItem}>
        <Image
          source={item.imageUrl}
          style={styles.movieItemImage}
          resizeMode="cover"
        />
        {section === "continueWatching" && item.progress && (
          <View style={styles.progressBar}>
            <View style={{ ...styles.progress, width: `${item.progress * 100}%` }} />
          </View>
        )}
        <Text style={styles.movieItemTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Featured Content */}
        <View style={styles.featuredContainer}>
          <Carousel
            data={shuffledTrendingMovies}
            renderItem={({ item }) => renderMovieItem({ item, section: "featured" })}
            sliderWidth={400}
            itemWidth={120}
            loop={true}
            autoplay={true}
            autoplayInterval={3000}
            layout="default"
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoryTitle}>Popular Categories</Text>
          {/* Horizontal ScrollView for Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Category Buttons */}
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Action</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Thriller</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Horror</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Thriller</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Anime</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Comedy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>Detective</Text>
            </TouchableOpacity>
            {/* Add more categories as needed */}
          </ScrollView>
        </View>

        {/* Trending Now */}
        <View style={styles.trendingContainer}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          {/* Horizontal FlatList for Trending Movies */}
          <FlatList
            horizontal
            data={shuffledTrendingMovies}
            renderItem={({ item }) => renderMovieItem({ item })}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.movieList}
          />
        </View>

        {/* Continue Watching */}
        <View style={styles.continueWatchingContainer}>
          <Text style={styles.sectionTitle}>Continue Watching</Text>
          {/* List of Continue Watching items */}
          <FlatList
            horizontal
            data={shuffledContinueWatchingMovies}
            renderItem={({ item }) => renderMovieItem({ item, section: "continueWatching" })}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.movieList}
          />
        </View>

        {/* More Sections as Needed */}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 45,
    marginLeft: 1,
  },
  searchIcon: {
    marginRight: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  featuredContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  featuredItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  featuredItemImage: {
    width: 300,
    height: 180,
    borderRadius: 10,
  },
  featuredItemTitle: {
    color: '#FFF',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
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
  continueWatchingContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  movieList: {
    paddingHorizontal: 5,
  },
  movieItem: {
    marginRight: 10,
  },
  movieItemImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  movieItemTitle: {
    color: '#FFF',
    marginTop: 5,
  },
  progressBar: {
    width: '100%',
    height: 5,
    backgroundColor: '#444',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#FFF',
  },
});

HomeScreen.navigationOptions = {
    headerShown: false, // This hides the header title
  };

export default HomeScreen;