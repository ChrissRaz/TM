/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,

} from 'react-native';

import Navigation from "./src/navigation/navigation";


const App: () => React$Node = () => {
  return (
    <Navigation/>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
