import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { trendingMovies } from "./movieData";
import MovieDetails from "./MovieDetails";
import { useRoute } from "@react-navigation/native";

const MoviesScreen = ({ navigation }) => {
  const [shuffledTrendingMovies, setShuffledTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const route = useRoute();
  const { selectedCategory } = route.params || {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params && route.params.selectedGenre) {
      setSelectedGenre(route.params.selectedGenre);
    }
  }, [route.params]);

  useEffect(() => {
    shuffleMovies(trendingMovies, setShuffledTrendingMovies);
  }, []);

  useEffect(() => {
    setSelectedGenre(selectedCategory);
  }, [selectedCategory]);

  const shuffleMovies = (movies, setShuffledMovies) => {
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    setShuffledMovies(shuffled);
  };

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const renderMovieItem = ({ item }) => {
    const genres = item.genres || [];

    if (
      (!selectedGenre ||
        selectedGenre === "Show All" ||
        genres.includes(selectedGenre)) &&
      (searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return (
        <TouchableOpacity
          style={styles.movieItem}
          key={item.id}
          onPress={() => handleMoviePress(item)}
        >
          <Image
            source={item.imageUrl}
            style={styles.movieItemImage}
            resizeMode="cover"
          />
          <View style={styles.movieInfo}>
            <Text style={styles.movieItemTitle}>{item.title}</Text>
            {item.rating && (
              <View style={styles.ratingContainer}>
                <Icon
                  name="star"
                  size={16}
                  color="#FFD700"
                  style={{ marginRight: 5 }}
                />
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
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("./../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={24}
            color="#fff"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search movies..."
            placeholderTextColor="#808080"
            style={styles.searchInput}
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoryTitle}>Popular Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              "Show All",
              "Action",
              "Thriller",
              "Horror",
              "Comedy",
              "Drama",
              "Family",
            ].map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  selectedGenre === category && { backgroundColor: "#7B1818" },
                ]}
                onPress={() => setSelectedGenre(category)}
              >
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.trendingContainer}>
          <Text style={styles.sectionTitle}>Popular Movies</Text>
          <View style={styles.moviesContainer}>
            {shuffledTrendingMovies.map((movie) =>
              renderMovieItem({ item: movie })
            )}
          </View>
        </View>
      </ScrollView>

      {selectedMovie && (
        <MovieDetails
          visible={true}
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "#fff",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 35,
    fontSize: 16,
    color: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 45,
    marginLeft: 1,
  },
  searchIcon: {
    marginRight: 15,
  },
  container: {
    marginTop: 5,
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
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
  moviesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  movieItem: {
    width: "48%",
    marginBottom: 20,
  },
  movieItemImage: {
    width: "100%",
    height: 270,
    borderRadius: 10,
  },
  movieInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  movieItemTitle: {
    color: "#FFF",
    marginTop: 5,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  ratingText: {
    color: "#FFF",
    marginRight: 10,
  },
});

export default MoviesScreen;
