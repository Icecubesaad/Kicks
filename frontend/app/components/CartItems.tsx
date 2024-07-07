import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableOpacityBase,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch,useSelector } from "react-redux";
import { removeFromCartReducer } from "../../reducer/user/userSlice";
import { RootState } from "../../store/store";
function CartItems({
  navigation,
  setSelectedItems,
  SelectedItems,
  currencyIcons,
  currency,
  object,
}) {
  const user = useSelector((state : RootState)=>state.user)
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [quantity, setQuantity] = useState(object.quantity);
  const [price, setPrice] = useState();
  const [name, setname] = useState();
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  const AddIntoSelectedItems = (item) => {
    const itemExists = SelectedItems.some(
      (obj) => obj.shoe._id === item.shoe._id
    );

    if (itemExists) {
      const newArray = SelectedItems.filter(
        (obj) => obj.shoe._id !== item.shoe._id
      );
      setSelectedItems(newArray);
    } else {
      const newItem = { ...item, quantity };
      setSelectedItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const quantityControl = (increase) => {
    setQuantity((prevQuantity) => {
      const newQuantity = increase
        ? prevQuantity + 1
        : Math.max(prevQuantity - 1, 1);
      AddIntoSelectedItems({ ...object, quantity: newQuantity });
      return newQuantity;
    });
  };
  const removeFromCart = async () => {
    try {
      const request = await fetch(
        "http://192.168.0.106:5000/api/post/RemoveFromCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shoeId: object.shoe._id,userId: user.id}),
        }
      );
      const response = await request.json();
      if (response.success) {
        seterror(false)
        setsuccess(true)
        dispatch(
          removeFromCartReducer({
            _id: object.shoe._id,
          })
        );
      } else {
        seterror(true)
        setsuccess(false)
      }
    } catch (error) {
      console.log(error);
      setsuccess(false)
      seterror(true)
    }
  };
  useEffect(() => {
    if (object.shoe.name) {
      setname(object.shoe.name.substring(0, 15));
    }
    const selectedPrice = object.shoe.prices.find(
      (e) => e.currency === currency
    );
    setPrice(selectedPrice ? selectedPrice.price : object.shoe.prices[0].price);
  }, [currency, object]);

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
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        borderWidth: selected ? 3 : 1,
        borderColor: colors.black,
      }}
    >
      <TouchableOpacity
        onPress={handleSelection}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 20,

          marginTop: 10,
          width: "90%",
        }}
      >
        <Image
          source={{ uri: object.shoe.image[0] }}
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
            {name}
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
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "10%",
        }}
      >
        <TouchableOpacity onPress={removeFromCart}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CartItems;
