
const initialState = {enroleState: true};

function enroleDate(state= initialState, action)
{
    let nextState;

    switch (action.type)
    {
        case "TOGGLE_ENROLE_DATE":
            // console.log(state.enroleState);
            nextState = {
                ...state,
                enroleState: !state.enroleState
            };
            return nextState;
        default:
            return state;
    }

    return nextState;
}

export default enroleDate;