// import Button from '@material-ui/core/Button';
import * as React from 'react';
import './App.css';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { AppDrawer } from './components/AppDrawer';
import { FullscreenSwitch } from './components/FullScreenSwitch';
import { ReduxColorCard } from './components/TestingCard';
import { ReduxColorPickerButton } from './components/TestingCardPicker';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    justifyContent: 'flex-end',
  },
};

class App extends React.PureComponent<any, { appBarVisible: boolean }> {

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
        <AppBar position="static"
          className={this.state.appBarVisible ? "fade-in" : "fade-out"}
          onMouseMove={onAppBarMouseMove}>
          <Toolbar>
            <AppDrawer classes={{ drawerHeader: classes.drawerHeader, menuButton: classes.menuButton }} />
            <Typography variant="h6" color="inherit" className={classes.flex}>
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
