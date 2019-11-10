import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native';
import { Icon, Container, Left, Content } from 'native-base';
import { Header,Input, Button } from "react-native-elements";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faBell, faCogs } from '@fortawesome/free-solid-svg-icons';
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
      this.props.dispatch({ type: "DARK_THEME"});
    }
    else
    {
      this.props.dispatch({ type: "DEFAULT_THEME"});
    }
    
  }

  _reload()
  {
    Alert.alert("Confirmation", "All youe data will be reloader, would you continue?", [
      {text: 'Yes', onPress: () => d.restore()},
      {text: 'No', onPress: () => console.log("no")}],{cancelable: true},
      );
  }

  _updateSettings(action, value)
  {
    switch (action) {
      case 0:
          
        break;
      case 1:
          
          break;
      case 2:
          
        break;
      case 3:
          
        break;
      case 4:
        
        break;
      case 4:
        
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Container  style={ { backgroundColor: this.props.configuration.theme.l5}}>
        <Header
            rightComponent= {
            <FontAwesomeIcon size={30} icon={faCogs}  style={{ color: this.props.configuration.theme.l4 }}/>
            }

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

          <Content style={{marginTop: 20}}>

              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1,}}>Dark Mode</Text>
                <View style= {{flexDirection: 'row', right: 20}}>
                  <Switch  value={this.props.configuration.DarkMode} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text>
                    {this.props.configuration.DarkMode? " on":"off"}
                  </Text>
                </View>
              </View>

              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1}}>Notificatio</Text>
                <View style= {{flexDirection: 'row', right: 20}}>
                  <Switch value={this.props.configuration.notify} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text>
                    {this.props.configuration.notify? " on":"off"}
                  </Text>
                </View>
              </View>


              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1}}>Notify Task Begining</Text>
                <View style= {{flexDirection: 'row', right: 20}}>
                  <Switch disabled={!this.props.configuration.notify} value={this.props.configuration.notifyBegining} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text>
                    {this.props.configuration.notifyBegining? " on":"off"}
                  </Text>
                </View>
              </View>


              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1}}>Notify Journey Begining</Text>
                <View style= {{flexDirection: 'row', right: 20}}>
                  <Switch disabled={!this.props.configuration.notify} value={this.props.configuration.notifyJourneyBegining} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text>
                    {this.props.configuration.notifyJourneyBegining? " on":"off"}
                  </Text>
                </View>
              </View>


              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1}}>Notify before Task ending</Text>
                <View style= {{flexDirection: 'row', right: 20,}}>
                  <Switch value={this.props.configuration.autoSwitchToDefautlTaskAtEndOfJourney} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text>
                    {this.props.configuration.autoSwitchToDefautlTaskAtEndOfJourney? "on":"off"}
                  </Text>
                </View>
                <Input  onEndEditing={(text)=> this._updateSettings(5,text)}  maxLength={2} inputStyle={{right: 15,}} leftIcon={<FontAwesomeIcon style={{right: 20}} color={this.props.configuration.theme.l3}  icon={faBell} /> }inputContainerStyle={{width: 80}} placeholder="duration" keyboardType='number-pad' />
              </View>


              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1, flexWrap: 'wrap'}}>Switch auto to default Task at end of Journey</Text>
                <View style= {{flexDirection: 'row', right: 20}}>
                  <Switch value={this.props.configuration.autoSwitchToDefautlTaskAtEndOfJourney} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text>
                    {this.props.configuration.autoSwitchToDefautlTaskAtEndOfJourney? " on":"off"}
                  </Text>
                </View>
              </View>


              <Button buttonStyle={{backgroundColor: "red"}} title="Restore App" onPress= {()=>this._reload()}/>
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
