import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import styled from '../utils/styled';

const StyledTypography = styled(Typography)(theme => ({
  '& img': {
    maxWidth: '100%',
  },
  backgroundColor: 'pink',
  padding: '0 3px',
  borderRadius: '10px 10px 10px 0',
  maxWidth: '100%',
  minWidth: '25%',
  textAlign: 'left',
  margin: '0',
  position: 'relative',
  '& p, & h1, & h2, & h3, & h4, & h5, & h6': {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  }
}));

const Karet = styled('div')(theme => ({
  width: '10px',
  height: '10px',
  backgroundColor: 'red',
  position: 'absolute',
  bottom: '0',
  left: '0',
}));

class Answer extends Component {
  render() {
    const { content, ...props } = this.props;

    // Set prop defaults
    props.component = props.component || 'div';

    if (React.isValidElement(content)) {
      return <StyledTypography {...props}>{content}<Karet></Karet></StyledTypography>;
    }
    return (
      <StyledTypography
        {...props}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
}

export default Answer;
