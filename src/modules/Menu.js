import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { FontAwesomeIcon, Font } from '@fortawesome/react-native-fontawesome';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';




// import {Icon} from "react-native-vector-icons/FontAwesome";



export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    

  }

  render() {
    return (
      <TouchableOpacity onPress={(e)=> {}}>
        <FontAwesomeIcon icon={faAlignCenter} style={styles.nav}/>
      </TouchableOpacity>  
      
    );
  }
}


const styles = StyleSheet.create(
  {
    nav:
    {
      width: 100,
      height: 100,
      fontSize: 40
    }
  }
);
