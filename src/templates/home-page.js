import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from '../utils/styled';
import { Typography, Grid } from '@material-ui/core';
import Section from '../components/Section';
import App from '../components/App';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Info, Stars, MicNone, Computer, } from '@material-ui/icons';

class HomePage extends React.Component{
  state = {
    active: ''
  }
  componentDidMount = () => {
    this.props.title('MAGWest 2018 - A Work In Progress');
    this.props.titleProps({
      disableLeftIcon: true
    })
  }

  render() {
    const {data} = this.props;
    return (<Section>
        <Helmet title="Home" />
        <App to="/about" title="About" icon={'fas fa-info'} />
        <App to="https://west2018.uber.magfest.org/uber/panel_applications/index" target="_blank" title="Panels" icon={'fas fa-microphone'} />
        <App to="/faq" title="F.A.Q" icon={'far fa-question-circle'}/>
        <App to="/guests" title="Guests" icon={'far fa-star'} />
        <App to="/bands" title="Music" icon={'fas fa-music'}/>
        <App to="/codeofconduct" title="Code of Conduct" icon={'fas fa-book'}/>
      </Section>
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
