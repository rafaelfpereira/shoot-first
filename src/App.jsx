import React, { Component } from 'react';
import { Jogador } from './jogador.component';
import standingSprite from './standing.png';
import shootingSprite from './shooting.png';
import themeSong from './theme.mp3';
import gunshot from './gunshot.mp3';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.interval = setInterval(() => {
      this.runTimer();
      this.openFire();
    }, 1000);

    this.minTimer = 2;
    this.maxTimer = 20;

    this.timeToShoot = Math.floor(
      Math.random() * (this.maxTimer - this.minTimer + 1) + this.minTimer
    );

    this.theme = new Audio(themeSong);
    this.theme.play();
    this.gunshot = new Audio(gunshot);

    this.state = {
      shootTime: null,
      winner: null,
      warning: null,
      highNoon: false,
      timerCount: 0,
      spriteP1: standingSprite,
      spriteP2: standingSprite
    };
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  runTimer = () => {
    let timerCount = this.state.timerCount + 1;
    this.setState({ timerCount });
  };

  openFire = () => {
    if (this.state.timerCount === this.timeToShoot) {
      this.setState({
        shootTime: new Date(),
        warning: <h1 className='atirar'>SHOOT!</h1>,
        highNoon: true
      });
    }
  };

  shotsFired = event => {
    let reactionP1 = Infinity;
    let reactionP2 = Infinity;

    this.theme.pause();

    if (this.state.winner) {
      return;
    }

    if (!this.state.highNoon) {
      this.setState(
        { winner: event.key == 'f' ? 'PLAYER TWO' : 'PLAYER ONE' },
        () => {
          this.gunshot.play();

          if (this.state.winner === 'PLAYER TWO') {
            this.setState({ spriteP1: shootingSprite });
          } else {
            this.setState({ spriteP2: shootingSprite });
          }
        }
      );
      return;
    }

    if (event.key == 'f') {
      this.gunshot.play();

      reactionP1 = new Date().getTime() - this.state.shootTime.getTime();
      this.setState({ spriteP1: shootingSprite });
    } else if (event.key == 'j') {
      this.gunshot.play();

      reactionP2 = new Date().getTime() - this.state.shootTime.getTime();
      this.setState({ spriteP2: shootingSprite });
    } else {
      return;
    }

    if (reactionP1 < reactionP2) {
      this.setState({ winner: 'PLAYER ONE' });
    } else {
      this.setState({ winner: 'PLAYER TWO' });
    }
  };

  render() {
    let modal;

    if (this.state.winner) {
      clearInterval(this.interval);
      modal = (
        <div className='modal-winner'>
          <h1 className='winner'>{this.state.winner} WINS!</h1>
        </div>
      );
    }

    return (
      <div className='background'>
        {modal}
        <input
          type='text'
          className='shot-log'
          onKeyDown={this.shotsFired}
          ref={input => {
            this.nameInput = input;
          }}
        />
        <h2 className='timer'>{this.state.timerCount}</h2>
        <Jogador sprite={this.state.spriteP1} />
        <Jogador sprite={this.state.spriteP2} flipped={this.state.spriteP2} />
        {this.state.warning}
        <div className='chao' />
      </div>
    );
  }
}

export default App;
