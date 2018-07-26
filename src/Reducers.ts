import { Action, ActionTypes } from './Actions';
import { EmptyTestingCard, ITestingCard } from './models/TestingCards';

export interface IState {
    testingCard: ITestingCard
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