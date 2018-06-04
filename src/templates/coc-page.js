import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { Typography, Grid } from '@material-ui/core';
import styled from '../utils/styled';
import withRoot from '../utils/withRoot';
import Section from '../components/Section';
import Content from '../components/Content';

const CodeOfConductPage = ({ data, preview }) => {
  const { markdownRemark: page } = data;
  return (
    <Section spacing={0} style={{ paddingTop: '1em'}}>
      <Grid item xs={11} sm={8} md={6}>
        <Helmet title={page.frontmatter.title} />
        <Content content={page.html} />
      </Grid>
    </Section>
  );
};
export default CodeOfConductPage;

export const query = graphql`
  query GetCocPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
