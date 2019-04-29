import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CodeIcon from '@material-ui/icons/Code';
import HelpIcon from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';

import * as Actions from "../Actions"
import { EmptyTestingCard } from '../models/TestingCards';
import store from "../Store";

export interface IAppDrawerProps {
    menuButtonClassName: any
}

interface IAppDrawerStates {
    isOpen: boolean
}

export class AppDrawer extends React.Component<IAppDrawerProps, IAppDrawerStates> {

    constructor(props: any) {
        super(props);
        this.state = { isOpen: false };
    }

    public render() {
        return <div>
            <IconButton className={this.props.menuButtonClassName} color="inherit" aria-label="Menu" onClick={this.onOpen}>
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor="left"
                open={this.state.isOpen}
                onOpen={this.onOpen}
                onClose={this.onClose}
            >
                <IconButton onClick={this.onClose}>
                    <ChevronLeftIcon />
                </IconButton>
                <Divider style={{ minWidth: "20em" }} />
                <List>
                    <div onClick={this.onClose}>
                        <ListItem button={true} onClick={this.onMenuShowHelp}>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Help" />
                        </ListItem>
                        <ListItem button={true} onClick={this.onMenuShowSourceCode}>
                            <ListItemIcon>
                                <CodeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Source Code" />
                        </ListItem>
                    </div>
                </List>
                <Divider />
            </SwipeableDrawer></div>
    }

    private onOpen = () => { this.setState({ isOpen: true }); };
    private onClose = () => { this.setState({ isOpen: false }); };
    private onMenuShowHelp = () => { store.dispatch(Actions.setTestingCard(EmptyTestingCard)); };
    private onMenuShowSourceCode = () => { window.open("https://github.com/cxuesong/display-testing-cards"); };

}