import { HYDRATE } from 'next-redux-wrapper';
import { State, ActionType } from '@/types/redux'
import { Reducer } from 'redux'

const initialState: State = {
    auth: null,
    user: null
}

const rootReducer: Reducer<State, ActionType> = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            const nextState = {
                ...state
            }
            if (action?.payload?.auth) nextState.auth = action?.payload?.auth;
            if (action?.payload?.user) nextState.user = action?.payload?.user;
            return nextState
        case 'CUSTOM':
            return { ...state, ...action?.payload }
        default:
            return { ...state };
    }
};

export default rootReducer;