import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import {connect} from 'react-redux';

const logo = require("../assets/TMLogo.png");


export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    console.log(this.props);
  }


  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Base");
    }, 1000);
  }

  render() {
    return (
      <View style={styles.base}>
        <View style={styles.content}>
                <Image source={logo}  style={{width: 175, height: 200}}/>

            <Text style={styles.logoText}>Time Manager</Text>
            
        </View>
        <AnimatedLoader
            visible={true}
            overlayColor="rgba(255,255,255,0)"
            
            animationStyle={styles.anim}
            speed={0.8}
            loop= {true}
            
              />
      </View>
    );
  }
}


const styles = StyleSheet.create(
    {
        base :
        {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fce5e5"

        },
        content:
        {
         
            width: 300,
            height: 350,
            alignItems: "center",

        },
        logoText:
        {
            fontSize: 25,
            fontWeight: "bold",
            color: "#541616",
            marginTop: 10,
        },
        anim:
        {
          height: 60,
          width: 60,
          position: "relative",
          top: 60,
    
        }
    }
);