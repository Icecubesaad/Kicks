import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

function CartItems({
  navigation,
  setSelectedItems,
  SelectedItems,
  currencyIcons,
  currency,
  object,
}) {
  const [selected, setSelected] = useState(false);
  const [quantity, setQuantity] = useState(object.quantity);
  const [price, setPrice] = useState();

  const AddIntoSelectedItems = (item) => {
    const itemExists = SelectedItems.some((obj) => obj.shoeId._id === item.shoeId._id);

    if (itemExists) {
      const newArray = SelectedItems.filter((obj) => obj.shoeId._id !== item.shoeId._id);
      setSelectedItems(newArray);
    } else {
      const newItem = { ...item, quantity };
      setSelectedItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const quantityControl = (increase) => {
    setQuantity((prevQuantity) => {
      const newQuantity = increase ? prevQuantity + 1 : Math.max(prevQuantity - 1, 1);
      AddIntoSelectedItems({ ...object, quantity: newQuantity });
      return newQuantity;
    });
  };

  useEffect(() => {
    const selectedPrice = object.shoeId.prices.find((e) => e.currency === currency);
    setPrice(selectedPrice ? selectedPrice.price : object.shoeId.prices[0].price);
  }, [currency, object.shoeId.prices]);

  const handleSelection = () => {
    setSelected((prevSelected) => !prevSelected);
    AddIntoSelectedItems(object);
  };

  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <TouchableOpacity
      onPress={handleSelection}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
        borderWidth: selected ? 3 : 1,
        borderColor: colors.black,
        marginTop: 10,
      }}
    >
      <Image
        source={{ uri: object.shoeId.image[0] }}
        style={{
          height: 100,
          width: 100,
          borderWidth: 1,
          borderColor: colors.white,
          borderRadius: 12,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Text style={{ fontFamily: "Montserrat_600SemiBold", fontSize: 16 }}>
          {object.shoeId.name}
        </Text>
        <View style={{ display: "flex", gap: 10, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => quantityControl(true)}
            style={{
              width: 28,
              height: 28,
              borderWidth: 1,
              backgroundColor: colors.lightGray,
              borderColor: colors.black,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="plus" size={24} color="black" />
          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity
            onPress={() => quantityControl(false)}
            style={{
              width: 28,
              height: 28,
              borderWidth: 1,
              backgroundColor: colors.lightGray,
              borderColor: colors.black,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="minus" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Text style={{ fontFamily: "Montserrat_600SemiBold", fontSize: 20 }}>
          {price} <FontAwesome name={currencyIcons} size={16} color="black" />
        </Text>
        <View
          style={{
            height: 25,
            width: 25,
            borderWidth: 1,
            borderRadius: 999,
            backgroundColor:
              object.color === "blue"
                ? colors.blue
                : object.color === "red"
                ? colors.red
                : colors.black,
          }}
        ></View>
      </View>
    </TouchableOpacity>
  );
}

export default CartItems;
