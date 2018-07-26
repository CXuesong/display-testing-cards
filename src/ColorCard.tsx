import ColorLens from '@material-ui/icons/ColorLens';
import Fullscreen from '@material-ui/icons/Fullscreen';
import * as React from 'react';
import { connect } from 'react-redux';

import { IPureColorTestingCard, ITestingCard, TestingCardTypes } from './models/TestingCards';
import { IState } from './Reducers';

export interface IColorCardProps {
    card: ITestingCard
}

type IColorCardMergedProps = IColorCardProps;

const emptyTestingCardPlaceHolder = (<div
    style={{ margin: "auto", left: "0", top: "0", right: "0", bottom: "0", height: "2pc", position: "absolute" }}
>
    <p>To get started, choose a testing card by clicking <ColorLens /> button;</p>
    <p>then click <Fullscreen /> to display the testing cards in full screen.</p>
</div>);

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
        switch (card.type) {
            case TestingCardTypes.Empty:
                return (<div style={divStyle}>{emptyTestingCardPlaceHolder}</div>);
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
