import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Grid, Button } from '@material-ui/core';
import logoImage from '../../images/logo.png';
import styled from '../../utils/styled';
import ButtonAppBar from '../ButtonAppBar';

const HeaderWrapper = styled(Grid, {
  component: 'header',
  container: true,
  spacing: 16,
})(theme => ({
  background: theme.palette.background.default,
}));

class Header extends Component{
  render(){
    return (
      <HeaderWrapper>
      </HeaderWrapper>
    )
  }
}

export default Header;
