import React, { Component } from 'react';
import {Grid, Typography, IconButton} from '@material-ui/core';
import Link from './Link';
import styled from '../utils/styled';

const defaultIcon = "fas fa-fire";

const Button = styled(IconButton)(theme => ({
  position: 'relative',
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Icon = styled('i')(theme => ({
  position: 'relative',
  color: theme.palette.secondary.main,
  width: '100%',
  height: '100%',
}));

const StyledLink = styled(Link)(theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%'
}));

class NavButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    var icon = this.props.icon ? this.props.icon : DefaultIcon;
    return(
      <Button>
        <StyledLink target={this.props.target ? this.props.target : ''} to={this.props.to}>
          <Icon className={icon} {...this.props.iconProps}></Icon>
          <Typography>
            {`${this.props.title ? this.props.title : ''}`}
          </Typography>
        </StyledLink>
      </Button>)
  }
}

export default NavButton;
