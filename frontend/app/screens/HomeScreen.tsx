import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import NewCollection from "../components/NewCollection";
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import Showcard from "../components/Showcard";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUser, setUserRegion } from "../../reducer/user/userSlice";
import { AppDispatch } from "../../store/store";

function HomeScreen({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [company, setCompany] = useState("Nike");
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const [canFetch, setCanFetch] = useState(true);
  const [region, setRegion] = useState(null);
  const [currencyIcon, setCurrencyIcon] = useState("dollar");

  const fetchShoes = useCallback(async () => {
    if (canFetch) {
      try {
        const request = await fetch(
          `http://192.168.0.104:5000/api/get/getShoesByCompany/${company}?skip=${skip}&limit=${limit}`,
          {
            method: "GET",
          }
        );
        if (request.status === 200) {
          const response = await request.json();
          if (response.data.length === 0) {
            setCanFetch(false);
          } else {
            setShoes((prevShoes) => [...prevShoes, ...response.data]);
            setSkip((prevSkip) => prevSkip + limit);
          }
        } else {
          setFetchError(true);
          setErrorMessage("Internal server error");
        }
      } catch (error) {
        setFetchError(true);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [canFetch, company, skip, limit]);

  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Determine region based on latitude and longitude
      if (
        latitude >= 49.0 &&
        latitude <= 61.0 &&
        longitude >= -8.0 &&
        longitude <= 2.0
      ) {
        setRegion("GBP");
        setCurrencyIcon("gbp");
      } else if (
        latitude >= 42.0 &&
        latitude <= 83.0 &&
        longitude >= -141.0 &&
        longitude <= -52.0
      ) {
        setRegion("CAD");
        setCurrencyIcon("dollar");
      } else if (
        latitude >= 24.0 &&
        latitude <= 46.0 &&
        longitude >= 123.0 &&
        longitude <= 146.0
      ) {
        setRegion("JPY");
        setCurrencyIcon("jpy");
      } else if (
        latitude >= 24.396308 &&
        latitude <= 49.384358 &&
        longitude >= -125.0 &&
        longitude <= -66.93457
      ) {
        setRegion("USA");
        setCurrencyIcon("dollar");
      } else if (
        latitude >= 35.0 &&
        latitude <= 70.0 &&
        longitude >= -10.0 &&
        longitude <= 40.0
      ) {
        setRegion("EUR");
        setCurrencyIcon("eur");
      } else if (
        latitude >= -55.0 &&
        latitude <= -10.0 &&
        longitude >= 113.0 &&
        longitude <= 154.0
      ) {
        setRegion("AUD");
        setCurrencyIcon("dollar");
      } else {
        setRegion("Other");
      }
    })();
    if (user.username == "") {
      getUser();
    }
  }, []);
  useEffect(() => {
    if (region) {
      dispatch(setUserRegion(region));
    }
  }, [region]);
  const getUser = async () => {
    const cookie = await AsyncStorage.getItem("LOGIN_TOKEN");
    if (!cookie) {
      navigation.navigate("FirstScreen");
    } else {
      dispatch(fetchUser());
    }
  };

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

  const handleCompanyChange = (selectedCompany) => {
    setShoes([]);
    setSkip(0);
    setCanFetch(true);
    setCompany(selectedCompany);
  };

  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded || loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.parent}>
      <Header />
      <NewCollection navigation={navigation} name="Nike Air Force 1" image="" />
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => handleCompanyChange("Nike")}
          style={styles.option}
        >
          <Text style={styles.optionText}>Nike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCompanyChange("adidas")}
          style={styles.option}
        >
          <Text style={styles.optionText}>Adidas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCompanyChange("puma")}
          style={styles.option}
        >
          <Text style={styles.optionText}>Puma</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={shoes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Showcard
            name={item.name}
            price={item.prices}
            rating={"5.0"}
            image={item.image}
            currencyIcons={currencyIcon}
            currency={region}
            navigation={navigation}
            ShoeId={item._id}
            sizes={item.sizes}
            user={{ favourite: user.favourite, id: user.id }}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={fetchShoes}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
      {fetchError && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  option: {
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blueCard,
  },
  optionText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: colors.white,
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 20,
  },
  endMessageContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  endMessageText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.black,
  },
  errorText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.red,
    textAlign: "center",
    marginTop: 10,
  },
});

export default HomeScreen;
