import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const DrawerContent = () => {
  // Example user profile data
  const userProfile = {
    name: "Budhuu",
    phonenumber: "99454812",
    email: "Budhuu@example.com",
    profileImage: require("./img/buka.jpg"),
  };

  return (
    <View style={styles.drawerContainer}>
      <Image source={userProfile.profileImage} style={styles.profileImage} />
      <Text style={styles.userName}>{userProfile.name}</Text>
      <Text style={styles.userEmail}>{userProfile.email}</Text>
      <Text style={styles.userPhonenumber}>{userProfile.phonenumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
  },
  userPhonenumber: {
    fontSize: 14,
    color: "#555",
  },
});

export default DrawerContent;
