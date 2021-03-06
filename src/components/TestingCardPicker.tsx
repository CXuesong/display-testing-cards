import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@material-ui/core';
import ColorLens from '@material-ui/icons/ColorLens';
import Check from '@material-ui/icons/Check';
import FormatColorFill from '@material-ui/icons/FormatColorFill';
import * as React from 'react';
import { connect } from 'react-redux';

import * as Actions from "../Actions"
import { PredefinedTestingCards, TestingCardTypes, KnownTestingCard } from '../models/TestingCards';
import { IState } from '../Reducers';
import store from "../Store";
import TransparencyGrid from "../images/transparency-grid.svg"
import "./TestingCardPicker.css"

interface IColorPickerButtonStates {
    anchorEl?: HTMLElement
}

interface IColorPickerButtonConnectedProps {
    selectedItem: KnownTestingCard
}

export interface IColorPickerButtonProps {
    items?: KnownTestingCard[],
}

type IColorPickerButtonMergedProps = IColorPickerButtonProps & IColorPickerButtonConnectedProps;

export class ColorPickerButton extends React.PureComponent<IColorPickerButtonMergedProps, IColorPickerButtonStates>
{
    constructor(props: IColorPickerButtonProps & IColorPickerButtonConnectedProps) {
        super(props)
        this.state = { anchorEl: undefined };
    }
    public renderButtonIcon(card: KnownTestingCard) {
        switch (card.type) {
            case TestingCardTypes.Empty:
            case TestingCardTypes.PureColor:
                const fill = card.type === TestingCardTypes.Empty ? `url(${TransparencyGrid})` : card.color;
                return (<div style={{ position: "relative", fontSize: 0 }}>
                    <FormatColorFill style={{ position: "relative", left: 0, top: 0 }} />
                    <div style={{ background: fill, width: "100%", height: "4px", position: "absolute", top: "20px" }}>
                    </div>
                </div>);
            default:
                return <ColorLens />;
        }
    }
    public render() {
        const onButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
            this.setState({ anchorEl: e.currentTarget });
        };
        const onMenuClosing = (e: React.MouseEvent<HTMLElement>) => {
            if (e.currentTarget.dataset.itemkey) {
                const card = this.getItems()[parseInt(e.currentTarget.dataset.itemkey, 10)];
                store.dispatch(Actions.setTestingCard(card));
            }
            this.setState({ anchorEl: undefined });
        };
        const predefinedColors = this.getItems();
        const { selectedItem } = this.props;
        return (<div>
            <Tooltip title="Choose a testing card">
                <IconButton
                    aria-owns={this.state.anchorEl ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={onButtonClicked}
                    color="inherit"
                >
                    {this.renderButtonIcon(selectedItem)}
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={!!this.state.anchorEl}
                onClose={onMenuClosing}
            >
                {predefinedColors.map((item, i) => {
                    const selected = this.props.selectedItem === item;
                    return (<MenuItem
                        key={i}
                        onClick={onMenuClosing}
                        data-itemkey={i}
                        selected={selected}
                    >
                        <TestingCardIcon card={item} isChecked={selected} />
                        <ListItemText primary={item.name} />
                    </MenuItem>);
                })}
            </Menu>
        </div>)
    }
    private getItems() {
        return this.props.items || PredefinedTestingCards;
    }
}

export const ReduxColorPickerButton = connect(
    (state: IState, prop: IColorPickerButtonProps): IColorPickerButtonMergedProps => {
        return { items: prop.items, selectedItem: state.testingCard };
    })(ColorPickerButton);

export interface ITestingCardIconProps {
    card: KnownTestingCard,
    isChecked: boolean
}

export class TestingCardIcon extends React.Component<ITestingCardIconProps, {}>
{
    constructor(props: ITestingCardIconProps) {
        super(props);
    }
    private renderIcon() {
        const { card } = this.props;
        const fill = card.type === TestingCardTypes.Empty ? `url(${TransparencyGrid})` : card.color;
        return (<div className="testing-card-icon" style={{ background: fill }}>
            {this.props.isChecked && <Check />}
        </div>);
    }
    public render() {
        return <React.Fragment>
            <ListItemIcon>{this.renderIcon()}</ListItemIcon>
        </React.Fragment>
    }
}
