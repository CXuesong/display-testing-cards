import * as React from 'react';
import { connect } from 'react-redux';

import { IPureColorTestingCard, ITestingCard, TestingCardTypes } from './models/TestingCards';
import { IState } from './Reducers';

export interface IColorCardProps
{
    card: ITestingCard
}

type IColorCardMergedProps = IColorCardProps;

export class ColorCard extends React.Component<IColorCardMergedProps>
{
    public render() {
        const divStyle: React.CSSProperties = {
            position: "absolute",
            left: "0",
            top: "0",
            height: "100%",
            width: "100%",
            zIndex: -1,
        };
        const card = this.props.card;
        switch (card.type)
        {
            case TestingCardTypes.PureColor:
                divStyle.backgroundColor = (card as IPureColorTestingCard).color
                break;
        }
        return (<div style={divStyle} />);
    }
}

export const ReduxColorCard = connect(
    (state: IState, prop: {}): IColorCardMergedProps => {
        return { card: state.testingCard };
    })(ColorCard);
