import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import {
  Montserrat_500Medium,
  Montserrat_300Light,
} from "@expo-google-fonts/montserrat";
import { useFonts } from "@expo-google-fonts/montserrat";
import { Image } from "react-native";

function FirstScreen({navigation}) {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.parent}>
        <View style={{display:"flex",justifyContent:"center",position:"absolute",top:150,alignItems:"center"
        }}>
        <Text style={styles.Heading}>Welcome to KICKS</Text>
        <Text style={styles.SubHeading}>Let's get you started</Text>
        </View>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Login")}}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Register")}}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.Background,
  },
  image: {
    height: 250,
    width: 250,
  },
  text: {
    fontSize: 40,
    marginTop: 20,
    fontFamily: "ArchivoBlack_400Regular",
    color: colors.white,
  },
  button: {
    height: 50,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.Background,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
    color: "black",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position:"absolute",
    bottom:80
  },
  Heading:{
    fontFamily:"Montserrat_500Medium",
    fontSize:30,
    color:colors.white
  },
  SubHeading:{
    color:colors.white,
    fontSize:20,
    fontFamily:"Montserrat_300Light"
  }
});

export default FirstScreen;
