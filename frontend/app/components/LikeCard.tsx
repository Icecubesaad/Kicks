import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableOpacityBase,
} from "react-native";
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch,useSelector } from "react-redux";
import { removeFromCartReducer } from "../../reducer/user/userSlice";
import { RootState } from "../../store/store";
function LikeCard({
  navigation,
  currencyIcons,
  currency,
  object,
}) {
  const user = useSelector((state : RootState)=>state.user)
  const dispatch = useDispatch();
  const [price, setPrice] = useState();
  const [name, setname] = useState();
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  const removeFromCart = async () => {
    try {
      const request = await fetch(
        "http://192.168.0.106:5000/api/post/RemoveFromFavourite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shoeId: object.shoeId._id,userId: user.id}),
        }
      );
      const response = await request.json();
      if (response.success) {
        seterror(false)
        setsuccess(true)
        dispatch(
          removeFromCartReducer({
            _id: object.shoeId,
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
    if (object.shoeId.name) {
      setname(object.shoeId.name.substring(0, 15));
    }
    const selectedPrice = object.shoeId.prices.find(
      (e) => e.currency === currency
    );
    setPrice(selectedPrice ? selectedPrice.price : object.shoeId.prices[0].price);
  }, [currency, object]);

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
        borderColor: colors.black,
      }}
    >
      <TouchableOpacity
        onPress={()=>{navigation.navigate("single",{
          ShoeId:object.shoeId._id,
          name:object.shoeId.name,
          rating:5,
          image:object.shoeId.image,
          reviews: 17,
          currencyIcons,
          currency,
          sizes:object.shoeId.sizes,
          prices:object.shoeId.prices,
          UserId : user.id,
          Favourite: user.favourite,
        }),console.log(object)}}
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
            {name}
          </Text>
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

export default LikeCard;
