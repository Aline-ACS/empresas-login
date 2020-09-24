const defaultState = {};

export default function (state = defaultState, action) {
    switch (action.type) {
        case '@user/LOGIN':
            console.log(`ação de login => ${action.data.token}`)
            return action.data;
        case '@user/LOGOUT':
            return defaultState;
        default:
            return state;
    }
}