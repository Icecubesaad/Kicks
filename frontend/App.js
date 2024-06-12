import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./app/screens/Splash";
import FirstScreen from "./app/screens/FirstScreen"
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" component={Splash}  />
          <Stack.Screen name="FirstScreen" component={FirstScreen}  />
          <Stack.Screen name="Login" component={Login}  />
          <Stack.Screen name="Register" component={Register}  />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
