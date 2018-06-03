import React from 'react';
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
const HeaderContent = styled(Grid)(theme => ({
  textAlign: 'center',
}));
const Navigation = styled('nav')(theme => ({
  padding: `${theme.spacing.unit * 2}px 0`,
}));
const Title = styled('h1')(theme => ({
  margin: 0,
}));
const Logo = styled('img')(theme => ({
  marginTop: theme.spacing.unit * 4,
  height: 196,
}));
const NavLink = styled(Button, { component: Link })(theme => ({
  color: 'gray',
}));

const myStyles = {
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
};

const Header = ({ data: { site } }) => (

  <HeaderWrapper style={{ position: 'sticky', top: 0}}>
    <ButtonAppBar site={site} />
    <audio src="/uploads/bands/songs/extra_lives/05 Chemical Plant Zone (From _Sonic the Hedgehog 2_).mp3" />
  </HeaderWrapper>
);

export default Header;
