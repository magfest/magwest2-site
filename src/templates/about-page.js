import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { Typography, Grid } from '@material-ui/core';
import styled from '../utils/styled';
import withRoot from '../utils/withRoot';
import Section from '../components/Section';
import Content from '../components/Content';
import Question from '../components/Question';

const Article = styled(Grid, { component: 'article' })(theme => ({
  padding: `${theme.spacing.unit * 2}px 0`,
}));

const AboutPage = ({ data, preview }) => {
  const { markdownRemark: page } = data;
  return (
    <Section spacing={0}>
      <Article style={{ position: 'relative'}}  item xs={11} sm={8} md={6}>
        <Helmet title={page.frontmatter.title} />
        <Typography variant="display1">{page.frontmatter.title}</Typography>
        <Content content={page.html} />
      </Article>
    </Section>
  );
};
export default AboutPage;

export const query = graphql`
  query GetAboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
