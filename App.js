import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Video from "react-native-video";
import MainContainer from "./content/MainContainer";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  const [showApp, setShowApp] = useState(false);

  const onEnd = () => {
    setShowApp(true);
  };

  return (
    <>
      {!showApp ? (
        <View style={styles.container}>
          <Video
            source={require("./assets/intro.mp4")}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            onEnd={onEnd}
          />
        </View>
      ) : (
        <MainContainer />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0, // Ensure no padding
    margin: 0, // Ensure no margin
    zIndex: 1, // Set zIndex to ensure the video is rendered above other components
  },
});

export default App;
