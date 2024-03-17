import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const avatar = require("./../assets/avatarIcon.jpg");

const DownloadedMoviesScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Avatar Image */}
          <Image source={avatar} style={styles.avatar} />
          <Text style={styles.accountName}>Margina Antonio</Text>
          <View style={styles.userProfile}>
            <Text style={styles.fieldLabel}>Plan: Premium</Text>
            <Icon
              name="star"
              size={16}
              color="#FFD700"
              style={{ marginLeft: 5 }}
            />
          </View>
        </View>
        {/* Additional Fields */}
        <View style={styles.additionalFields}>
          {/* Account Creation Date */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Account Created:</Text>
            <Text style={styles.fieldValue}>March 15, 2023</Text>
          </View>
          {/* Payment Method */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Payment Method:</Text>
            <Text style={styles.fieldValue}>Visa ****3201</Text>
          </View>
          {/* Billing Information */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Billing Information:</Text>
            <Text style={styles.fieldValue}>Mihai Viteazul 2/1, Moldova</Text>
          </View>

          {/* Download History */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Download History:</Text>
            <Text style={styles.fieldValue}>Downloaded Content</Text>
          </View>
          {/* Device Management */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Device Management:</Text>
            <Text style={styles.fieldValue}>Manage Devices</Text>
          </View>
          {/* Help & Support */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Help & Support:</Text>
            <Text style={styles.fieldValue}>Contact Support</Text>
          </View>
          {/* Privacy Settings */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Privacy Settings:</Text>
            <Text style={styles.fieldValue}>Manage Privacy</Text>
          </View>
          {/* Language Preferences */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Language Preferences:</Text>
            <Text style={styles.fieldValue}>English</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  userProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  accountName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  additionalFields: {
    marginBottom: 20,
  },
  field: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#28282B",
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 16,
    color: "#AAAAAA", // Lighter black color for field labels
  },
  fieldValue: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default DownloadedMoviesScreen;
