import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from '../utils/styled';
import { Typography, Grid, List, ListItem, ListItemText, ListSubheader, Avatar } from '@material-ui/core';
import Section from '../components/Section';
import TitleBar from '../components/TitleBar';

class IndexPage extends React.Component{

  constructor(props){
    super(props);
    props.title("2018")
    props.titleProps({
      leftLink: "/"
    })
  }

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
    let bandButtons = this.makeBandButtons();
    return (
      <Section>
        <Grid item xs={12}>
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
