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

class App extends Component {
  constructor(props) {
    super(props);
    // Initialize NetlifyIdentity
    typeof window !== 'undefined' && netlifyIdentity.init();
    this.audioRef = React.createRef();
    var audioSource = props.location.pathname.indexOf("bands/") != -1 ? `/uploads/songs${props.location.pathname}song.mp3` : "/uploads/songs/candy.mp3";
    console.log(props);
    this.state = {
      audioSource: audioSource
    };
  }

  updateAudioSource = (source) => {
    this.setState({
      audioSource: source
    });
  }

  createAudioObject = () => {
    return {
      ref: this.audioRef,
      updateSource: this.updateAudioSource,
      play: this.playAudio,
      pause: this.pauseAudio,
      paused: this.isPausedAudio,
      togglePlay: this.togglePlay
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
        <audio ref={this.audioRef} src={this.state.audioSource}/>
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
    }
  }
`;
