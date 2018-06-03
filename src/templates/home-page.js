import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from '../utils/styled';
import { Typography, Grid } from 'material-ui';
import Section from '../components/Section';
import App from '../components/App';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

import {AudioContext} from '../utils/music-player';

const List = styled('ul')(theme => ({
  padding: 0,
  margin: 0,
}));
const ListItem = styled('li')(theme => ({
  padding: `${theme.spacing.unit * 2}px 0`,
  margin: 0,
  borderBottom: '1px solid #eee',
  listStyleType: 'none',
  '&:last-child': {
    borderBottom: 'none',
  },
}));
const PostTitle = styled(Link)(theme => ({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
}));
const Placeholder = styled('div')(theme => ({
  backgroundColor: '#eee',
  minWidth: 100,
  marginRight: theme.spacing.unit * 3,
}));
const Thumbnail = styled('img')(theme => ({
  display: 'block',
  height: '100%',
  borderRadius: 3,
}));

class HomePage extends React.Component{
  state = {
    active: ''
  }

  makeBandComponents = () => {
    const {data} = this.props;
    return data.allMarkdownRemark.edges
      .filter(edge => edge.node.frontmatter.templateKey === 'band-page')
      .map(edge => (
        <ListItem style={this.state.active == edge.node.id ? {} : {display: 'none'}} key={edge.node.id}>
          <PostTitle to={edge.node.fields.slug}>
            <Typography variant="title">
              {edge.node.frontmatter.title}
            </Typography>
          </PostTitle>
          <Typography>{edge.node.excerpt}</Typography>
        </ListItem>
      ));
  };

  makeBandButtons = () => {
    const {data} = this.props;
    return data.allMarkdownRemark.edges
      .filter(edge => edge.node.frontmatter.templateKey === 'band-page')
      .map(edge => (
        <ListItem key={edge.node.id}>
          <div onClick={() => {this.setState({active: edge.node.id})}}>
            <Typography variant="title">
              {edge.node.frontmatter.title}
            </Typography>
          </div>
        </ListItem>
      ));
  };

  render() {
    const {data} = this.props;
    let bands = this.makeBandComponents();
    let bandButtons = this.makeBandButtons();
    return (
      <AudioContext.Consumer>{value => {
      return (<Section>
        <Helmet title="Home" />
        <App to="/faq" />
        <App to="/bands" icon={MusicNoteIcon}/>
        <App to="/faq"/>
        <App to="/faq"/>
        <App to="/faq"/>
        <App to="/faq"/>
        <App to="/faq"/>
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
