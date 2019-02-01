import {
    ADD_MEMBER_LIST,
    REMOVE_MEMBER_LIST
} from '../actions/types'

export default (state = [], action) => {
    switch(action.type) {
        case ADD_MEMBER_LIST:
            return [...state, action.payload]
            
        //REMOVING IS TRICKY HERE! START FROM HERE
        case REMOVE_MEMBER_LIST:
            var newArr = state
            console.log(`action payload: ${action.payload}`)
            var index = state.indexOf(action.payload.uid) //find object to be deleted
            console.log(`INDEX = ${index}`);
            if (index !== -1) {
                //use slice from 0 to index; index + 1 to state.length
                var firArr = state.slice(0, index)
                var secArr = state.slice(index + 1, state.length)
                newArr = firArr.concat(secArr)
            }
            console.log(`NEWARR = ${newArr}`);
            return newArr
        
        default:
            return state
    }
} 