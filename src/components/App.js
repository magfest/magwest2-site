import React, { Component } from 'react';
import {Grid, Typography} from '@material-ui/core';
import Link from 'gatsby-link';
import DefaultIcon from '@material-ui/icons/QuestionAnswer';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      style: this.defaultStyle()
    }
  }

  defaultStyle = (newStyle) => {
    return Object.assign({ textAlign: 'center', width: 150, height: 150, margin: '2rem 0', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'blue', borderRadius: 5}, newStyle)
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
    var Icon = this.props.icon ? this.props.icon : DefaultIcon;
    return(<Grid item xs={6} sm={4} md={3}>

      <div style={this.state.style} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
        <Link to={this.props.to}>
          <Icon  style={{ width: '100%', height: '100%'}}/>
          <Typography>
            {`${this.props.title ? this.props.title : ''}`}
          </Typography>
        </Link>
      </div>



      </Grid>)
  }
}

export default App;
