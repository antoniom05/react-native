import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const HomeScreen = () => {


  const trendingMovies = [
    { id: 1, title: 'Dune 2', imageUrl: require('./assets/dune2.webp') },
    { id: 2, title: 'Oppenheimer', imageUrl: require('./assets/openhaimer.jpg') },
    { id: 3, title: 'Barbie', imageUrl: require('./assets/barbie.jpg') },
    { id: 4, title: 'Transformes', imageUrl: require('./assets/transformers.jpg') },
    { id: 5, title: 'Joker', imageUrl: require('./assets/joker.jpg') },
    { id: 6, title: 'Batman', imageUrl: require('./assets/batman.jpg') },
    { id: 7, title: 'BeeKeeper', imageUrl: require('./assets/beekeeper.jpg') },
    { id: 8, title: 'Good Fellas', imageUrl: require('./assets/goodfellas.jpg') },
    { id: 9, title: 'Alien', imageUrl: require('./assets/alien.jpg') },
    { id: 10, title: 'StarWars', imageUrl: require('./assets/starwars.jpeg') },
  ];

  const renderMovieItem = ({ item }) => (

    
    <TouchableOpacity style={styles.movieItem}>
      <Image
        source={item.imageUrl}
        style={styles.movieItemImage}
        resizeMode="cover"
      />
      <Text style={styles.movieItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

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
          <Image
            source={require('./assets/kungfupanda.jpg')}
            style={styles.featuredImage}
            resizeMode="cover"
          />
          {/* Play Button */}
          <View style={styles.playButtonContainer}>
            <Text style={styles.playButtonText}>Play</Text>
          </View>
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
            data={trendingMovies}
            renderItem={renderMovieItem}
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
            data={trendingMovies}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.movieList}
          />
           <View style={styles.progressBar}>
        <View style={[styles.progress, { width: '100%' }]} />
      </View>
        </View>

        {/* More Sections as Needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 10,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  featuredContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
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
    backgroundColor: '#333',
    height: 5,
    width: 120, // Adjust width as needed
    borderRadius: 2,
    marginTop: 5,
  },
  progress: {
    backgroundColor: 'red',
    height: '100%',
    borderRadius: 2,
  },
});

export default HomeScreen;
