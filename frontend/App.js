import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importing screens
import Splash from "./app/screens/Splash";
import FirstScreen from "./app/screens/FirstScreen";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import HomeScreen from "./app/screens/HomeScreen";
import { Feather } from "@expo/vector-icons";
import Cart from "./app/screens/Cart";
import Like from "./app/screens/Like";
import Profile from "./app/screens/Profile";
import colors from "./app/constants/colors";
import SingleShoe from "./app/screens/SingleShoe";
import { Provider } from "react-redux";
import store from "./store/store";

// Creating Stack and Tab Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator function
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Cart") {
            iconName = "shopping-cart";
          } else if (route.name === "Like") {
            iconName = "heart";
          } else if (route.name === "Profile") {
            iconName = "user";
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: colors.white,
          borderWidth: 0,
          borderColor: colors.white,
        },
        tabBarIconStyle: { opacity: 0.7 },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Like" component={Like} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

// Main app component
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="single" component={SingleShoe} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
