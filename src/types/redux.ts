import { Auth } from '@/models/auth';
import { TripRequest, IOperationalCostRequest } from '@/models/trip';
import { HYDRATE } from 'next-redux-wrapper';

export type State = {
    auth: Auth | null;
    dashboardForm: TripRequest | null
    operationalCost: IOperationalCostRequest | null;
}

export type ActionType = {
    type: typeof HYDRATE,
    payload: Partial<State>
} | {
    type: 'CUSTOM',
    payload: Partial<State>
}