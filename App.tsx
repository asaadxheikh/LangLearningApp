/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  console.log("hy there");
  
  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />

    <View style={styles.container}>
      <Text style={styles.quicksandRegular}>
        This text uses a quick sand font
      </Text>
      <Text style={styles.quicksandLight}>
        This text uses a quick sand light font
      </Text>
      <Text style={styles.ralewayThin}>
        This text uses a thin italic raleway font
      </Text>
      <Text style={styles.ralewayItalic}>
        This text uses a thin italic raleway font
      </Text>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({

    container: {
      backgroundColor: "lavender",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    quicksandLight: {
      fontFamily: "Quicksand-Light",
      fontSize: 20,
    },
    quicksandRegular: {
      fontFamily: "Quicksand-Regular",
      fontSize: 20,
    },
    ralewayItalic: {
      fontFamily: "Raleway-Italic",
      fontSize: 20,
    },
    ralewayThin: {
      fontFamily: "Raleway-ThinItalic",
      fontSize: 20,
    },

});

export default App;
