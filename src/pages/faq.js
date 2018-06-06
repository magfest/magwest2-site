import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from '../utils/styled';
import { Typography, Grid, List, ListItem, ListItemText, ListSubheader, Avatar } from '@material-ui/core';
import Section from '../components/Section';
import Answer from '../components/Answer';
import Question from '../components/Question';

class FaqPage extends React.Component{
  constructor(props){
    super(props);
    let faqs = {};
    // Iterate through each post, putting all found FAQ pages into `faqs`
    props.data.allMarkdownRemark.edges.forEach(edge => {
      if(edge.node.frontmatter.tag == 'faq'){
        if(!faqs[edge.node.frontmatter.date]){
          faqs[edge.node.frontmatter.date] = [];
        }
        faqs[edge.node.frontmatter.date].push(edge.node);
      }
    });

    let faqComponents = [];
    let defaultFAQStyle = { width: '75%', display: 'flex'};

    Object.keys(faqs).forEach(key => {
      faqComponents.push(<ListItem key={key} id={key} ><ListItemText style={{ textAlign: 'center'}}>{key}</ListItemText></ListItem>);
      faqs[key].forEach(item => {
        let Type = item.fields.slug.indexOf("answer/") != -1 ? Answer : item.fields.slug.indexOf("question/") != -1 ? Question : null;
        let FAQPosition = Type == Answer ? 'flex-start' : 'flex-end';
        let FAQStyle = {alignItems: FAQPosition, justifyContent: FAQPosition}
        let FAQMarginStyle = Type == Answer ? {marginRight: 'auto'} : { marginLeft: 'auto'};
        if(Type){
          faqComponents.push(<ListItem style={Object.assign({}, defaultFAQStyle, FAQStyle, FAQMarginStyle)} key={item.fields.slug}>
            <Type content={item.html} />
          </ListItem>);
        }
      });

    })
    this.state = {
      faqs: faqComponents
    };
    console.log(props);
    props.title('F.A.Q');
    props.titleProps({
      leftLink: '/'
    });

  }

  render() {
    return (
      <Section>
        <Grid item xs={12}>
          <Helmet title="F.A.Q" />
          <List>
            {this.state.faqs}
          </List>
        </Grid>
      </Section>
    );
  }
}
export default FaqPage;

export const pageQuery = graphql`
  query FAQIndexQuery {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
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
            date(formatString: "MM/DD/YY hh:mm:ssA")
            tag
            key
          }
        }
      }
    }
  }
`;
