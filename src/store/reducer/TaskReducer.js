
const initialTimeState = {tasks: [
    {
        IdTask: "1",
        description: "Someil",
        duree: 5,
        date: "22-12-2019",
        actif: true,
        history: [{IdHistory:"1", dateDebut: 5000000, dateFin: 5021600}, {IdHistory:"2", dateDebut: 521000, dateFin: 521000}, {IdHistory:"5", dateDebut: 5043200, dateFin: null}],
        childs:  [],

      },
      {
        IdTask: "2",
        description: "Etude et Travail",
        duree: 28800,
        date: "22-12-2019",
        actif: false,
        history: [{IdHistory:"3", dateDebut: 5021600, dateFin: 5039600}],
        childs:  []
      },
      
      {
        IdTask: "3",
        description: "Divertissement et autres",
        duree: 28800,
        date: "22-12-2019",
        actif: false,
        history: [{IdHistory:"4", dateDebut: 5039600, dateFin: 5043200}],
        childs:  []
      },
      {
        IdTask: "4",
        description: "Divertissement et autres",
        duree: 28800,
        date: "22-12-2019",
        actif: false,
        history: [{IdHistory:"4", dateDebut: 5039600, dateFin: 5043200}],
        childs:  []
      },

]};

function  taskUpdate(state=initialTimeState, action) 
{
    let nextState;

    switch (action.type) {
        case "UPDATE_ACTIF":
            nextState = [
                ...state,
            ];
            
            break;
    
        default:
            nextState = state;
            break;
    }

    return nextState;
}


export default taskUpdate;
