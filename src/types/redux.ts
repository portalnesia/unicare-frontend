import { Auth } from '@/model/auth';
import { ICustomer, IUser } from '@/model/user';
import { HYDRATE } from 'next-redux-wrapper';

export type State = {
    auth: Auth | null;
    /**
     *  null means no auth
     *  undefined means data not yet requested
     */
    user?: IUser | ICustomer | null;
}

export type ActionType = {
    type: typeof HYDRATE,
    payload: Partial<State>
} | {
    type: 'CUSTOM',
    payload: Partial<State>
}