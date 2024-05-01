import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function UserInfoScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await localStorage.removeItem("userId");
      await localStorage.removeItem("UserData");
      await localStorage.removeItem("loggedIn");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View>
      <Text>UserInfo Page</Text>
      <Button
        style={styles.LogOutButton}
        title="LogOut"
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  LogOutButton: {
    backgroundColor: "red",
    color: "white",
  },
});
