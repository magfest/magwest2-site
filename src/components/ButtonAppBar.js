import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Link from 'gatsby-link';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  flatLink: {
    textDecorationLine: 'none'
  },
};

class ButtonAppBar extends React.Component{
  state = {
    nav: false,
    name: ''
  }

  toggleDrawer = (open) => {
    this.setState({
      nav: open
    })
  }

  render(){
    const { classes, site } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => this.toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link className={classes.flatLink} to="/">{site.siteMetadata.title}</Link>
            </Typography>
            <a target="_blank" href="https://west2018.uber.magfest.org/uber/preregistration/form"><Button color="inherit">Buy Your Badge!</Button></a>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.nav} onClose={() => this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer(false)}
            onKeyDown={() => this.toggleDrawer(false)}
          >
            <div className={classes.list}>
              <List>
              <Link to="/about">
                <ListItem>
                  <Avatar>
                    <MusicNoteIcon />
                  </Avatar>
                  <ListItemText>About</ListItemText>
                </ListItem>
              </Link>
                <Link to="/bands">
                  <ListItem>
                    <Avatar>
                      <MusicNoteIcon />
                    </Avatar>
                    <ListItemText>Bands</ListItemText>
                  </ListItem>
                </Link>
                <Link to="/blog">
                  <ListItem>
                    <Avatar>
                      <MusicNoteIcon />
                    </Avatar>
                    <ListItemText>Blog</ListItemText>
                  </ListItem>
                </Link>
                <Link to="/contact">
                  <ListItem>
                    <Avatar>
                      <MusicNoteIcon />
                    </Avatar>
                    <ListItemText>Contact</ListItemText>
                  </ListItem>
                </Link>
                <Link to="/codeofconduct">
                  <ListItem>
                    <Avatar>
                      <MusicNoteIcon />
                    </Avatar>
                    <ListItemText>Code of Conduct</ListItemText>
                  </ListItem>
                </Link>
                <Link to="/faq">
                  <ListItem>
                    <Avatar>
                      <MusicNoteIcon />
                    </Avatar>
                    <ListItemText>F.A.Q</ListItemText>
                  </ListItem>
                </Link>
              </List>
            </div>

          </div>
        </Drawer>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
