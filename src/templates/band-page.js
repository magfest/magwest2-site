import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Grid, Typography, IconButton } from '@material-ui/core';
import Info from '@material-ui/icons/Info';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { PlayArrow, Pause, SkipNext, SkipPrevious, Shuffle, Loop } from '@material-ui/icons';
import styled from '../utils/styled';
import Section from '../components/Section';
import Content from '../components/Content';
import Marquee from "react-smooth-marquee"
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

const BandTitle = styled(Grid, {
  container: true,
  spacing: 0
})(theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const TitleItem = styled(Grid, {
  item: true,
})(theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflowX: 'hidden',
}));

class BandPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      showSummary: false,
      paused: true
    }
    props.audio.updateSource(`/uploads/songs${props.location.pathname}song.mp3`);
    setTimeout(() => {
      this.props.audio.play();
      this.setState({
        paused: false
      });
    }, 100);
  }

  togglePlay = () => {
    this.props.audio.togglePlay();
    this.setState({
      paused: !this.state.paused
    })

  }

  render() {
    const { data: { markdownRemark: page }, preview } = this.props;
    let PlayingIcon = this.state.paused ? PlayArrow : Pause;
    return (
      <AudioContext.Consumer>
      { value => {
      return (<Section style={{padding: '0'}}>
        <Article item xs={12} sm={8}>

          <BandTitle>
            <TitleItem xs={2}>
              <IconButton  component={preview ? null : Link} to="/bands">
                <ArrowBack  style={{ fontSize: '48'}}  />
              </IconButton>
            </TitleItem>
            <TitleItem xs={8}>
            <Typography style={{ margin: '0 auto'}} variant="display1">{page.frontmatter.title}</Typography>
            </TitleItem>
            <TitleItem xs={2}>
              <IconButton onClick={() => {this.setState({
                showSummary: !this.state.showSummary
              })}}>
                <Info style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>

          </BandTitle>
          <div style={{ position: 'relative'}}>
            {this.state.showSummary ? <Content content={page.html} /> : <ArticleImage src={page.frontmatter.image} />}

          </div>

          <Grid container spacing={0}>
            <TitleItem xs={3}>
              <IconButton component={preview ? null : Link} to="/bands">
                <Shuffle style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>
            <TitleItem xs={2}>
              <IconButton component={preview ? null : Link} to="/bands">
                <SkipPrevious style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>
            <TitleItem xs={2}>
              <IconButton onClick={this.togglePlay}>
                <PlayingIcon  style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>
            <TitleItem xs={2}>
              <IconButton component={preview ? null : Link} to="/bands">
                <SkipNext style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>
            <TitleItem xs={3}>
              <IconButton component={preview ? null : Link} to="/bands">
                <Loop style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>
          </Grid>
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
