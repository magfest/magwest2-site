import React, { Component } from 'react';
import {Grid, Typography} from '@material-ui/core';
import Link from './Link';
import styled from '../utils/styled';

const SocialMediaIcon = styled(Link)(theme => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
}));

const Holder = styled(Grid)(theme => ({
  margin: '10px 0'
}));

class SocialMediaButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      style: this.defaultStyle()
    }
  }

  defaultStyle = (newStyle) => {
    let propStyle = Object.assign({}, this.props.style ? this.props.style : {});
    let madeStyle = Object.assign({ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: 40, height: 40, margin: '0', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'blue', borderRadius: 5}, propStyle);
    return Object.assign(madeStyle, newStyle);
  }

  onMouseEnter = () => {
    this.setState({style: this.defaultStyle({backgroundColor: 'slateblue'})})
  }

  onMouseLeave = () => {
    this.setState({style: this.defaultStyle()})
  }

  onMouseDown = () => {
    this.setState({style: this.defaultStyle({backgroundColor: 'steelblue'})})
  }

  onMouseUp = () => {
    this.setState({style: this.defaultStyle({backgroundColor: 'slateblue'})})
  }

  render(){
    var Icon = this.props.icon ? this.props.icon : "fas fa-fire";
    var defaultIconStyle = {style: { width: '75%', height: '75%', color: 'white'}};
    var iconProps = this.props.iconProps ? Object.assign(defaultIconStyle, this.props.iconProps) : defaultIconStyle;

    return(
      <Holder item xs={this.props.xs ? this.props.xs : 2}>
        <div style={this.state.style} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
          <SocialMediaIcon target={this.props.target ? this.props.target : ''} to={this.props.to}>
            <i {...iconProps} className={Icon}></i>
            <Typography>
              {`${this.props.title ? this.props.title : ''}`}
            </Typography>
          </SocialMediaIcon>
        </div>
      </Holder>)
  }
}

export default SocialMediaButton;
