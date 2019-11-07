import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';

import { Icon, Container, Header, Left, Content } from 'native-base';

import { DrawerNavigatorItems } from 'react-navigation-drawer';
const logo = require("../assets/TMLogo.png");

import { connect } from 'react-redux';



export default   class CustomDraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <Header style= {{height:195 , backgroundColor: this.props.configuration.theme.l3}}>
                    <Image source={logo} style={{ width: 155, height: 177 , marginTop: 10}} />
                </Header>
                <Content>
                    <DrawerNavigatorItems {...this.props} />
                </Content>
            </Container>
        );
    }
}



const mapStateToProps = (state) => {

    return {
      configuration: state.configuration,
    }
  }
  
  module.exports = connect(mapStateToProps)(CustomDraw);