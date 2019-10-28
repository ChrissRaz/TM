
const initialTimeState = [
    {   
        IdTask: "1",
        dureeRestant: "3500" //la somme de tous les intervalles de l'historique +  date now - date debut si actif
    }
];

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
