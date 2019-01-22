import * as actions from "../actions";

let initialState = {
    data: [],
    loading: false
}

const droneDataReducer = (state = initialState, action) => {



    if (action.type === actions.REQUEST_DRONEDATA_SAGAS_RECEIVED)
        return {
            ...state,
            loading: false,
            data: action.payload.data
        }

 
    return state;
}

export default droneDataReducer