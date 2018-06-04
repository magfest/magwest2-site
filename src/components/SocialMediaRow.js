import React, { Component } from 'react';
import Link from './Link';
import '../utils/fontawesome-all.min.js';
import {Grid} from '@material-ui/core';

import SocialMediaButton from  './SocialMediaButton';

import styled from '../utils/styled';

const Row = styled(Grid)(theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

class SocialMediaRow extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }

  createSocialMediaIcons = () => {
    if(!this.props.icons){

      return [];
    }
    var icons = [];
    this.props.icons.forEach((item) => {
      icons.push(<SocialMediaButton alt={item.title} to={item.url} key={item.title} item={true} xs={2} icon={item.icon} />);
    })
    return icons;
  }

  render() {
    var icons = this.createSocialMediaIcons();
    return (
      <Row container >
        {icons}
      </Row>
    );
  }
}

export default SocialMediaRow
