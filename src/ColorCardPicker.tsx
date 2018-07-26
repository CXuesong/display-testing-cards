import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@material-ui/core';
import ColorLens from '@material-ui/icons/ColorLens';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import * as React from 'react';
import { connect } from 'react-redux';

import * as Actions from "./Actions"
import { ITestingCard, PredefinedTestingCards } from './models/TestingCards';
import { IState } from './Reducers';
import store from "./Store";

interface IColorPickerButtonStates {
    anchorEl?: HTMLElement
}

interface IColorPickerButtonConnectedProps {
    selectedItem: ITestingCard
}

export interface IColorPickerButtonProps {
    items?: ITestingCard[],
}

type IColorPickerButtonMergedProps = IColorPickerButtonProps & IColorPickerButtonConnectedProps;

export class ColorPickerButton extends React.Component<IColorPickerButtonMergedProps, IColorPickerButtonStates>
{
    constructor(props: IColorPickerButtonProps & IColorPickerButtonConnectedProps) {
        super(props)
        this.state = { anchorEl: undefined };
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
        return (<div>
            <Tooltip title="Choose a testing card">
                <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={onButtonClicked}
                    color="inherit"
                >
                    <ColorLens />
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
                    return (<MenuItem
                        key={i}
                        onClick={onMenuClosing}
                        data-itemkey={i}
                    >
                        <ListItemIcon>{this.props.selectedItem === item ? <RadioButtonChecked /> : <RadioButtonUnchecked />}</ListItemIcon>
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
