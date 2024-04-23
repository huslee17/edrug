import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const profile = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <Text style={styles.title}>Welcome to My App</Text>
      <Text style={styles.subtitle}>Explore and enjoy!</Text>

      <View style={styles.buttonContainer}>
        {/* Button 1 */}
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("./img/drugs.png")}
            style={styles.buttonImage}
          />
          <Text>Home</Text>
        </TouchableOpacity>

        {/* Button 2 */}
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("./img/drugs.png")}
            style={styles.buttonImage}
          />
          <Text>Settings</Text>
        </TouchableOpacity>

        {/* Button 3 */}
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("./img/drugs.png")}
            style={styles.buttonImage}
          />
          <Text>Notifications</Text>
        </TouchableOpacity>

        {/* Button 4 */}
        <TouchableOpacity style={styles.button} onPress={profile}>
          <Image
            source={require("./img/drugs.png")}
            style={styles.buttonImage}
          />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Hamburger Menu */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchBar: {
    width: "90%", // Adjust as needed
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  button: {
    alignItems: "center",
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 999,
  },
  menuText: {
    fontSize: 24,
  },
});

export default HomeScreen;
