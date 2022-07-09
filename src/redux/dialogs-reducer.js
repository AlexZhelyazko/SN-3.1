const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
    dialogs: [
        {id: 1, messageText: 'Hello'},
        {id: 2, messageText: 'Hello 1'},
        {id: 3, messageText: 'Hello 2'},
        {id: 4, messageText: 'Hello 3'},
    ]
}

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type){
        case SEND_MESSAGE: {
            let stateCopy = {...state};
            stateCopy.dialogs = [...state.dialogs];
            stateCopy.dialogs.push({id: stateCopy.dialogs.length + 1, messageText: action.txt});
            return stateCopy    
        }
        default: {
            return state
        }
    }
}

export const sendMessageAC = (msgText) => {
    return {type: SEND_MESSAGE, txt: msgText}
};