import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from '../utils/styled';
import { Typography, Grid, List, ListItem, ListItemText, ListSubheader, Avatar } from '@material-ui/core';
import Section from '../components/Section';
import Answer from '../components/Answer';
import Question from '../components/Question';

class IndexPage extends React.Component{
  state = {
    active: ''
  }

  faqSort = (value1, value2) => {
    if(value1.frontmatter.title < value2.frontmatter.title){
      return -1;
    }
    else if(value1.frontmatter.title > value2.frontmatter.title){
      return 1;
    }
    else{
      return 0;
    }
  }

  makeConversation = () => {
    const {data} = this.props;
    // FAQ pages:
    let faqs = {};
    // Iterate through each post, putting all found FAQ pages into `faqs`
    data.allMarkdownRemark.edges.forEach(edge => {
      console.log(edge);
      if(edge.node.frontmatter){
        if (edge.node.frontmatter.key) {
          if(edge.node.frontmatter.type){
            faqs[edge.node.frontmatter.key] = faqs[edge.node.frontmatter.key] ? faqs[edge.node.frontmatter.key] : {question: '', answer: ''}
            faqs[edge.node.frontmatter.key][edge.node.frontmatter.type] = edge.node;
          }
        }
      }
    });

    let faqComponents = [];
    let questionStyle = { width: '75%', marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}
    let answerStyle = { width: '75%', marginRight: 'auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}
    Object.values(faqs).forEach(page => {
      faqComponents.push(<ListItem style={questionStyle} key={page.question.frontmatter.slug}>
        <Question content={page.question.html} />
      </ListItem>);
      faqComponents.push(<ListItem style={answerStyle} key={page.answer.frontmatter.slug}>
        <Answer content={page.answer.html} />
      </ListItem>);
    })
    return faqComponents;

  };

  render() {
    const {data} = this.props;
    let faqs = this.makeConversation();
    return (
      <Section>
      <Typography style={{textAlign: 'center', position: 'sticky', top: 0, backgroundColor: 'white'}} variant="display1">Frequently Asked Questions</Typography>
        <Grid item xs={12} sm={8}>
          <Helmet title="F.A.Q" />

          <List>
            {faqs}
          </List>
        </Grid>
      </Section>
    );
  }
}
export default IndexPage;

export const pageQuery = graphql`
  query FAQIndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tag
            type
            key
          }
        }
      }
    }
  }
`;
