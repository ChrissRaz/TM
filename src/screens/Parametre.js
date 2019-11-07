import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert, Button } from 'react-native';
import { Icon, Container, Left, Content } from 'native-base';
import { Header } from "react-native-elements";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import  * as h  from '../helpers/funcs';
import  * as d  from '../helpers/defaultConfigs';




class Parametre extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _goBack()
  {
    this.props.navigation.goBack();

  }
  _changeMode(e)
  {
    if (e)
    {
      this.props.dispatch({ type: "DARK_THEME"})
    }
    else
    {
      this.props.dispatch({ type: "DEFAULT_THEME"})
    }

    
  }

  _reload()
  {
    Alert.alert("Confirmation", "All youe data will be reloader, would you continue?", [
      {text: 'Yes', onPress: () => d.restore()},
      {text: 'No', onPress: () => console.log("no")}],{cancelable: true},
      )

  }

  render() {
    return (
      <Container  style={ { backgroundColor: this.props.configuration.theme.l5}}>
        <Header
            leftComponent={
              <TouchableOpacity onPress={(e) => this._goBack() }>
                <FontAwesomeIcon size={30} icon={faArrowLeft} style={{ color: this.props.configuration.theme.l4 }} />
              </TouchableOpacity>
            }
            centerComponent={{ text: 'Settings', style: { color: this.props.configuration.theme.l4, fontSize: 25 } }}
            
            backgroundColor={this.props.configuration.theme.l1}
            barStyle="light-content" 
            containerStyle= {{
              height:60,
              paddingBottom: 20
            }}
          />
          <Content>
              <View>
                <Button title="Restore App" onPress= {()=>this._reload()}/>
                <Text>Dark Mode</Text>
                <Switch value={true} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
              </View>
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

export default connect(mapStateToProps)(Parametre);
