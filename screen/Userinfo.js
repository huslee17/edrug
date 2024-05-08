import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function UserInfoScreen({ navigation }) {
  const [loginnedUserdata, setLoginnedUserdata] = useState(null);

  const handleLogout = async () => {
    try {
      await localStorage.removeItem("UserData");
      await localStorage.removeItem("loggedIn");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await localStorage.getItem("UserData");
        if (userData) {
          setLoginnedUserdata(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/userprofile.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.headerText}>
          Welcome, {loginnedUserdata?.username || "Guest"}!
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.userInfo}>
          Username: {loginnedUserdata?.username}
        </Text>
        <Text style={styles.userInfo}>Email: {loginnedUserdata?.email}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#4287f5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#ff0000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
