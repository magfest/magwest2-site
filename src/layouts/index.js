import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import netlifyIdentity from 'netlify-identity-widget';
import { Grid } from 'material-ui';
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
  padding: `0 ${theme.spacing.unit * 2}px`,
  height: 'calc(100% - 125px)',
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
    console.log(props);
    this.state = {
      audioSource: props.data.markdownRemark && props.data.markdownRemark.page ? props.data.markdownRemark.page.frontmatter.audio : "/uploads/bands/songs/candy.mp3"
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
      paused: this.isPausedAudio
    }
  }

  playAudio = () => {
    this.audioRef.current.play();
  }

  pauseAudio = () => {
    this.audioRef.current.pause();
  }

  isPausedAudio = () => {
    return this.audioRef.current.paused;
  }

  render() {
    const { children, data: { site, markdownRemark: page} } = this.props;
    const audio = this.createAudioObject();
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { doSomething: () => {console.log("test")} }));
    return (
      <Wrapper>
        <Helmet
          title={site.siteMetadata.title}
          meta={[
            { name: 'description', content: site.siteMetadata.description },
          ]}
        />
        <audio ref={this.audioRef} src={this.state.audioSource}/>
        <Main><AudioContext.Provider value={{audio: audio}}>{children()}</AudioContext.Provider></Main>
        <Footer data={{ site }} onMouseEnter={() => {this.audioRef.current.play()}} />
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
