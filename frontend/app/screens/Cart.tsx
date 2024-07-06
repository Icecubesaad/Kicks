import React, { useEffect, useState,useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import colors from "../constants/colors";
import CartItems from "../components/CartItems";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
function Cart({ navigation }) {
  const user = useSelector((state: RootState) => state.user)
  const [cart, setcart] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const limit = 10;
  const [skip, setskip] = useState(0);
  const [canFetch, setcanFetch] = useState(true);
  const [selectedItems, setselectedItems] = useState([]);

  const fetchUserCart = async () => {
    try {
      if(canFetch){
        const request = await fetch(
          `http://192.168.0.104:5000/api/get/getUserCart/${"666d6bcd07457dc76de8b29c"}?limit=${limit}&skip=${skip}`,
          {
            method: "GET",
          }
        );
        const response = await request.json();
        if (response.success && response.cart.length > 0) {
          setcart(response.cart);
          setskip(e=>e+10)
          setcanFetch(false)
        } else {
          seterror(true);
          setcanFetch(false);
          seterrorMessage(response.error);
        }
      }
    } catch (error) {
      seterror(true);
      setcanFetch(false);
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
    console.log(user.cart)
    setcart(user.cart)
  }, [user]);
  return (
    <View>
        <View style={{ paddingLeft: 20,marginTop:40 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Cart</Text>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={colors.blue} />
          </View>
        ) : (
          <View style={{marginTop:20}}>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.shoeId}
              renderItem={({ item }) => (
                <CartItems navigation={navigation} SelectedItems={selectedItems} setSelectedItems={setselectedItems} object={item} currencyIcons={"dollar"} currency={"USA"} />
              )}
            />
          </View>
        )}
        {
          selectedItems.length>=1?
          <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity style={styles.addToCartButton}><Text style={styles.addToCartButtonText}>Check Out ({selectedItems.length})</Text></TouchableOpacity>
            </View>
            :null
        }
    </View>
  );
}
const styles = StyleSheet.create({
  endMessageContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  endMessageText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.black,
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 20,
  },
  name: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 25,
    textAlign:"center",

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
export default Cart;
