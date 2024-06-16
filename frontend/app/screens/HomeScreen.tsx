import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Header from '../components/Header';
import NewCollection from '../components/NewCollection';
import colors from '../constants/colors';
import { useFonts } from 'expo-font';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';

function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.parent}>
      <Header />
      <NewCollection navigation={navigation} name="icecube" image="" />
      <ScrollView 
        horizontal 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.options}><Text style={styles.optionsText}>Nike</Text></View>
        <View style={styles.options}><Text style={styles.optionsText}>Adidas</Text></View>
        <View style={styles.options}><Text style={styles.optionsText}>Puma</Text></View>
      </ScrollView>
      <View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: colors.white,
    width: '100%',
  },
  scrollView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    height:40
  },
  scrollViewContent: {
    height:40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5, // Add horizontal padding to the container
  },
  options: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: colors.blueCard,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blueCard,
    marginRight: 10, // Add margin right to create gap between items
  },
  optionsText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
  },
});

export default HomeScreen;
