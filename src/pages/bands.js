import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from '../utils/styled';
import { Typography, Grid, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import Section from '../components/Section';

class IndexPage extends React.Component{
  state = {
    active: ''
  }

  makeBandComponents = () => {
    const {data} = this.props;
    return data.allMarkdownRemark.edges
      .filter(edge => edge.node.frontmatter.templateKey === 'band-page')
      .map(edge => (
        <ListItem style={this.state.active == edge.node.id ? {} : {display: 'none'}} key={edge.node.id}>
          <Link to={edge.node.fields.slug}>
            <Typography variant="title">
              {edge.node.frontmatter.title}
            </Typography>
          </Link>
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
          <Link to={edge.node.fields.slug}>
            <Typography variant="title">
              {edge.node.frontmatter.title}
            </Typography>
          </Link>
        </ListItem>
      ));
  };

  render() {
    const {data} = this.props;
    let bands = this.makeBandComponents();
    let bandButtons = this.makeBandButtons();
    return (
      <Section>
      <Typography style={{textAlign: 'center', position: 'sticky', top: 0, backgroundColor: 'white'}} variant="display1">2018</Typography>
        <Grid item xs={12} sm={8}>
          <Helmet title="Bands" />

          <List>
            <ListItem style={this.state.active == '' ? {} : {display: 'none'}}>
            <List>
              {bandButtons}
            </List>
            </ListItem>
            {bands}
          </List>
        </Grid>
      </Section>
    );
  }
}
export default IndexPage;

export const pageQuery = graphql`
  query BandIndexQuery {
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
