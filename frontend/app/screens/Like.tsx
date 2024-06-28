import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity,FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Showcard from "../components/Showcard";
import { useFonts } from "expo-font";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import colors from "../constants/colors";
function Like({ navigation }) {
  const [cart, setcart] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const limit = 10;
  const [skip, setskip] = useState(0);
  const [canFetch, setcanFetch] = useState(true);
  const renderFooter = () => {
    if (!canFetch) {
      return (
        <View style={styles.endMessageContainer}>
          <Text style={styles.endMessageText}>No more products available</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  const fetchUserCart = async () => {
    try {
      const request = await fetch(
        `http://192.168.0.104:5000/api/get/getUserFavourite/${"666d6bcd07457dc76de8b29c"}?limit=${limit}&skip=${skip}`,
        {
          method: "GET",
        }
      );
      const response = await request.json();
      if (response.success&&response.cart.length>0) {
        setcart((e)=>[...e,...response.cart]);
        setcanFetch(true)
      } else {
        seterror(true);
        setcanFetch(false)
        seterrorMessage(response.error);
      }
    } catch (error) {
      seterror(true);
      setcanFetch(false)
      seterrorMessage("Internal server error");
    }
  };
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded || loading) {
    return <Text>Loading...</Text>;
  }
  useEffect(() => {
    fetchUserCart();
  }, []);
  return (
    <ScrollView>
      <View style={{ paddingLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>Cart</Text>
      {loading ? (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      ) : (
        <View>
          <FlatList
            data={cart}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Showcard
                name={item.name}
                price={item.prices}
                rating={"5.0"}
                image={item.image}
                currencyIcons={"dollar"}
                currency={"USA"}
                navigation={navigation}
                id={item._id}
                sizes={item.sizes}
              />
            )}
            numColumns={2}
            columnWrapperStyle={styles.row}
            onEndReached={fetchUserCart}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  endMessageContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  endMessageText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    color: colors.black,
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 20,
  },name: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
  },
})
export default Like;
