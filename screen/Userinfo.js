import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function UserInfoScreen({ navigation }) {
  const handleLogOut = () => {
    navigation.navigate("Login");
  };
  return (
    <View>
      <Text>UserInfo Page</Text>

      <Button
        style={styles.LogOutButton}
        title="LogOut"
        onPress={handleLogOut}
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
