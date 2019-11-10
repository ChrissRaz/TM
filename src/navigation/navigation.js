import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from '../screens/Home';
import AddTask from '../screens/AddTask';
import TaskDetails from '../screens/TaskDetails';
import TaskHistory from '../screens/TaskHistory';
import GlobalTasksList from '../screens/GlobalTasksList';
import TaskReorder from '../screens/TaskReorder';


import CustomDraw from '../modules/CustomDraw';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStream, faHome } from '@fortawesome/free-solid-svg-icons';






import Parametre from '../screens/Parametre';
import Splash from '../screens/Splash';




const TaskNav = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    }
  },
  Details: {
    screen: TaskDetails
  },
  History: {
    screen: TaskHistory,
    navigationOptions: {
      header: null,
    }
  },
  Reorder: {
    screen: TaskReorder,
    navigationOptions: {
      title: "Reorder Tasks"
    }
  }
});

//
const BaseNav = createDrawerNavigator({
  Home: {
    screen: TaskNav,
  },

  TaskLists: {
    screen: GlobalTasksList,
    navigationOptions: {
      drawerLabel: 'Programs'
    },
  },
  NewTask: {
    screen: AddTask,
    navigationOptions: {
      drawerLabel: 'New Tasks'
    },
  },
  
  Parametre: {
    screen: Parametre,
    navigationOptions: ({ navigation }) => ({
      title: "Paramètres",
    }),
  },
},
  {

    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: 'brown',
    },

    contentComponent: CustomDraw,
    // drawerOpenRoute: "DrawerOpen",
    // drawerCloseRoute: "DrawerClose",
    // drawerToggleRoute: "DrawerToggle",

  });

const LoadDataNavigator = createSwitchNavigator({
  Splash: {
    screen: Splash,
  },
  Base: {
    screen: BaseNav,
  },

});


export default createAppContainer(LoadDataNavigator);