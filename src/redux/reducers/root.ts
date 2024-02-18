import { HYDRATE } from 'next-redux-wrapper';
import { State, ActionType } from '@/types/redux'
import { Reducer } from 'redux'

const initialState: State = {
    auth: null,
    dashboardForm: null,
    operationalCost: null
}

const rootReducer: Reducer<State, ActionType> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const nextState = {
                ...state
            }
            if (action?.payload?.auth) nextState.auth = action?.payload?.auth;
            return nextState
        case 'CUSTOM':
            return { ...state, ...action?.payload }
        default:
            return { ...state };
    }
};

export default rootReducer;