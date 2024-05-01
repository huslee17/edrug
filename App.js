import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from "./screen/login";
import { Platform, Text } from "react-native";
import HomeScreen from "./screen/home";
import UserDrugScreen from "./screen/userDrug";
import RegisterScreen from "./screen/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserInfoScreen from "./screen/Userinfo";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = Platform.OS === "ios" ? "home" : "home-outline";
          } else if (route.name === "UserInfo") {
            iconName = Platform.OS === "ios" ? "account" : "account-outline";
          } else if (route.name === "userDrug") {
            iconName = "pill";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarLabel: ({ color }) => {
          let label;
          if (route.name === "Home") {
            label = "Нүүр";
          } else if (route.name === "UserInfo") {
            label = "Хэрэглэгч";
          } else if (route.name === "userDrug") {
            label = "Миний уух эм";
          }
          return <Text style={{ color }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="userDrug"
        component={UserDrugScreen}
      />
      <Tab.Screen name="UserInfo" component={UserInfoScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
