import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import styled from '../utils/styled';
import createFAQStyle from '../utils/faqStyles';



class Answer extends Component {
  render() {
    const { content, ...props } = this.props;

    // Set prop defaults
    props.component = props.component || 'div';
    const StyledTypography = styled(Typography)(theme => (createFAQStyle({
      padding: '0 3px',
      borderBottomLeftRadius: '0px',
      backgroundColor: theme.palette.secondary.light,
      width: content.indexOf("img") != -1 ? '100%' : 'auto',
    })));

    if (React.isValidElement(content)) {
      return <StyledTypography {...props}>{content}</StyledTypography>;
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
