import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Grid, Typography } from 'material-ui';
import logoImage from '../../images/logo.png';
import styled from '../../utils/styled';
import netlifyIdentity from 'netlify-identity-widget';

const FooterWrapper = styled(Grid, {
  component: 'footer',
  container: true,
  spacing: 16,
  fontSize: '0.75em',
})(theme => ({
  background: theme.palette.background.default,
  padding: `0px 0`,
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


let verticalPadding = 25;
let FooterPadding = {paddingTop: verticalPadding, paddingBottom: verticalPadding};


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
    return (
      <FooterWrapper style={{ position: 'sticky', bottom: 0}}>
        <Left style={FooterPadding} item xs={3}>
          <a href="https://west2018.uber.magfest.org/uber/preregistration/form" target="_blank">
            <HomeButton onMouseEnter={this.onMouseEnterHomeButton} onMouseUp={this.onMouseEnterHomeButton} onMouseDown={this.onClickHomeButton} onMouseLeave={this.onMouseLeaveHomeButton} style={this.state.homeButtonStyle}>
            </HomeButton>
          </a>
        </Left>
        <Middle style={FooterPadding} item xs={6}>
          <Link to="/">
            <HomeButton onMouseEnter={this.onMouseEnterHomeButton} onMouseUp={this.onMouseEnterHomeButton} onMouseDown={this.onClickHomeButton} onMouseLeave={this.onMouseLeaveHomeButton} style={this.state.homeButtonStyle}>
            </HomeButton>
          </Link>
        </Middle>
        <Right style={FooterPadding} item xs={3}>
          <Link to="/">
            <HomeButton onMouseEnter={this.onMouseEnterHomeButton} onMouseUp={this.onMouseLeaveHomeButton} onMouseDown={this.onClickHomeButton} onMouseLeave={this.onMouseLeaveHomeButton} style={this.state.homeButtonStyle}>
            </HomeButton>
          </Link>
        </Right>
      </FooterWrapper>
    );
  }
}

export default Footer;
