import React, { Component } from 'react';
import './modal-style.css'

export class ModalWinner extends Component {
  render() {
    return (
      <div className='modal-winner'>
        <h1 className='winner'>{this.props.winner.name.toUpperCase()} WINS!</h1>
        <p className='winner-details'>{this.props.winner.reactionTime > 0 ? `Reaction time: ${this.props.winner.reactionTime}ms` : 'You shot too early!'}</p>
      </div>
    );
  }
}
