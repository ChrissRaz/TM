import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { Icon } from 'react-native-elements';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDonate, faQrcode } from '@fortawesome/free-solid-svg-icons'

export default class Callendrier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: false,
      nb: 0
    };

    library.add(faQrcode);
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.test} onPress = {(e)=>this.setState(prevState => ({nb: prevState.nb+1}))}>
            <Text>{this.state.nb}</Text>
            {/* <FontAwesome icon={SolidIcons.smile} /> */}
            <Text>click on me</Text>
           

            <FontAwesomeIcon icon={ faQrcode } />


           
        </TouchableOpacity>


        

      </View>
    );
  }
}


const styles = StyleSheet.create(
  {
    test:
    {
      backgroundColor: "red"
    }
  }
);