import { createAppContainer, createSwitchNavigator } from "react-navigation";
import  {createStackNavigator} from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from '../screens/Home';
import AddTask from '../screens/AddTask';
import Parametre from '../screens/Parametre';
import Splash from '../screens/Splash';




const AppNavigator = createStackNavigator({
    Home: {
      screen: Home,
    },
  }, 
  {
    navigationOptions: {
      headerMode: 'none',
    }
  });


const BaseNav =  createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: "Mon organisation aujourd'hui",
    }),
  },
  Parametre: {
    screen: Parametre,
    navigationOptions: ({ navigation }) => ({
      title: "Paramètres",
    }),
  }
}, 
{
  initialRouteName: 'Home',
  contentOptions: {
    activeTintColor: '#e91e63',
  },
});

const LoadDataNavigator = createSwitchNavigator ({
  Splash: {
    screen: Splash,
  },
  Base: {
    screen: BaseNav,
  },

});
  
  
  export default createAppContainer(LoadDataNavigator);