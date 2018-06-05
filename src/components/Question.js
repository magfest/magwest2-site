import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import styled from '../utils/styled';

const StyledTypography = styled(Typography)(theme => ({
  '& img': {
    maxWidth: '100%',
  },
  backgroundColor: 'lightblue',
  padding: '0 3px',
  borderRadius: '10px 10px 0 10px',
  maxWidth: '100%',
  minWidth: '25%',
  textAlign: 'left',
  margin: '0',
  '& p': {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  }
}));

class Question extends Component {
  render() {
    const { content, ...props } = this.props;

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
