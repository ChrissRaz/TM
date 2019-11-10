import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert, FlatList } from 'react-native';
import { Icon, Container, Left, Content, Button } from 'native-base';
import { Header,Input } from "react-native-elements";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faBell, faCogs, faClock } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import  * as h  from '../helpers/funcs';
import  * as d  from '../helpers/defaultConfigs';
import TaskItemHistory from '../modules/HistoryItem';




class TaskHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.history=[];

    this._getAllHistory();
  }


  _goBack()
  {
    this.props.navigation.goBack();
  }


  _getAllHistory()
  {

    let history  = [];
    this.props.dataManager.tasks.forEach(
      el => {
        let tasks = el.history.forEach(
          elem =>{

            history.push({...elem, taskDesciption: el.description});
          }
        );
        return  tasks;
      }    
    );


    history.filter((a,b) => b.dateDebut-a.dateDebut);



    // let res =[];

    // history.forEach(
    //   el =>
    //   {
    //     res = [...res, ]
    //   }
    // );
    return history;
  }


  render() {
    return (
      <Container  style={ { backgroundColor: this.props.configuration.theme.l5}}>
        <Header
            rightComponent= {
            <FontAwesomeIcon size={30} icon={faClock}  style={{ color: this.props.configuration.theme.l4 }}/>
            }
            leftComponent={
              <TouchableOpacity onPress={(e) => this._goBack() }>
                <FontAwesomeIcon size={30} icon={faArrowLeft} style={{ color: this.props.configuration.theme.l4 }} />
              </TouchableOpacity>
            }
            centerComponent={{ text: 'History', style: { color: this.props.configuration.theme.l4, fontSize: 25 } }}
            
            backgroundColor={this.props.configuration.theme.l1}
            barStyle="light-content" 
            containerStyle= {{
              height:60,
              paddingBottom: 20
            }}
          />

          <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
            <Text style={{flex:3.5, flexWrap:'wrap', fontSize: 15, fontWeight:'bold'}}>Task</Text>
            <Text style={{flex:2, fontWeight:'bold'}}>Begining</Text>
            <Text style={{flex:2, fontWeight:'bold'}}>Ending</Text>
            <Text style={{flex:1, fontWeight:'bold'}}>App State</Text>
          </View>

          <View>
            <FlatList 
                style= {{marginTop: 15}}
                data={this._getAllHistory()}
                renderItem={({ item }) => <TaskItemHistory hist={item}/>}
                keyExtractor={item => item.IdTask}
              />
          </View>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    configuration: state.configuration,
    dataManager: state.dataManager
  }
}

export default connect(mapStateToProps)(TaskHistory);
