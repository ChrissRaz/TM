import { AsyncStorage } from 'react-native';
import * as h from '../../helpers/funcs';




const currentTaskState = {
  tasks: []
};


let canswitch = false;



function taskUpdate(state = currentTaskState, action) {

  let nextState;
  let isJourneEnding = false;
  let nextJourneyTask;

  switch (action.type) {
    case "UPDATE_ACTIF":

      nextState = {
        ...state,
        tasks: state.tasks.map(
          (el) => {
            if (el.actif == true) {

              //findind available time
              let avTime = h.getAvailableTime(el);

              if (avTime > 2) {
                canswitch=true;
                // console.log(avTime);
                el.history[el.history.length - 1].dateFin = Math.floor(Date.now() / 1000);
                h.updateTask(el);
                if ((avTime == el.notifyBeforeEndingDuration * 60) && el.notifyBeforeEnding) {
                  console.log("Le tast " + el.description + " va se teminer apre " + el.notifyBeforeEndingDuration + " minutes");
                  
                  try 
                  {
                    AsyncStorage.getItem("settings").then(
                      data => 
                      {
                        data = JSON.parse(data);
                        if (data.notifyBeforeEnding)
                        {
                          //Launch an notification
                        }
                      }
                    );
                  }catch(err)
                  {
                    console.warn("Error when feching settings (TaskReducer) :"+err)
                  }
                  
                }
              }
              else {

                  if (canswitch)
                  {
                      canswitch=false;
                      //compenser les deux secondes de vérification
                      el.history[el.history.length - 1].dateFin= el.history[el.history.length - 1].dateFin+2;

                      let availableTasks = state.tasks.filter(
                        elem => h.getAvailableTime(elem) > 0
                      );

                      availableTasks.sort((a, b) => a.order - b.order);


                      if (availableTasks.length == 0) {
                        //fin de la journée
                        //alerter si avec une notification si le paramètre correspons
                        h.switchTask(null, true);

                      }
                      else {
                        //passer au tache 
                        //alerter l'utisilisateur avec une notification

                        console.log("La tache suivante à lancer est " + availableTasks[0].description);
                        
                        h.switchTask(availableTasks[0].IdTask, availableTasks[0].notifyBegining);
                      }
                  }
              
              }


            }

            return el;
          }

        )

      };
      break;


    case "CONFIGURE_TODAY_TASK":
      //value must be an array
      // console.log(action.value);
      nextState = {
        ...state,
        tasks: action.value
      };

      break;


    default:
      nextState = state;
      break;
  }


  return nextState;
}


export default taskUpdate;
