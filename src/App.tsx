// import Button from '@material-ui/core/Button';
import * as React from 'react';
import './App.css';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import * as ColorCard from './ColorCard';

const styles = {
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  root: {
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
      <div className="App" onMouseMove={onMouseMove}>
        {this.state.appBarVisible &&
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Display Testing Cards
            </Typography>
            </Toolbar>
          </AppBar>}
        <ColorCard.ColorCard color="blue" />
      </div>
    );
  }

}

export default withStyles(styles)(App);
