import { IconButton, Menu, MenuItem } from '@material-ui/core';
import ColorLens from '@material-ui/icons/ColorLens';
import * as React from 'react';

interface IColorPickerButtonStates {
    anchorEl?: HTMLElement
}

export interface IPredefinedColor {
    name: string,
    color: string,
}

export interface IColorPickerButtonProps {
    predefinedColors?: IPredefinedColor[],
    selectedColor?: string
}

export const DefaultPredefinedColors: IPredefinedColor[] = [
    { name: "Black", color: "#000000" },
    { name: "White", color: "#FFFFFF" },
    { name: "Gray", color: "#999999" },
    { name: "Red", color: "#FF0000" },
    { name: "Green", color: "#00FF00" },
    { name: "Blue", color: "#0000FF" },
];

export class ColorPickerButton extends React.Component<IColorPickerButtonProps, IColorPickerButtonStates>
{
    constructor(props: IColorPickerButtonProps) {
        super(props)
        this.state = { anchorEl: undefined };
    }
    public render() {
        const onButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
            this.setState({ anchorEl: e.currentTarget });
        };
        const onMenuClosing = (e: React.MouseEvent<HTMLElement>) => {
            if (!!e.currentTarget.dataset.color)
            {
                console.log(e.currentTarget.dataset.color);
            }
            this.setState({ anchorEl: undefined });
        };
        const predefinedColors = this.props.predefinedColors || DefaultPredefinedColors;
        return (<div>
            <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={onButtonClicked}
                color="inherit"
            >
                <ColorLens />
            </IconButton>
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
                {predefinedColors.map((item) => {
                    return (<MenuItem
                        key={item.name + "|" + item.color}
                        onClick={onMenuClosing}
                        data-color={item.color}
                    >{item.name}</MenuItem>);
                })}
            </Menu>
        </div>)
    }
}
