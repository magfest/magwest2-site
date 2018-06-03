import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Grid, Typography, IconButton } from 'material-ui';
import ArrowLeft from 'mdi-material-ui/ArrowLeft';
import styled from '../utils/styled';
import Section from '../components/Section';
import Content from '../components/Content';
import {AudioContext} from '../utils/music-player';

const Article = styled(Grid, { component: 'article' })(theme => ({
  padding: `${theme.spacing.unit * 2}px 0`,
}));

const Placeholder = styled('div')(theme => ({
  height: 366,
  backgroundColor: '#eee',
  textAlign: 'center',
  margin: `${theme.spacing.unit * 2}px 0`,
}));
const ArticleImage = styled('img')(theme => ({
  objectFit: 'cover',
  width: '100%',
  height: 366,
}));
const ArticleTitle = styled('div')(theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

class BandPage extends Component {


  render() {
    const { data: { markdownRemark: page }, preview } = this.props;
    return (
      <AudioContext.Consumer>
      { value => {
      return (<Section>
        <Article item xs={12} sm={8}>
          <ArticleImage src={page.frontmatter.image} />
          <ArticleTitle>
            <Typography onClick={() => {value.audio.updateSource(page.frontmatter.audio);value.audio.play()}} variant="display1">{page.frontmatter.title}</Typography>
            <IconButton component={preview ? null : Link} to="/bands">
              <ArrowLeft />
            </IconButton>
          </ArticleTitle>
          <Content content={page.html} />
        </Article>
      </Section>)}}
      </AudioContext.Consumer>
    );
  }
}

export default BandPage;

export const pageQuery = graphql`
  query BandPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        publishDate(formatString: "MMMM DD, YYYY")
        title
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
`;
