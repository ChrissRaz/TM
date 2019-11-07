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



const App: () => React$Node = () => {

    


  return (

    <Provider store={Store}>
          <Navigation style={{flex: 1}}/>
    </Provider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
