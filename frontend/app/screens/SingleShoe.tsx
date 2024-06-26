import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import Ionicons from '@expo/vector-icons/Ionicons';
function SingleShoe({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        Montserrat_600SemiBold,
      });
    
      if (!fontsLoaded) {
        return null;
      }
  let { name, sizes, region, rating, reviews,image,id } = route.params;
  const [selectedColor, setSelectedColor] = useState(null);
  const [gender, setGender] = useState("male");
  const [availableSizes, setAvailableSizes] = useState(null);
    const fetchSingleShoes=async()=>{
        try {
            const request = await fetch(`http://192.168.0.104:5000/api/get/getShoeById/${id}`)
            const response = await request.json()
            if(response.success){
                name = response.data.name
                sizes = response.data.sizes
                rating = response.data.rating
                reviews = response.data.reviews
                image = response.data.image
                id = response.data._id
            }
        } catch (error) {
            
        }
    }
  useEffect(() => {
    if(!name){
        fetchSingleShoes()
    }
    const regionSizes = sizes.filter((size) => size.country === region)[0];
    setAvailableSizes(regionSizes);
  }, [sizes, region]);
  const handleColorSelection = (id) => {
    setSelectedColor((prevSelectedColor) => (prevSelectedColor === id ? null : id));
  };

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
  };

  const renderStarIcon = (id) =>
    selectedColor === id && <AntDesign name="star" color="yellow" size={20} />;

  const renderSizes = () => {
    if (availableSizes) {
      const genderSizes = availableSizes.availibleSizes.filter(
        (size) => size.gender === gender
      );
      if (genderSizes) {
        return genderSizes.sizes.map((size, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{size}</Text>
          </View>
        ));
      }
    }
    return null;
  };

  return (
    <View style={{marginTop:40}}>
        <View style={{paddingLeft:20}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={30} color="black" />
            </TouchableOpacity>
        </View>
        <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
      <Image
      src={image[0]}
        style={{ width: 250, height: 250 }}
      />
      </View>
      <ScrollView style={{paddingLeft:20}}>
        <Text style={styles.name}>{name}</Text>
        <View style={{marginTop:10}}>
          <Text style={styles.rating}>
          <AntDesign name="star" color="black" size={25} />{rating} ({reviews} reviews)
          </Text>
        </View>
        <View style={{marginTop:20}}>
          <Text style={styles.rating}>Select Color</Text>
          <View
            style={{
              flexDirection: "row",
              gap:20,
              marginTop:10
            }}
          >
            {[1, 2, 3].map((id) => (
              <TouchableOpacity
                key={id}
                onPress={() => handleColorSelection(id)}
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 1,
                  backgroundColor:id===1?colors.red:id===2?colors.black:colors.blue,
                  borderColor:
                    selectedColor === id ? colors.yellow : colors.white,
                  borderRadius: 999,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {renderStarIcon(id)}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            gap:30
          }}
        >
          {["male", "female", "kids"].map((genderType) => (
            <TouchableOpacity
            style={{borderWidth:1,borderRadius:20,borderColor:colors.black,width:"auto",padding:10,                  backgroundColor:gender===genderType?colors.black:colors.white,
            }}
              key={genderType}
              onPress={() => handleGenderSelection(genderType)}
            >
                <Text style={{
                  fontWeight: gender === genderType ? "bold" : "normal",
                  color:gender===genderType?colors.white:colors.black,
                  fontSize:16
                }}>
                {genderType}
                </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>{renderSizes()}</View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
    name:{
        fontFamily:"Montserrat_600SemiBold",
        fontSize:20
    },
    rating:{
        fontFamily:"Montserrat_600SemiBold",
        fontSize:16
    }
})
export default SingleShoe;
