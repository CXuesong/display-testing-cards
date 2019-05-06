import { Action, ActionTypes } from './Actions';
import { EmptyTestingCard, KnownTestingCard } from './models/TestingCards';

export interface IState {
    testingCard: KnownTestingCard
}

export const InitialState: IState = { testingCard: EmptyTestingCard };

export function onReduce(state: IState = InitialState, action: Action)
{
    switch (action.type)
    {
        case ActionTypes.SetTestingCard:
            return { ...state, testingCard: action.card };
        default:
            return state;
    }
}