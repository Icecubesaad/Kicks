import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import { ArchivoBlack_400Regular } from '@expo-google-fonts/archivo-black';
import * as Font from 'expo-font';
import colors from '../constants/colors';
import * as SplashScreen from 'expo-splash-screen';

function Splash({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ArchivoBlack_400Regular,
        });

        // Simulate a loading delay (e.g., for an API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      navigation.navigate('FirstScreen');
    }
  }, [appIsReady, navigation]);

  if (!appIsReady) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.parent}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.text}>KICKS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Background,
  },
  image: {
    height: 250,
    width: 250,
  },
  text: {
    fontSize: 40,
    marginTop: 20,
    fontFamily: 'ArchivoBlack_400Regular',
    color: colors.white,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Background,
  },
});

export default Splash;
