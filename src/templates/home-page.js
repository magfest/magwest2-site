import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from '../utils/styled';
import { Typography, Grid } from '@material-ui/core';
import Section from '../components/Section';
import App from '../components/App';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Info, Stars, MicNone, Computer, } from '@material-ui/icons';

import {AudioContext} from '../utils/music-player';

class HomePage extends React.Component{
  state = {
    active: ''
  }

  render() {
    const {data} = this.props;
    return (
      <AudioContext.Consumer>{value => {
      return (<Section>
        <Helmet title="Home" />
        <App to="/faq" title="F.A.Q" />
        <App to="/bands" title="Music" icon={MusicNoteIcon}/>
        <App to="/about" title="About" icon={Info}/>
        <App to="/codeofconduct" title="Code of Conduct"/>
        <App to="/lan" iconProps={{style: {width: '90%', height: '100%'}}} title="LAN" icon={Computer}/>
        <App to="/panels" title="Panels" icon={MicNone}/>
        <App to="/guests" title="Guests" icon={Stars}/>
      </Section>)}}</AudioContext.Consumer>
    );
  }
}
export default HomePage;

export const pageQuery = graphql`
  query AllIndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            audio
            image
            icons {
              icon
              title
              url
            }
          }
        }
      }
    }
  }
`;
