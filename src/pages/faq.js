import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from '../utils/styled';
import { Typography, Grid, List, ListItem, ListItemText, ListSubheader, Avatar } from '@material-ui/core';
import Section from '../components/Section';
import Answer from '../components/Answer';
import Question from '../components/Question';

class FaqPage extends React.Component{
  state = {
    active: ''
  }

  makeConversation = () => {
    const {data} = this.props;
    // FAQ pages:
    let faqs = {};
    // Iterate through each post, putting all found FAQ pages into `faqs`
    data.allMarkdownRemark.edges.forEach(edge => {
      if(edge.node.frontmatter){
        let type = edge.node.fields.slug.indexOf("answer/") != -1 ? "answer" : null;
        type = edge.node.fields.slug.indexOf("question/") != -1 && type == null ? "question" : type;
        if (edge.node.frontmatter.key) {
          if(type){
            faqs[edge.node.frontmatter.key] = faqs[edge.node.frontmatter.key] ? faqs[edge.node.frontmatter.key] : {question: '', answer: ''}
            faqs[edge.node.frontmatter.key][type] = edge.node;
          }
        }
      }
    });

    let faqComponents = [];
    let questionStyle = { width: '75%', marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}
    let answerStyle = { width: '75%', marginRight: 'auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}
    Object.values(faqs).forEach(page => {
      if(page.question.frontmatter && page.answer.frontmatter){
        faqComponents.push(<ListItem key={`${page.question.frontmatter.key}ID`} id={page.question.frontmatter.key} ><ListItemText>{page.question.frontmatter.key}</ListItemText></ListItem>)
        faqComponents.push(<ListItem style={questionStyle} key={page.question.fields.slug}>
          <Question content={page.question.html} />
        </ListItem>);


        faqComponents.push(<ListItem style={answerStyle} key={page.answer.fields.slug}>
          <Answer content={page.answer.html} />
        </ListItem>);
      }

    })
    return faqComponents;

  };

  render() {
    const {data} = this.props;
    let faqs = this.makeConversation();
    return (
      <Section>
      <Typography style={{textAlign: 'center', position: 'sticky', top: 0, backgroundColor: 'white'}} variant="display1">Frequently Asked Questions</Typography>
        <Grid item xs={12}>
          <Helmet title="F.A.Q" />

          <List>
            {faqs}
          </List>
        </Grid>
      </Section>
    );
  }
}
export default FaqPage;

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
            key
          }
        }
      }
    }
  }
`;
