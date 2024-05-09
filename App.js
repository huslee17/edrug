import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";

import HomeScreen from "./screen/home";
import Login from "./screen/login";
import RegisterScreen from "./screen/register";
import UserInfoScreen from "./screen/Userinfo";
import DrugDetailScreen from "./screen/DrugDetail";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const queryClient = new QueryClient();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName, iconSize;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "UserInfo") {
            iconName = "account";
          } else if (route.name === "userDrug") {
            iconName = "pill";
          }
          iconSize = focused ? 26 : 24;
          return <MaterialCommunityIcons name={iconName} size={iconSize} />;
        },
        tabBarLabel: () => {
          let label;
          if (route.name === "Home") {
            label = "Нүүр";
          } else if (route.name === "UserInfo") {
            label = "Хэрэглэгч";
          } else if (route.name === "userDrug") {
            label = "Миний уух эм";
          }
          return <Text>{label}</Text>;
        },
      })}
      barStyle={{ backgroundColor: "#FFFFFF" }}
      activeColor="#000000"
      shifting={true}
      labeled={false}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
        initialParams={{ id: null }}
      />

      <Tab.Screen name="UserInfo" component={UserInfoScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
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
            <Stack.Screen
              name="DrugDetailScreen"
              component={DrugDetailScreen}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

export default App;
