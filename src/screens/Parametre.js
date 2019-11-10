import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native';
import { Icon, Container, Left, Content } from 'native-base';
import { Header,Input, Button } from "react-native-elements";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faBell, faCogs, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
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
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1,flex: 4}}>Dark Mode</Text>
                <View style= {{flexDirection: 'row', right: 20,flex: 1.5}}>
                  <Switch style={{flex: 1}} value={this.props.configuration.DarkMode} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text style={{flex: 1}}>
                    {this.props.configuration.DarkMode? " on":"off"}
                  </Text>
                </View>
              </View>

              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1, flex: 4}}>Notification</Text>
                <View style= {{flexDirection: 'row', right: 20 ,flex: 1.5}}>
                  <Switch style={{flex: 1}} value={this.props.configuration.notify} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text style={{flex: 1}}>
                    {this.props.configuration.notify? " on":"off"}
                  </Text>
                </View>
              </View>


              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1, flex: 4}}>Notify Task Begining</Text>
                <View style= {{flexDirection: 'row', right: 20, flex: 1.5}}>
                  <Switch style={{flex: 1}}  disabled={!this.props.configuration.notify} value={this.props.configuration.notifyBegining} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text style={{flex: 1}} >
                    {this.props.configuration.notifyBegining? " on":"off"}
                  </Text>
                </View>
              </View>


              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1, flex: 4}}>Notify 5min before Task ending</Text>
                <View style= {{flexDirection: 'row', right: 20, flex: 1.5}}>
                  <Switch style={{flex: 1}}  value={this.props.configuration.autoSwitchToDefautlTaskAtEndOfJourney} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text style={{flex: 1}} >
                    {this.props.configuration.autoSwitchToDefautlTaskAtEndOfJourney? " on":"off"}
                  </Text>
                </View>
                {/* <Input style={{flex: 2}}  onEndEditing={(text)=> this._updateSettings(5,text)}  maxLength={2} inputStyle={{right: 15,}} leftIcon={<FontAwesomeIcon style={{right: 20}} color={this.props.configuration.theme.l3}  icon={faBell} /> } inputContainerStyle={{width: 80}} placeholder="duration" keyboardType='number-pad' /> */}
              </View>


              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1, flex: 4}}>Notify Journey Begining</Text>
                <View style= {{flexDirection: 'row', right: 20, flex: 1.5}}>
                  <Switch style={{flex: 1}}  disabled={!this.props.configuration.notify} value={this.props.configuration.notifyJourneyBegining} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text style={{flex: 1}} >
                    {this.props.configuration.notifyJourneyBegining? " on":"off"}
                  </Text>
                </View>
              </View>



              <View style= {{flexDirection: 'row', marginBottom: 20, justifyContent:'space-between',  flex: 1 }}>
                <Text style={{fontSize: 15, color: this.props.configuration.theme.l1, flexWrap: 'wrap', flex: 4}}>Switch auto to default Task at end of Journey</Text>
                <View style= {{flexDirection: 'row', right: 20, flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
                  <Switch style={{flex: 1}}  value={this.props.configuration.autoSwitchToDefautlTaskAtEndOfJourney} thumbColor={this.props.configuration.theme.l1} onValueChange= {(e)=> this._changeMode(e)}/>
                  <Text style={{flex: 1}} >
                    {this.props.configuration.autoSwitchToDefautlTaskAtEndOfJourney? " on":"off"}
                  </Text>
                </View>
              </View>
          </Content>
          <Button icon={<FontAwesomeIcon color='red' size={30} style={{marginRight: 10}} icon={faExclamationTriangle}/>} buttonStyle={{backgroundColor: "rgba(255,0,0,0.2)"}} titleStyle={{color: "red"}} title="Restore Application data" onPress= {()=>this._reload()}/>
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
