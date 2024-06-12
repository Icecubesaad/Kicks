import React,{
    useState
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import {Montserrat_500Medium,Montserrat_300Light} from '@expo-google-fonts/montserrat'
function Login({navigation}) {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_500Medium,
  });
    const [Cred, setCred] = useState({
        "email":"",
        "password":""
    });
    const LoginFunc=async()=>{
        try {
        } catch (error) {
          
        }
    }
  return (
    <View style={styles.parent}>
      <Text style={styles.Heading}>Log in to your account</Text>
      <View style={styles.MainContainer}>
        <View style={styles.InputContainer}>
          <Feather name="mail" size={24} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={Cred.email}
            onChangeText={(text) => setCred({ ...Cred, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.white}
          />
        </View>
        <View style={styles.InputContainer}>
          <Feather name="lock" size={24} color="white" />
          <TextInput style={styles.input}
            placeholder="Enter your password"
            value={Cred.password}
            onChangeText={(text) => setCred({ ...Cred, password: text })}
            keyboardType="visible-password"
            autoCapitalize="none"
            placeholderTextColor={colors.white}
            />
        </View>
      </View>
      <View style={{display:"flex",flexDirection:"column",alignItems:"center", gap:20,marginTop:30}}>
        <TouchableOpacity style={styles.button}><Text style={{...styles.buttonText,color:colors.black}}>Log in</Text></TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}><Image source={require('../../assets/googleIcon.png')} style={{width:35, height:35}} /><Text style={styles.buttonText}>Log in with google</Text></TouchableOpacity>
      </View>
      <View style={{position:"absolute", bottom:30,display:"flex",alignItems:"center", flexDirection:"row",justifyContent:"center", width:"100%"}}>
        <Text style={styles.buttonText}>Don't have an account?</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}><Text style={{...styles.buttonText,color:colors.blue}}>{"   "}Register here</Text></TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginTop:40,
    backgroundColor:colors.black,
    paddingTop:100
  },
  input:{
    fontFamily:"Montserrat_500Medium",
    width:"100%",
    color:colors.white,
  },
  buttonText:{
    fontFamily:"Montserrat_500Medium",
    color:colors.white,

  },
  Heading:{
    fontSize:26,
    fontFamily:"Montserrat_500Medium",
    color:colors.white,
    letterSpacing:0,
    paddingLeft:20
  },
  MainContainer:{
    marginTop:100,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:25
  },
  InputContainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:colors.gray,
    width:"90%",
    height:50,
    borderWidth:1,
    borderColor:colors.gray,
    borderRadius:12,
    gap:12,
    padding:12
  },
  button:{
    width:"90%",
    height:50,
    borderWidth:1,
    borderRadius:12,
    backgroundColor:colors.white,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  googleButton:{
    width:"90%",
    height:50,
    borderWidth:1,
    borderRadius:12,
    backgroundColor:colors.black,
    display:"flex",
    borderColor:colors.white,
    gap:10,
    justifyContent:"center",
    flexDirection:"row",
    alignItems:"center",
  }
});

export default Login;
