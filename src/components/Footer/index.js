import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Grid, Typography } from '@material-ui/core';
import logoImage from '../../images/logo.png';
import styled from '../../utils/styled';
import netlifyIdentity from 'netlify-identity-widget';
import NavButton from '../NavButton';
import BuyBadgeIcon from '@material-ui/icons/ShoppingCart';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import HomeIcon from '@material-ui/icons/Home';

const FooterWrapper = styled(Grid, {
  component: 'footer',
  container: true,
  spacing: 0,
  fontSize: '0.75em',
})(theme => ({
  background: theme.palette.background.default,
  bottom: '0',
  left: '0',
  height: '50px',
  '& a:link, & a:visited': {
    cursor: 'pointer',
    color: 'inherit',
    textDecoration: 'none',
  },
  '& a:hover, & a:active': {
    cursor: 'pointer',
    color: 'inherit',
    textDecoration: 'underline',
  },
  position: 'fixed'
}));
const Left = styled(Grid)(theme => ({
  textAlign: 'right',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));
const Middle = styled(Grid)(theme => ({
  textAlign: 'center',
  position: 'relative',
}));
const Right = styled(Grid)(theme => ({
  textAlign: 'left',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));
const FooterLink = styled(Link)(theme => ({
  display: 'inline-block',
}));
const Caption = styled(Typography, { variant: 'caption' })(theme => ({
  display: 'block',
  lineHeight: '80px',
  [theme.breakpoints.down('sm')]: {
    lineHeight: '40px',
  },
}));
const HomeButton = styled('div')(theme => ({
}));


let FooterPadding = { display : 'flex', alignItems: 'center'};


class Footer extends Component {
  constructor(props){
    super(props);
  }

  handleLogin = type => () => {
    netlifyIdentity.open(type);
  };
  render() {
    const { data: { site } } = this.props;
    var smallIcon = {width: '75%', height: '100%', color: 'white'};
    var ticketIcon = {width: '55%', height: '100%', color: 'white'};
    return (
      <FooterWrapper>
        <Left onClick={() => {this.props.goBack()}} style={FooterPadding} item xs={3}>
          <NavButton iconProps={smallIcon} icon={"fas fa-arrow-left"} />
        </Left>
        <Middle style={FooterPadding} item xs={6}>
          <NavButton to='/' icon={"fas fa-home"} iconProps={smallIcon} />
        </Middle>
        <Right style={FooterPadding} item xs={3}>
          <NavButton style={{ borderRadius: 5}} icon={"fas fa-shopping-cart"} target='_blank' iconProps={ticketIcon} to='https://west2018.uber.magfest.org/uber/preregistration/form' />

        </Right>
      </FooterWrapper>
    );
  }
}

export default Footer;
