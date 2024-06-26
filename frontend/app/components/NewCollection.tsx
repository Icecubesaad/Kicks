import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
function NewCollection({ navigation, name, image }) {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.parent}>
      <View style={styles.Main}>
        <View style={styles.Left}>
          <Text style={styles.nameText}>{name}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={{color:"white",fontFamily: "Montserrat_600SemiBold"}}>Shop now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Right}>
          <Image
            source={require("../../assets/newColleciton.png")}
            style={styles.Image}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    width: "100%",
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Main: {
    width: "90%",
    height: "100%",
    backgroundColor: colors.blueCard,
    borderWidth: 1,
    borderColor: colors.blueCard,
    borderRadius: 16,
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
  },
  Left: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Right: {
    display:"flex",
    justifyContent:"flex-start"
  },
  nameText: {
    fontSize: 20,
    color: colors.white,
    fontFamily: "Montserrat_600SemiBold",
  },
  button: {
    color: colors.white,
    fontFamily: "Montserrat_600SemiBold",
    borderWidth:1,
    borderColor:colors.white,
    borderRadius:20,
    padding:10,
    marginTop:10
  },
  Image: {
    height: 200,
    width: 200,
    position:"relative",
    top:-40,
    right:40,
    transform:[{rotate: '-30deg'}]
  },
});

export default NewCollection;
