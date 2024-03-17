import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { trendingMovies } from "./movieData";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [shuffledTrendingMovies, setShuffledTrendingMovies] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [shuffledContinueWatchingMovies, setShuffledContinueWatchingMovies] =
    useState([]);

  const [genres] = useState([
    "Show All",
    "Action",
    "Thriller",
    "Horror",
    "Comedy",
    "Drama",
    "Family",
  ]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const navigateToMoviesScreen = (genre) => {
    navigation.navigate("Movies", { selectedGenre: genre });
  };

  const filterMoviesByCategory = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category === activeCategory ? "" : category);
  };

  useEffect(() => {
    const continueWatching = trendingMovies.filter((movie) => movie.progress);
    const trendingNow = trendingMovies.filter((movie) => !movie.progress);
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
            <View
              style={{ ...styles.progress, width: `${item.progress * 100}%` }}
            />
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
            source={require("./../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Featured Content */}
        <View style={styles.featuredContainer}>
          <Carousel
            data={shuffledTrendingMovies}
            renderItem={({ item }) =>
              renderMovieItem({ item, section: "featured" })
            }
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
            {genres.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  activeCategory === category && { backgroundColor: "#7B1818" },
                ]}
                onPress={() => navigateToMoviesScreen(category)}
              >
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
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
            keyExtractor={(item) => item.id.toString()}
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
            renderItem={({ item }) =>
              renderMovieItem({ item, section: "continueWatching" })
            }
            keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 200,
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
    alignItems: "center",
  },
  featuredItem: {
    marginRight: 10,
    alignItems: "center",
  },
  featuredItemImage: {
    width: 300,
    height: 180,
    borderRadius: 10,
  },
  featuredItemTitle: {
    color: "#FFF",
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoryTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  trendingContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
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
    color: "#FFF",
    marginTop: 5,
  },
  progressBar: {
    width: "100%",
    height: 5,
    backgroundColor: "#444",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 5,
  },
  progress: {
    height: "100%",
    backgroundColor: "#FFF",
  },
});

export default HomeScreen;
