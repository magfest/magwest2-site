import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, IconButton } from '@material-ui/core';
import styled from '../utils/styled';
import Link from './Link';

const TitleBarWrapper = styled(Grid, {
  component: 'section',
  spacing: 0,
  justify: 'center',
  container: true,
})(theme => ({
  padding: '0',
  position: 'sticky',
  top: 0,
  textAlign: 'center',
  backgroundColor: theme.palette.secondary.main,
  zIndex: 100,
  width: '100%',
  height: '10% !important',
}));

const TitleBlock = styled(Grid, {
  item: true,
})(theme => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const TitleButton = styled(IconButton)(theme => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}));

const TitleIcon = styled('i')(theme => ({
  position: 'relative'
}));

const defaultTitleStyle = {};

class TitleBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      style: props.style ? Object.assign({}, defaultTitleStyle, props.style) : defaultTitleStyle,

    }
  }

  render(){
    const leftBlock = this.props.leftBlock ? this.props.leftBlock : <TitleButton {...this.props.leftButtonProps} >
      <TitleIcon className={`${this.props.leftIconCSS ? this.props.leftIconCSS : 'fas fa-arrow-left fa-2x'}`} />
    </TitleButton>;
    const rightBlock = this.props.rightBlock ? this.props.rightBlock : <TitleButton {...this.props.rightButtonProps} >
      <TitleIcon className={`${this.props.rightIconCSS ? this.props.rightIconCSS : 'fas fa-cog fa-2x'}`} />
    </TitleButton>;
    return (<TitleBarWrapper style={this.state.style}>
      <TitleBlock xs={3}>
        {this.props.leftLink ? <Link children={leftBlock} to={this.props.leftLink} /> : leftBlock}
      </TitleBlock>
      <TitleBlock xs={6}>
        <Typography variant="title">{this.props.title}</Typography>
      </TitleBlock>
      <TitleBlock xs={3}>
      {this.props.rightLink ? <Link children={rightBlock} to={this.props.rightLink} /> : rightBlock}
      </TitleBlock>

    </TitleBarWrapper>)
  }
}

TitleBar.propTypes = {
  title: PropTypes.string,
};

export default TitleBar;
