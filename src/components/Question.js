import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import styled from '../utils/styled';
import createFAQStyle from '../utils/faqStyles';



class Question extends Component {
  render() {
    const { content, ...props } = this.props;
    const StyledTypography = styled(Typography)(theme => (createFAQStyle({
      padding: '0 3px',
      borderBottomRightRadius: '0px',
      backgroundColor: theme.palette.primary.light,
      width: content.indexOf("img") != -1 ? '100%' : 'auto',
    })));

    // Set prop defaults
    props.component = props.component || 'div';

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

export default Question;
