import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const MovieDetails = ({ movie, onClose }) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 200, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <TouchableOpacity onPress={onClose} style={styles.closeIconContainer}>
        <Icon name="close-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <Image source={movie.imageUrl} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{movie.title}</Text>
        {movie.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Rating: {movie.rating}</Text>
            <Icon
              name="star"
              size={16}
              color="#FFD700"
              style={{ marginLeft: 5 }}
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIconContainer: {
    position: "absolute",
    top: 20,
    right: 25,
    zIndex: 1,
  },
  image: {
    width: 100,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  details: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  ratingContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default MovieDetails;
