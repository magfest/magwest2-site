import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Grid, Typography } from '@material-ui/core';
import logoImage from '../../images/logo.png';
import styled from '../../utils/styled';
import netlifyIdentity from 'netlify-identity-widget';
import NavButton from '../NavButton';
import BuyBadgeIcon from '@material-ui/icons/ShoppingCart';
import ContactIcon from '@material-ui/icons/Email';

const FooterWrapper = styled(Grid, {
  component: 'footer',
  container: true,
  spacing: 0,
  fontSize: '0.75em',
})(theme => ({
  background: theme.palette.background.default,
  padding: `0px 0`,
  bottom: '0',
  height: '125px',
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
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));
const Middle = styled(Grid)(theme => ({
  textAlign: 'center',
}));
const Right = styled(Grid)(theme => ({
  textAlign: 'left',
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
    this.state = {
      homeButtonStyle: this.defaultHomeButtonStyle()
    }
  }

  defaultHomeButtonStyle = (newStyle) => {
    return Object.assign({width: 50, height: 50, marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'blue', borderRadius: 50}, newStyle)
  }

  onMouseEnterHomeButton = () => {
    this.setState({
      homeButtonStyle: this.defaultHomeButtonStyle({backgroundColor: 'red'})
    });
  };

  onClickHomeButton = () => {
    this.setState({
      homeButtonStyle: this.defaultHomeButtonStyle({backgroundColor: 'violet'})
    })
  }

  onMouseLeaveHomeButton = () => {
    this.setState({
      homeButtonStyle: this.defaultHomeButtonStyle()
    });
  };

  handleLogin = type => () => {
    netlifyIdentity.open(type);
  };
  render() {
    const { data: { site } } = this.props;
    var smallIcon = {style: {width: '55%', height: '100%'}};
    var ticketIcon = {style: {width: '55%', height: '100%'}};
    return (
      <FooterWrapper>
        <Left style={FooterPadding} item xs={3}>
          <NavButton style={{ borderRadius: 5}} icon={BuyBadgeIcon} target='_blank' iconProps={ticketIcon} to='https://west2018.uber.magfest.org/uber/preregistration/form' />
        </Left>
        <Middle style={FooterPadding} item xs={6}>
          <NavButton to='/' iconProps={smallIcon} />
        </Middle>
        <Right style={FooterPadding} item xs={3}>
          <NavButton to='/about' iconProps={smallIcon} icon={ContactIcon} />
        </Right>
      </FooterWrapper>
    );
  }
}

export default Footer;
