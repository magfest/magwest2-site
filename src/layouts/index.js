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


import { NotificationStack, Notification } from 'react-notification';
import { OrderedSet } from 'immutable';
import TitleBar from '../components/TitleBar';
import Link from '../components/Link';

import ReactPlayer from 'react-player';

const Main = styled('main')(theme => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  margin: `0 -${theme.spacing.unit * 2}px`,
  height: '90%',
  overflowY: 'scroll',
  '& > section': {
    height: '90%'
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
  //console.log(source);
  source = source.substring(0, source.length-8);
  //console.log(source);
  return source;
}

class App extends Component {
  constructor(props) {
    super(props);
    // Initialize NetlifyIdentity
    typeof window !== 'undefined' && netlifyIdentity.init();
    this.audioRef = React.createRef();
    var audioSource = props.location.pathname.indexOf("bands/") != -1 ? `/uploads/songs${props.location.pathname}song.mp3` : "/uploads/songs/song.mp3";
    //console.log(props);
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
      notifications: OrderedSet(),
      notification: {
        isActive: false,
        action: 'Dismiss',
        dismissAfter: false,
        message: 'Band Name',
        title: 'Now Playing'
      },
      title: '',
      titleProps: {},
      playing: false,

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
      playlistOrder: this.createShuffledSetlist()
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

  loadFromPlaylist = (message) => {
    let playlist = this.state.playlist;
    let playlistOrder = this.state.playlistOrder;
    //console.log(this.state);
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
      message = null;
    }

    this.setState({
      playlistIndex: playlistIndex
    })
    this.updateAudioSource(newSource, nextSong, message);

  }

  loadFromPlaylistBackwards = (message) => {
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
      message = null;
    }
    this.setState({
      playlistIndex: playlistIndex
    })
    this.updateAudioSource(newSource, nextSong, message);
  }

  updateAudioSource = (source, key, message) => {
    this.setState({
      audioSource: source,
      activeSource: key ? key : trimSourceForPath(source)
    });
    setTimeout(() => {
      this.playAudio();
      if(message){
        this.addMusicNotification(message, key ? key : trimSourceForPath(source));
      }

    }, 300);
  }

  delayedPlayAudio = () => {
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
    this.setState({
      playing: true
    });

  }

  pauseAudio = () => {
    this.setState({
      playing: false
    });
  }

  isPausedAudio = () => {
    return !this.state.playing;
  }

  togglePlay = () => {
    this.setState({
      playing: !this.state.playing
    });
  }

  addMusicNotification (message, key) {
    return this.setState({
      notifications: this.state.notifications.add({
        message: message, // Name
        title: "Now Playing",
        key: key, // the band slug
        action: 'Dismiss',
        dismissAfter: false,
        onClick: (notification, deactivate) => {
          deactivate();
          this.removeMusicNotification(notification.key);
        },
      })
    });
  }

  removeMusicNotification (key) {
    this.setState({
      notifications: this.state.notifications.filter(n => n.key !== key)
    })
  }

  defaultStyleFactory = (index, style, notification) => {
    return Object.assign(
      {},
      style,
      { bottom: `${2 + index * 4}rem` }
    );
  }

  setTitle = (title) => {
    if(title == null){
      return this.state.title;
    }
    else{
      this.setState({
        title: title
      });
    }

  }

  setTitleProps = (props) => {
    if(props == null){
      return this.state.titleProps;
    }
    else{
      this.setState({
        titleProps: props
      })
    }
  }


  render() {
    const { children, data: { site, markdownRemark: page} } = this.props;
    const audio = this.createAudioObject();
    const notifications = this.state.notifications.toArray();
    return (
      <Wrapper>
        <Helmet
          title={site.siteMetadata.title}
          meta={[
            { name: 'description', content: site.siteMetadata.description },
          ]}
        />
        <ReactPlayer onError={this.delayedPlayAudio} onEnded={this.loadFromPlaylist} style={{ display: 'none'}} url={this.state.audioSource} playing={this.state.playing} />
        <Main>

        {this.state.title ? <TitleBar title={this.state.title} {...this.state.titleProps} /> : null }

        {children({...this.props, title: this.setTitle, titleProps: this.setTitleProps, audio: audio, createMusicNotification: this.addMusicNotification, removeMusicNotification: this.removeMusicNotification })}

        </Main>
        <Footer goBack={this.props.history.goBack} data={{ site }} />

        <NotificationStack            barStyleFactory={this.defaultStyleFactory} notifications={notifications} onDismiss={(notification) => {
            this.setState({
              notifications: this.state.notifications.delete(notification)
            })
          }} />
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
