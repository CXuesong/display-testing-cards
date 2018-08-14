import { Typography } from '@material-ui/core';
import ColorLens from '@material-ui/icons/ColorLens';
import Fullscreen from '@material-ui/icons/Fullscreen';
import * as React from 'react';
import { connect } from 'react-redux';

import { IPureColorTestingCard, ITestingCard, TestingCardTypes } from '../models/TestingCards';
import { IState } from '../Reducers';

export interface ITestingCardProps {
    card: ITestingCard
}

type ITestingCardMergedProps = ITestingCardProps;

const emptyTestingCardPlaceHolder = (<div className="testingcard-instructions">
    <div>
        <Typography variant="display1">Display Testing Cards</Typography>
        <Typography variant="title">a monitor testing app brought to you by <a href="https://github.com/cxuesong">CXuesong</a>.</Typography>
        <hr />
        <Typography variant="subheading">
            Hover your mouse to / touch the top border for menus.<br />
            To get started, choose a testing card by clicking <ColorLens /> button;<br />
            then click <Fullscreen /> to display the testing cards in full screen.<br />
        </Typography>
        <p />
        <Typography><a href="https://github.com/cxuesong/display-testing-cards">Source Code on GitHub</a> | <a href="https://github.com/cxuesong/display-testing-cards/issues">Issue &amp; Suggestion</a></Typography>
    </div>
</div>);

export class TestingCard extends React.Component<ITestingCardMergedProps>
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
    (state: IState, prop: {}): ITestingCardMergedProps => {
        return { card: state.testingCard };
    })(TestingCard);
