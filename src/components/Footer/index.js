import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Grid, Typography } from '@material-ui/core';
import logoImage from '../../images/logo.png';
import styled from '../../utils/styled';
import netlifyIdentity from 'netlify-identity-widget';
import NavButton from '../NavButton';

const FooterWrapper = styled(Grid, {
  component: 'footer',
  container: true,
  spacing: 0,
  fontSize: '0.75em',
})(theme => ({
  background: theme.palette.background.default,
  bottom: '0',
  left: '0',
  height: '10%',
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
const Tile = styled(Grid)(theme => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
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
        <Tile style={FooterPadding} item xs={3}>
          <NavButton to="mailto:contact@magwest.org" iconProps={smallIcon} icon={"fas fa-envelope"} />
        </Tile>
        <Tile style={FooterPadding} item xs={6}>
          <NavButton to='/' icon={"fas fa-home"} iconProps={smallIcon} />
        </Tile>
        <Tile style={FooterPadding} item xs={3}>
          <NavButton style={{ borderRadius: 5}} icon={"fas fa-shopping-cart"} target='_blank' iconProps={ticketIcon} to='https://west2018.uber.magfest.org/uber/preregistration/form' />

        </Tile>
      </FooterWrapper>
    );
  }
}

export default Footer;
