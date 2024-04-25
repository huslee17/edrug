import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../action";
import { useRoute } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phonenumber, setPhonenumber] = useState("99111199");
  const [password, setPassword] = useState("0000");
  const [loading, setLoading] = useState(false);
  const route = useRoute();

  const handleLogin = async () => {
    try {
      const response = await login({
        phone: 99111199,
        password: "0000",
      });
      if (response.status === 200) {
        const userData = response.data.data;
        navigation.navigate("Home", { user: userData });
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
          placeholder="Phone Number"
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default LoginScreen;
