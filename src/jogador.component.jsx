import React, { Component } from 'react';

export class Jogador extends Component {
  render() {
    if (this.props.flipped) {
      return (
        <img
          src={this.props.sprite}
          alt='#'
          className='boneco player-two'
          style={{ transform: 'scaleX(-1)' }}
        />
      );
    }

    return <img src={this.props.sprite} alt='#' className='boneco player-one' />;
  }
}
