import React, { Component } from 'react';
import {Grid, Typography, IconButton} from '@material-ui/core';
import PropTypes from 'prop-types';
import Link from './Link';
import styled from '../utils/styled';
import { convertColorStringToRGBA } from '../utils/tools';

const defaultIcon = "fas fa-fire";

const Button = styled(IconButton)(theme => ({
  position: 'relative',
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  margin: '2rem 0',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: convertColorStringToRGBA(theme.palette.primary.main, 0.3),
  '& span': {
    height: '100%',
    flexDirection: 'column'
  }
}));

const Icon = styled('i')(theme => ({
  position: 'relative',
  color: theme.palette.secondary.main,
  fontSize: '100px',
  height: 150,
  borderRadius: 5,
}));

const StyledLink = styled(Link)(theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  flexDirection: 'column'
}));

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      style: this.defaultStyle()
    }
  }

  defaultStyle = (newStyle) => {
    let propStyle = Object.assign({}, this.props.style ? this.props.style : {});
    let madeStyle = Object.assign({ textAlign: 'center', width: 150, height: 150, margin: '2rem 0', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'blue', borderRadius: 5}, propStyle);
    return Object.assign(madeStyle, newStyle);
  }

  render(){
    var icon = this.props.icon ? this.props.icon : defaultIcon;

    return(<Grid style={{ display : 'flex', alignItems: 'center'}} item xs={6} sm={4} md={3}>


        <Link style={{textDecorationLine: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'column'}} to={this.props.to} target={this.props.target}>
          <Button>
            <Icon className={icon}/>
            <Typography variant="title">
              {`${this.props.title ? this.props.title : ''}`}
            </Typography>
          </Button>
        </Link>




      </Grid>)
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
};


export default App;
