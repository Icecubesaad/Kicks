import { Feather } from "@expo/vector-icons";
import React, { useEffect,useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text, Touchable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
function Showcard({ name, rating,sizes, price, image, currencyIcons, currency,id,navigation }) {
    const [prices, setprices] = useState();
    useEffect(() => {
        price.map((e)=>{
            if(e.currency == currency){
                setprices(e.price)
            }
        })
    }, []);
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate("single",{
      name,
      id,
      rating,
      image,
      reviews:17,
      currencyIcons,
      currency,
      sizes
    })}} style={styles.parent}>
      <View style={{ paddingLeft: 10 }}>
        <TouchableOpacity>
          <Feather name="heart" color="black" size={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image src={image[0]} style={styles.image} />
      </View>
      <View style={{ paddingLeft: 10, marginTop: 10 }}>
        <Text style={{...styles.Text,height:20}}>{name}</Text>
        <View style={{display:"flex",flexDirection:"row", gap:10, alignItems:"center"}}>
          <AntDesign name="star" color="yellow" size={20} />
          <Text style={styles.Text}>{rating}</Text>
        </View>
      </View>
      <View style={{paddingLeft:10,marginTop:10}}>
      {
        prices?<Text style={styles.Text}>{prices} <FontAwesome name={currencyIcons} size={16} color="black" /></Text> 
        :
        <Text style={styles.Text}>{price[0].price} <FontAwesome name={currencyIcons} size={16} color="black" /></Text>
      }
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  parent: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.lightGray,
    height: "auto",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.white,
    width: 170,
    paddingTop: 10,
    paddingBottom:10
  },
  image: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 12,
  },
  rating: {},
  Text: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
  },
});
export default Showcard;
