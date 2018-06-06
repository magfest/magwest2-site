import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Grid, Typography, IconButton } from '@material-ui/core';
import Info from '@material-ui/icons/Info';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { PlayArrow, Pause, SkipNext, SkipPrevious, Shuffle, Loop } from '@material-ui/icons';
import styled from '../utils/styled';
import Section from '../components/Section';
import Content from '../components/Content';
import SocialMediaRow from '../components/SocialMediaRow';

var screenHeight = '60%';

const Article = styled(Grid, { component: 'article' })(theme => ({
  padding: `0`,
}));

const Placeholder = styled('div')(theme => ({
  height: 366,
  backgroundColor: '#eee',
  textAlign: 'center',
  margin: `${theme.spacing.unit * 2}px 0`,
}));
const ArticleImage = styled('img')(theme => ({
  maxHeight: screenHeight,
  maxWidth: '100%',
  width: 'auto',
  height: screenHeight,

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
  maxHeight: '300px'
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
    setTimeout(() => {
      this.props.audio.updateSource(`/uploads/songs${this.props.location.pathname}song.mp3`);
      this.setState({
        paused: false,
      })
    }, 750);

  }

  componentDidMount = () => {
    this.props.title(this.props.data.markdownRemark.frontmatter.title);
    this.props.titleProps({
      rightButtonProps: {
        onClick: this.toggleInfo,
      },
      leftLink: '/bands',
      rightIconCSS: 'fas fa-info'
    });
  }

  toggleInfo = () => {
    this.setState({
      showSummary: !this.state.showSummary
    });
  }

  togglePlay = () => {
    this.props.audio.togglePlay();
    this.setState({
      paused: !this.state.paused
    })

  }

  render() {

    const { data: { markdownRemark: page }, preview } = this.props;
    const BandInfo = styled('div')(theme => ({
      height: screenHeight,
      width: '100%',
      position: 'relative',
      overflowY: 'hidden',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url('${page.frontmatter.image}')`
    }));
    let PlayingIcon = this.state.paused ? PlayArrow : Pause;
    return (<Section>
        <Article style={{ position: 'relative'}} item xs={12} sm={8}>
          <BandInfo style={{ backgroundImage: page.frontmatter.image}}>
            {this.state.showSummary ? <Content style={{ backgroundColor: 'white', margin: '0', padding: '0 10px', height: '100%', overflowY: 'scroll', position: 'relative'}} content={page.html} /> : null}

          </BandInfo>
          <SocialMediaRow style={{ height: '20%'}} icons={page.frontmatter.icons} />
          <Grid style={{ position: 'absolute', height: '10%', bottom: '10%'}} container spacing={0}>
          </Grid>
          <Grid style={{ position: 'absolute', height: '10%', bottom: 0}} container spacing={0}>
            <TitleItem xs={3}>
              <IconButton color={this.props.audio.shuffled ? 'primary' : 'secondary'} onClick={() => this.props.audio.shuffle()}>
                <Shuffle color={this.props.audio.shuffled ? 'secondary' : 'primary'} style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>
            <TitleItem xs={2}>
              <IconButton color='secondary' onClick={() => this.props.audio.previous(`${page.frontmatter.title}`)}>
                <SkipPrevious color='primary' style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>
            <TitleItem xs={2}>
              <IconButton color='secondary' onClick={this.togglePlay}>
                <PlayingIcon color='primary' style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>
            <TitleItem xs={2}>
              <IconButton color='secondary' onClick={() => this.props.audio.next(`${page.frontmatter.title}`)}>
                <SkipNext color='primary' style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>
            <TitleItem xs={3}>
              <IconButton color={this.props.audio.looping ? 'primary' : 'secondary'} onClick={this.props.audio.loop}>
                <Loop color={this.props.audio.looping ? 'secondary' : 'primary'} style={{ fontSize: '48'}} />
              </IconButton>
            </TitleItem>
          </Grid>
        </Article>
      </Section>
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
