import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { Icon } from 'react-native-elements';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'
import CalendarPicker  from 'react-native-calendar-picker';

import {connect} from 'react-redux';

 


class Callendrier extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };


    
  }

  _calledarShow()
  {

    

    // console.log(this.db)


    const action = {type: "TOGGLE_ENROLE_DATE"};
    this.props.dispatch(action);

  
    
  }

  _onDateChange()
  {
    
  }

  componentDidUpdate()
  {
    console.log("reloading");
    // console.log(this.state);
  }

  

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.enroleButton} onPress = {(e)=>{this._calledarShow()}}>
            <Text>Mon Callendrier</Text>
            <FontAwesomeIcon icon={ faQrcode } />
           
        </TouchableOpacity>

        { 
          !this.props.enroleState && < CalendarPicker
          onDateChange={this._onDateChange }
        />
        }

      </View>
    );
  }
}


const styles = StyleSheet.create(
  {
    enroleButton:
    {
      backgroundColor: "red",
      flexDirection: "row",
    }
  }
);

const mapStateToProps = (state) => {
  return {enroleState:  state.enroleState}
}

export default connect(mapStateToProps)(Callendrier);