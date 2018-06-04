import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from '../utils/styled';
import { Typography, Grid, List, ListItem, ListItemText, ListSubheader, Avatar } from '@material-ui/core';
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
        <Link key={edge.node.fields.slug} to={edge.node.fields.slug}>
          <ListItem button divider key={edge.node.id}>
            <Avatar
              src={edge.node.frontmatter.image}
              alt={edge.node.frontmatter.title}
            />
            <ListItemText>
              {edge.node.frontmatter.title}
            </ListItemText>
          </ListItem>
        </Link>
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
            {bandButtons}
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
