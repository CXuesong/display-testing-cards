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
        <AppBar position="static"
          className={this.state.appBarVisible ? "fade-in" : "fade-out"}
          onMouseMove={onAppBarMouseMove}>
          <Toolbar>
            <AppDrawer menuButtonClassName={classes.menuButton} />
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
