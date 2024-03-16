import React, { useEffect, useState, useLayoutEffect  } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const HomeScreen = ( {navigation }) => {
  const [shuffledTrendingMovies, setShuffledTrendingMovies] = useState([]);
  const [shuffledContinueWatchingMovies, setShuffledContinueWatchingMovies] = useState([]);

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
    shuffleMovies(trendingMovies, setShuffledContinueWatchingMovies);
  }, []);

  const shuffleMovies = (movies, setShuffledMovies) => {
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    setShuffledMovies(shuffled);
  };

  const renderMovieItem = ({ item, section }) => {
    if (section === "continueWatching") {
      return (
        <TouchableOpacity style={styles.movieItem}>
          <Image
            source={item.imageUrl}
            style={styles.movieItemImage}
            resizeMode="cover"
          />
          <View style={styles.progressBar}>
            <View style={{ ...styles.progress, width: `${item.progress * 100}%` }} />
          </View>
          <Text style={styles.movieItemTitle}>{item.title}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.movieItem}>
          <Image
            source={item.imageUrl}
            style={styles.movieItemImage}
            resizeMode="cover"
          />
          <Text style={styles.movieItemTitle}>{item.title}</Text>
        </TouchableOpacity>
      );
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