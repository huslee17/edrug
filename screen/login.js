import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../action";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const loggedIn = await localStorage.getItem("loggedIn");
      if (loggedIn === "true") {
        navigation.navigate("Main", { screen: "Home" });
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login({
        phone: phonenumber,
        password: password,
      });
      if (response.status === 200) {
        const userdata = response?.data?.data?.[0];
        await localStorage.setItem("userId", userdata.userid.toString());
        await localStorage.setItem("UserData", JSON.stringify(userdata));
        await localStorage.setItem("loggedIn", "true");
        navigation.navigate("Main", { screen: "Home" });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Нэвтрэх</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Имайл оруулах"
          value={phonenumber}
          onChangeText={setPhonenumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Нэвтрэх</Text>
      </Pressable>
      <Text onPress={register}>Нууц үгээ мартсан уу?</Text>
      <Text>Бүртгэл үүсгэх үү?</Text>
      <Pressable style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Бүртгүүлэх</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default LoginScreen;
