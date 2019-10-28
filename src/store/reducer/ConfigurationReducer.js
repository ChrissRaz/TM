const Themes = {
    default: 
    {
        l1: "#541616",
        l2 : "#c64242",
        l3: "#ff7474",
        l4: "#f7c2c2",
        l5: "#fce5e5",
    },
    dark:
    {
        l1: "#000000",
        l2 : "#4d4d4d",
        l3: "#5f5f5f",
        l4: "#808080",
        l5: "#969696",
    }
};

const initialTheme = {
    theme: Themes.default,
};


function  configure(state=initialTheme, action) 
{
    let nextState;

    switch (action.type) {
        case "DEFAULT_THEME":
            nextState = {
                ...state,
                theme: Themes.default
            }
            break;
        
        case "DARK_THEME":
                nextState = {
                    ...state,
                    theme: Themes.dark
                }
                break;
    
        default:
            nextState = state;
            break;
    }

    return nextState;
}



export default configure;