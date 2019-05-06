export enum TestingCardTypes {
    Empty = "EmptyTestingCard",
    PureColor = "PureColorTestingCard"
}

export interface ITestingCard {
    name?: string,
    type: TestingCardTypes
}

export interface IEmptyTestingCard extends ITestingCard {
    type: TestingCardTypes.Empty
}

export interface IPureColorTestingCard extends ITestingCard {
    type: TestingCardTypes.PureColor
    color: string
}

export const EmptyTestingCard: IEmptyTestingCard = { type: TestingCardTypes.Empty };

export type KnownTestingCard = IEmptyTestingCard | IPureColorTestingCard;

class PureColorTestingCard implements IPureColorTestingCard {
    public type: TestingCardTypes.PureColor;
    constructor(public name: string, public color: string) {
        this.type = TestingCardTypes.PureColor;
    }
}

export const PredefinedTestingCards: KnownTestingCard[] = [
    new PureColorTestingCard("Black", "#000000"),
    new PureColorTestingCard("White", "#FFFFFF"),
    new PureColorTestingCard("Gray", "#999999"),
    new PureColorTestingCard("Red", "#FF0000"),
    new PureColorTestingCard("Green", "#00FF00"),
    new PureColorTestingCard("Blue", "#0000FF"),
];
