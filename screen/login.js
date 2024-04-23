import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacityComponent } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      console.log('Email:', email);
      console.log('Password:', password);
    };
  
    const register = () => {
      navigation.navigate('Register');
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Нэвтрэх</Text>
        <TextInput
          style={styles.input}
          placeholder="И-мэйл хаяг"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Нууц үг"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Нэвтрэх" onPress={handleLogin} />
        <Text onPress={register}>Нууц үгээ мартсан уу?</Text>
        <Text>Бүртгэл үүсгэх үү?</Text>
        <Button title="Бүртгүүлэх" onPress={register} />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
