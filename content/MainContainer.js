import * as React from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./HomeScreen";
import MoviesScreen from "./MoviesScreen";
import DownloadedMoviesScreen from "./DownloadedMoviesScreen";

// Screen names
const homeName = "Home";
const detailsName = "Movies";
const settingsName = "Account";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === detailsName) {
              iconName = focused ? "play" : "play-outline";
            } else if (rn === settingsName) {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "red",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 1, fontSize: 10 },
          style: { backgroundColor: "black", padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={detailsName} component={MoviesScreen} />
        <Tab.Screen name={settingsName} component={DownloadedMoviesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
