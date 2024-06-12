import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Image } from 'react-native';
import { ArchivoBlack_400Regular } from '@expo-google-fonts/archivo-black';
import { useFonts, loadAsync } from 'expo-font';
import colors from '../constants/colors';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function Splash({navigation}) {
  const [appIsReady, setAppIsReady] = useState(false);
  
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await loadAsync({
          ArchivoBlack_400Regular,
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        navigation.navigate("FirstScreen")
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.parent} onLayout={onLayoutRootView}>
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
});

export default Splash;
