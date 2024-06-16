import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
function Showcard({name,rating,price, image}) {
  return (
    <View>
        <View>
            <TouchableOpacity><Feather name='heart' color="black" /></TouchableOpacity>
        </View>
        <View><Image source={image} style={styles.image} /></View>
        <View>
            <Text>{name}</Text>
            <View>
                <AntDesign name='star' color="yellow" />
                <Text>{rating}</Text>
            </View>
        </View>
        <Text>{price}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    parent:{
        display:"flex",
        flexDirection:"column",
    },
    image:{

    },
    rating:{

    },
    Text:{
        
    }
})
export default Showcard