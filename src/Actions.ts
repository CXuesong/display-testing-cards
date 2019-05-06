import { KnownTestingCard } from './models/TestingCards';

export enum ActionTypes {
    SetTestingCard = "SET_TESTING_CARD",
}

export interface ISetTestingCardAction {
    type: ActionTypes.SetTestingCard,
    card: KnownTestingCard
}

export type Action = ISetTestingCardAction;

export function setTestingCard(card: KnownTestingCard): ISetTestingCardAction {
    return { type: ActionTypes.SetTestingCard, card };
}
