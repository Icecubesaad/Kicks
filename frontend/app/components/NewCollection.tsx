import React from 'react'
import { StyleSheet, View,Text, TouchableOpacity } from 'react-native'
import colors from '../constants/colors'
import { useFonts } from 'expo-font'
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
function NewCollection({navigation,name,image}) {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.parent}>
        <View style={styles.Main}>
            <View style={styles.Left}>
              <Text style={styles.nameText}>{name}</Text>
              <TouchableOpacity><Text>Shop now</Text></TouchableOpacity>
            </View>
            <View style={styles.Right}></View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  parent:{
    width:"100%",
    height:200,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  Main:{
    width:"90%",
    height:"100%",
    backgroundColor:colors.blueCard,
    borderWidth:1,
    borderColor:colors.blueCard,
    borderRadius:16,
    display:"flex",
  },
  Left:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
  },
  Right:{

  },
  nameText:{
    fontSize:16,
    color:colors.white,
    fontFamily:"Montserrat_600SemiBold"
  }
})

export default NewCollection