import React, { Component } from 'react';

export class Player extends Component {
  render() {
    return (
      <img
        className={`dude ${this.props.flipped ? 'player-two' : 'player-one'}`}
        src={this.props.sprite}
        alt='player sprite'
      />
    );
  }
}
