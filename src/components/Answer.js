import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import styled from '../utils/styled';
import createFAQStyle from '../utils/faqStyles';

const StyledTypography = styled(Typography)(theme => (createFAQStyle({
  padding: '0 3px',
  borderBottomLeftRadius: '0px',
  backgroundColor: theme.palette.secondary.light,
})));

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
