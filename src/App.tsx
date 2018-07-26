// import Button from '@material-ui/core/Button';
import * as React from 'react';
import './App.css';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import { ReduxColorCard } from './ColorCard';
import { ReduxColorPickerButton } from './ColorCardPicker';
import { FullscreenSwitch } from './FullScreenSwitch';

const styles = {
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
};

class App extends React.Component<any, { appBarVisible: boolean }> {

  constructor(props: any) {
    super(props)
    this.state = { appBarVisible: true };
  }

  public render() {
    const { classes } = this.props;
    const onAppBarMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      this.setState({
        appBarVisible: true
      });
    };
    const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      this.setState({
        appBarVisible: false
      });
    };
    return (
      <div className="App">
        <AppBar position="static" style={{ opacity: this.state.appBarVisible ? undefined : 0 }} onMouseMove={onAppBarMouseMove}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Display Testing Cards
            </Typography>
            <FullscreenSwitch />
            <ReduxColorPickerButton />
          </Toolbar>
        </AppBar>
        <div onMouseMove={onMouseMove}>
          <ReduxColorCard />
        </div>
      </div>
    );
  }

}

export default withStyles(styles)(App);
