import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import {
  Montserrat_600SemiBold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
function SingleShoe({ route, navigation }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [gender, setGender] = useState("male");
  const [availableSizes, setAvailableSizes] = useState(null);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [liked, setliked] = useState(false);
  let {
    name,
    sizes,
    region,
    rating,
    reviews,
    image,
    ShoeId,
    prices,
    currencyIcons,
    id,
    Favourite
  } = route.params;

  const fetchSingleShoes = async () => {
    try {
      const request = await fetch(
        `http://192.168.0.104:5000/api/get/getShoeById/${ShoeId}`
      );
      const response = await request.json();
      if (response.success) {
        name = response.data.name;
        sizes = response.data.sizes;
        rating = response.data.rating;
        reviews = response.data.reviews;
        image = response.data.image;
        ShoeId = response.data._id;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!name) {
      fetchSingleShoes();
    }
    const regionSizes = sizes.filter((size) => size.country === "USA")[0];
    setAvailableSizes(regionSizes.availableSizes);
  }, [sizes]);

  const handleColorSelection = (id) => {
    setSelectedColor((prevSelectedColor) =>
      prevSelectedColor === id ? null : id
    );
  };

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
    setSizeIndex(
      selectedGender === "male" ? 0 : selectedGender === "female" ? 1 : 2
    );
  };

  const renderStarIcon = (id) =>
    selectedColor === id && <AntDesign name="star" color="yellow" size={20} />;
  useEffect(() => {
    Favourite.map(e=>{
      if(e.shoeId._id == ShoeId){
        setliked(true)
      }
    })
  }, []);
  const addToCart = async () => {
    try {
      setLoading(true);
      const request = await fetch(
        `http://192.168.0.104:5000/api/post/AddInCart/`,
        {
          method: "POST",
          body: JSON.stringify({
            ShoeId: ShoeId,
            UserId: "666d6bcd07457dc76de8b29c",
            Color:
              selectedColor == 1
                ? "red"
                : selectedColor == 2
                ? "black"
                : "blue",
            Size: selectedSize,
            Quantity: 1,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const response = await request.json();
      if (response.success) {
        setSuccess(true);
        setLoading(false);
        setError(false);
      } else {
        setError(true);
        setLoading(false);
        setErrorMessage("Couldn't save item in cart");
        setSuccess(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setSuccess(false);
      setErrorMessage(error);
    }
  };

  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_500Medium,
  });

  useEffect(() => {
    setSuccess(false);
    setError(false);
  }, [success, error]);

  if (!fontsLoaded) {
    return null;
  }

  const addInUserFavourite = async () => {
    try {
      setliked(true)
      const request = await fetch(
        "http://192.168.0.104:5000/api/post/AddInFavourite",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserId: id, ShoeId: ShoeId }),
        }
      );
      const response = await request.json();
      if (response.success) {
        setSuccess(true);
        setliked(true);
      } else {
        setliked(false);
        setliked(true);
      }
    } catch (error) {
      setError(false);
    }
  };
  const removeFromFavourite=async()=>{
    try{
    setliked(false)
    const request = await fetch("http://192.168.0.104:5000/api/post/RemoveFromCart",{
      method:"POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserId: id, ShoeId: ShoeId }),
    })
    const response = await request.json();
      if (response.success) {
        setSuccess(true);
        setliked(true);
      } else {
        setliked(false);
        setliked(true);
      }
    } catch (error) {
      setError(false);
    }
  }

  return (
    <View style={styles.container}>
      {success ? (
        <View
          style={{
            height: 60,
            backgroundColor: colors.successGreen,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.white, ...styles.message }}>
            Item has been added into your cart
          </Text>
        </View>
      ) : error ? (
        <View
          style={{
            height: 60,
            backgroundColor: colors.red,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.white, ...styles.message }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image[0] }} style={styles.image} />
      </View>
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>
                <AntDesign name="star" color="black" size={25} />
                {rating} ({reviews} reviews)
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              paddingRight: 20,
            }}
          >
            {liked ? (
              <TouchableOpacity onPress={removeFromFavourite}>
                <Feather name="heart" color="red" size={30} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={addInUserFavourite}>
                <Feather name="heart" color="black" size={30} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.colorSelectionContainer}>
          <Text style={styles.rating}>Select Color</Text>
          <View style={styles.colorOptionsContainer}>
            {[1, 2, 3].map((id) => (
              <TouchableOpacity
                key={id}
                onPress={() => handleColorSelection(id)}
                style={[
                  styles.colorOption,
                  {
                    backgroundColor:
                      id === 1
                        ? colors.red
                        : id === 2
                        ? colors.black
                        : colors.blue,
                    borderColor:
                      selectedColor === id ? colors.yellow : colors.white,
                  },
                ]}
              >
                {renderStarIcon(id)}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.genderSelectionContainer}>
          {["male", "female", "kids"].map((genderType) => (
            <TouchableOpacity
              key={genderType}
              onPress={() => handleGenderSelection(genderType)}
              style={[
                styles.genderOption,
                {
                  backgroundColor:
                    gender === genderType ? colors.black : colors.white,
                },
              ]}
            >
              <Text
                style={[
                  styles.genderOptionText,
                  {
                    color: gender === genderType ? colors.white : colors.black,
                  },
                ]}
              >
                {genderType}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView horizontal style={styles.sizeSelectionContainer}>
          {availableSizes &&
            availableSizes[sizeIndex].sizes.map((e) => (
              <TouchableOpacity
                key={e}
                onPress={() => setSelectedSize(e)}
                style={[
                  styles.sizeOption,
                  {
                    backgroundColor:
                      selectedSize === e ? colors.black : colors.white,
                  },
                ]}
              >
                <Text
                  style={{
                    color: selectedSize === e ? colors.white : colors.black,
                  }}
                >
                  {e}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            Price : {prices}{" "}
            <FontAwesome name={currencyIcons} size={16} color="black" />
          </Text>
        </View>
        <View style={styles.cartInfoContainer}>
          <Text style={styles.cartInfoText}>
            117 people have this item in their cart
          </Text>
        </View>
        <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.addToCartButtonText}>Add in cart</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  backButtonContainer: {
    paddingLeft: 20,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
  scrollView: {
    paddingLeft: 20,
  },
  name: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
  },
  message: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
  },
  ratingContainer: {
    marginTop: 10,
  },
  rating: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
  },
  colorSelectionContainer: {
    marginTop: 20,
  },
  colorOptionsContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  genderSelectionContainer: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 10,
  },
  genderOption: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.black,
    padding: 10,
  },
  genderOptionText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  sizeSelectionContainer: {
    marginTop: 10,
  },
  sizeOption: {
    width: 35,
    height: 45,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  priceContainer: {
    marginTop: 10,
  },
  priceText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
  },
  cartInfoContainer: {
    marginTop: 10,
  },
  cartInfoText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
  },
  addToCartButton: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.blueCard,
    borderRadius: 14,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButtonText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 17,
    color: colors.white,
  },
});

export default SingleShoe;
