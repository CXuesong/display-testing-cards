import { ITestingCard } from './models/TestingCards';

export enum ActionTypes {
    SetTestingCard = "SET_TESTING_CARD",
}

export interface ISetTestingCardAction {
    type: ActionTypes.SetTestingCard,
    card: ITestingCard
}

export type Action = ISetTestingCardAction;

export function setTestingCard(card: ITestingCard): ISetTestingCardAction {
    return { type: ActionTypes.SetTestingCard, card };
}
