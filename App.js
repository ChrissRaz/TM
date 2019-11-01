/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,

} from 'react-native';

import Navigation from "./src/navigation/navigation";

import {Provider} from 'react-redux';
import Store from './src/store/ConfigureStore';
import Splash from './src/screens/Splash';


const App: () => React$Node = () => {

  return (
    <Provider store={Store}>
          <Navigation/>
    </Provider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
