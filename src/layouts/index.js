import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import netlifyIdentity from 'netlify-identity-widget';
import { Grid } from '@material-ui/core';
// Import Google Fonts
import 'typeface-open-sans';
import 'typeface-merriweather';
import 'typeface-roboto';
// Global styles
import './index.css';
// Relative imports
import withRoot from '../utils/withRoot';
import styled from '../utils/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { loginUser, logoutUser } from '../utils/identityActions';

import { AudioContext } from '../utils/music-player';

const Main = styled('main')(theme => ({
  backgroundColor: 'white',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  margin: `0 -${theme.spacing.unit * 2}px`,
  height: 'calc(100% - 50px)',
  overflowY: 'scroll',
  '& > section': {
    height: '100%'
  },
}));
const Wrapper = styled('div')(theme => ({
  padding: `0 ${theme.spacing.unit * 2}px`,
}));

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function trimSourceForPath(source){
  source = source.substring(14, source.length);
  console.log(source);
  source = source.substring(0, source.length-8);
  console.log(source);
  return source;
}

class App extends Component {
  constructor(props) {
    super(props);
    // Initialize NetlifyIdentity
    typeof window !== 'undefined' && netlifyIdentity.init();
    this.audioRef = React.createRef();
    var audioSource = props.location.pathname.indexOf("bands/") != -1 ? `/uploads/songs${props.location.pathname}song.mp3` : "/uploads/songs/song.mp3";
    console.log(props);
    var playlist = this.createSetlist();
    var playlistOrder = [];
    for(var i = 0; i < playlist.length; i++){
      playlistOrder.push(i);
    }
    this.state = {
      audioSource: audioSource,
      activeSource: props.location.pathname.indexOf("bands/") != -1 ? props.location.pathname : null,
      playlist: playlist,
      looping: false,
      shuffled: false,
      playlistOrder: playlistOrder,
      playlistIndex: 0,
    };
  }

  toggleLoop = () => {
    this.setState({
      looping: !this.state.looping
    });
  }

  toggleShuffle = () => {
    this.setState({
      shuffled: !this.state.shuffled,
      playlistIndex: 0,
      playlistOrder: createShuffledSetlist()
    });
  }

  createSetlist = () => {
    const {data} = this.props;
    let playlist = [];
    data.allMarkdownRemark.edges
      .filter(edge => edge.node.frontmatter.templateKey === 'band-page')
      .map(edge => {
        playlist.push(edge.node.fields.slug)
      });
    return playlist;
  };

  createShuffledSetlist = () => {
    let length = this.state.playlist.length;
    let newOrder = [];
    for(var i = 0; i < length; i++){
      if(getRandomIntInclusive(0, 1) == 0){
        newOrder.push(i);
      }else{
        newOrder.unshift(i);
      }
    }
    return newOrder;
  }

  loadFromPlaylist = () => {
    let playlist = this.state.playlist;
    let playlistOrder = this.state.playlistOrder;
    console.log(this.state);
    let playlistIndex = this.state.playlistIndex;
    if(playlistIndex < playlistOrder.length){
      playlistIndex = playlistIndex == playlistOrder.length-1 ? 0 : playlistIndex + 1;
      if(!this.state.looping && playlistIndex == 0){
        this.setState({
          playlistIndex: playlistIndex
        });
        return;
      }
    }
    let nextSong = playlist.length > 0 ? playlist[playlistIndex] : '/';

    let newSource = `/uploads/songs${nextSong}song.mp3`;

    if(this.props.location.pathname.indexOf("bands/") != -1 && nextSong != "/"){
      this.props.history.push(nextSong);
    }
    console.log(playlistIndex);
    this.setState({
      playlistIndex: playlistIndex
    })
    this.updateAudioSource(newSource);
  }

  loadFromPlaylistBackwards = () => {
    let playlist = this.state.playlist;
    let playlistOrder = this.state.playlistOrder;
    let playlistIndex = this.state.playlistIndex;
    if(playlistIndex < playlistOrder.length){
      playlistIndex = playlistIndex == 0 ? playlistOrder.length-1 : playlistIndex - 1;
      if(!this.state.looping && playlistIndex == playlistOrder.length-1){
        this.setState({
          playlistIndex: playlistIndex
        });
        return;
      }
    }
    let nextSong = playlist.length > 0 ? playlist[playlistIndex] : '/';

    let newSource = `/uploads/songs${nextSong}song.mp3`;

    if(this.props.location.pathname.indexOf("bands/") != -1 && nextSong != "/"){
      this.props.history.push(nextSong);
    }
    this.updateAudioSource(newSource);
  }

  updateAudioSource = (source) => {
    this.setState({
      audioSource: source,
      activeSource: source
    });
    setTimeout(() => {
      this.playAudio();
    }, 300);
  }

  createAudioObject = () => {
    return {
      ref: this.audioRef,
      updateSource: this.updateAudioSource,
      play: this.playAudio,
      pause: this.pauseAudio,
      paused: this.isPausedAudio,
      next: this.loadFromPlaylist,
      previous: this.loadFromPlaylistBackwards,
      togglePlay: this.togglePlay,
      currentSource: this.state.activeSource,
      shuffled: this.state.shuffled,
      shuffle: this.toggleShuffle,
      looping: this.state.looping,
      loop: this.toggleLoop,

    }
  }

  playAudio = () => {
    if(this.audioRef.current){
      this.audioRef.current.play();
    }

  }

  pauseAudio = () => {
    if(this.audioRef.current){
      this.audioRef.current.pause();
    }
  }

  isPausedAudio = () => {
    if(this.audioRef.current){
      return this.audioRef.current.paused;
    }
    return null;
  }

  togglePlay = () => {
    if(this.isPausedAudio()){
      this.playAudio();
      return true;
    }
    else{
      this.pauseAudio();
      return false;
    }
  }



  render() {
    const { children, data: { site, markdownRemark: page} } = this.props;
    const audio = this.createAudioObject();
    return (
      <Wrapper>
        <Helmet
          title={site.siteMetadata.title}
          meta={[
            { name: 'description', content: site.siteMetadata.description },
          ]}
        />
        <audio onEnded={this.loadFromPlaylist} ref={this.audioRef} src={this.state.audioSource}/>
        <Main>{children({...this.props, audio: audio})}</Main>
        <Footer goBack={this.props.history.goBack} data={{ site }} onMouseEnter={() => {this.audioRef.current.play()}} />
      </Wrapper>
    );
  }
}
App.propTypes = {
  children: PropTypes.func,
};
export default withRoot(App);

export const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
      }
    },
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
