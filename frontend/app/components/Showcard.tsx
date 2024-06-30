import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Showcard({ name, rating, sizes, price, image, currencyIcons, currency, ShoeId, navigation }) {
  const { favourite, id } = useSelector((state: RootState) => state.user);
  const [prices, setPrices] = useState(price[0]?.price || null);
  const [liked, setLiked] = useState(false);
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  // Effect to check if the shoe is in favourites
  useEffect(() => {
    favourite.forEach(e => {
      if (e.shoeId._id === id) {
        setLiked(true);
      }
    });
  }, [favourite, id]);

  if (!fontsLoaded) {
    return null; // Fonts are still loading
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("single", {
          name,
          ShoeId,
          rating,
          image,
          reviews: 17,
          currencyIcons,
          currency,
          sizes,
          prices,
          id,
          Favourite: favourite,
        });
      }}
      style={styles.parent}
    >
      <View style={{ paddingLeft: 10 }}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Feather name="heart" color={liked ? "red" : "black"} size={20} />
        </TouchableOpacity>
      </View>
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
        <Image source={{ uri: image[0] }} style={styles.image} />
      </View>
      <View style={{ paddingLeft: 10, marginTop: 10 }}>
        <Text style={styles.Text}>{name}</Text>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5 }}>
          <AntDesign name="star" color="yellow" size={20} />
          <Text style={styles.Text}>{rating}</Text>
        </View>
      </View>
      <View style={{ paddingLeft: 10, marginTop: 10 }}>
        {prices ? (
          <Text style={styles.Text}>{prices} <FontAwesome name={currencyIcons} size={16} color="black" /></Text>
        ) : (
          <Text style={styles.Text}>Price not available <FontAwesome name={currencyIcons} size={16} color="black" /></Text>
        )}
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
    paddingBottom: 10,
  },
  image: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 12,
  },
  Text: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
  },
});

export default Showcard;
