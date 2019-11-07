import { AsyncStorage } from 'react-native';
import * as h from '../../helpers/funcs';




const currentTaskState = {
  tasks: []
};




function taskUpdate(state = currentTaskState, action) {

  let nextState;
  let isJourneEnding =false;
  let nextJourneyTask;

  switch (action.type) {
    case "UPDATE_ACTIF":

      nextState = {
        ...state,
        tasks: state.tasks.map(
          (el) => {
            if (el.actif==true) {

              let avTime = h.getAvailableTime(el);

              if (avTime > 0) {
                // console.log(avTime);
                el.history[el.history.length - 1].dateFin = Math.floor(Date.now() / 1000);
                h.updateTask(el);
                if ((avTime == el.notifyBeforeEndingDuration * 60) && el.notifyBeforeEnding) {
                  console.log("Le tast "+el.description+" va se teminer apre "+el.notifyBeforeEndingDuration+" minutes");
                }
              }
              else {
                let nxt;


                let availableTasks = state.tasks.filter(
                  elem => h.getAvailableTime(elem) > 0
                );

                if (availableTasks.length == 0) {

                  console.log("fin de la journée");
                  //fin de la journée

                  isJourneEnding = true;
                  setTimeout(event =>{
                    h.findTodayTask().then(
                      data =>{
                        if (data.tasks.length==0)
                        {
                          h.findAll("tasks").then(
                            dt => { 
                      
                              h.addTasks([...dt]);
                          }
                          );
                        }
                        else
                        {
                          //????
                          nextJourneyTask = data.tasks;
                        }
                      }
                    );
                  },1000);
                }
                else {

                  //passer au tache suivante
                  nxt = availableTasks.find(elem => elem.IdTask == el.next);
                  if (nxt) {

                    nxt = nxt.IdTask;

                  }
                  else if (availableTasks.length == 1) {
                    nxt = availableTasks[0].IdTask;
                  }
                  else {

                    let cur = el.IdTask;


                    state.tasks.forEach(
                      element, i => {
                        if ((element.IdTask == cur) && nxt == undefined) {


                          //find fils de l'élémnt courant
                          let found = state.tasks.find(
                            e => e.IdTask = element.next
                          );

                          cur = found.next;

                          if (h.getAvailableTime(found) > 0) {
                            nxt = found.IdTask;
                          }
                        }

                        //dans le cas ou la tache actuel est au milieu les élément d'avant ne son pas analysés
                        //donc il faut refaire la recher che depuis le début puis que le début est lié au dernier
                        if ((i + 1) == state.tasks.length && nxt == undefined) {
                          state.tasks.forEach(
                            elmnt => {
                              if ((elmnt.IdTask == cur) && nxt == undefined) {

                                //find fils de l'élémnt courant
                                let found = state.tasks.find(
                                  e => e.IdTask = elmnt.next
                                );

                                cur = found.next;

                                if (h.getAvailableTime(found) > 0) {
                                  nxt = found.IdTask;
                                }
                              }
                            }
                          );

                        }
                      }
                    );


                  }
                }

                console.log("La tache suite à lancer est "+ state.tasks.find(
                  e => e.IdTask == nxt
                ).description);

                h.switchTask(nxt);
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


  if (isJourneEnding)
  {
    return {
      ...state,
      tasks: [...nextJourneyTask]
    };
  }
  
  return nextState;
}


export default taskUpdate;
