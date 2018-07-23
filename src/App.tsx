// import Button from '@material-ui/core/Button';
import * as React from 'react';
import './App.css';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import { ColorCard } from './ColorCard';
import * as ColorCardPicker from './ColorCardPicker';

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
    const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      this.setState({
        appBarVisible: e.pageY <= Math.max(30, window.innerHeight * 0.2)
      });
    };
    return (
      <div className="App">
        {this.state.appBarVisible &&
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Display Testing Cards
            </Typography>
              <ColorCardPicker.ColorPickerButton />
            </Toolbar>
          </AppBar>}
        <div onMouseMove={onMouseMove}>
          <ColorCard color="blue" />
        </div>
      </div>
    );
  }

}

export default withStyles(styles)(App);
