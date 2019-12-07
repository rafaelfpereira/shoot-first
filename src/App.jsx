import React, { Component } from 'react'
import { standing, shooting } from './assets/sprites'
import { gunshot, theme } from './assets/audio'
import { ModalWinner } from './modal-winner'
import { Background, Player } from './components'
import './App.css'

const MIN_TIMER = 2
const MAX_TIMER = 20

class App extends Component {
  constructor() {
    super()

    this.interval = null

    this.timeToShoot = Math.floor(
      Math.random() * (MAX_TIMER - MIN_TIMER + 1) + MIN_TIMER
    )

    this.gunshot = new Audio(gunshot)
    this.theme = new Audio(theme)

    this.state = {
      warning: null,
      highNoon: false,
      highNoonTime: null,
      timerCount: 0,
      playerOne: {
        name: 'playerOne',
        shotKey: 'f',
        sprite: standing,
        reactionTime: 0
      },
      playerTwo: {
        name: 'playerTwo',
        shotKey: 'j',
        sprite: standing,
        reactionTime: 0
      },
      winner: null,
      instructions: false
    }

    this.startState = this.state
  }

  componentDidMount() {
    this.gameStart()
    document.addEventListener('keydown', this.shotsFired)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown')
  }

  gameStart = () => {
    this.theme.play()

    this.interval = setInterval(() => {
      this.runTimer()
      this.openFire()
    }, 1000)
  }

  gameRestart = () => {
    this.gameStart()
    this.setState(this.startState)
  }

  gameEnd = () => {
    clearInterval(this.interval)
    this.theme.pause()
  }

  getPlayerByValidKeyPressed = key => {
    if (key === this.state.playerOne.shotKey) {
      return this.state.playerOne
    } else if (key === this.state.playerTwo.shotKey) {
      return this.state.playerTwo
    }

    return
  }

  runTimer = () => {
    let timerCount = this.state.timerCount + 1
    this.setState({ timerCount })
  }

  openFire = () => {
    if (this.state.timerCount === this.timeToShoot) {
      this.setState({
        highNoon: true,
        highNoonTime: new Date(),
        warning: <h1 className='high-noon'>SHOOT!</h1>
      })
    }
  }

  shotsFired = event => {
    if (this.state.winner) {
      return
    }

    const shooter = this.getPlayerByValidKeyPressed(event.key)

    if (shooter) {
      clearInterval(this.interval)
      this.theme.pause()
      this.gunshot.play()

      if (!this.state.highNoon) {
        this.setState({
          [shooter.name]: {
            ...shooter,
            sprite: shooting
          },
          winner:
            shooter.name === 'playerOne'
              ? this.state.playerTwo
              : this.state.playerOne
        })
      } else {
        const reactionTime =
          new Date().getTime() - this.state.highNoonTime.getTime()

        this.setState({
          [shooter.name]: {
            ...shooter,
            reactionTime,
            sprite: shooting
          },
          winner: { ...shooter, reactionTime }
        })
      }
    }
  }

  renderGame() {
    return (
      <Background>
        {this.state.winner && (
          <ModalWinner winner={this.state.winner} restart={this.gameRestart} />
        )}

        <h2 className='timer'>{this.state.timerCount}</h2>
        <Player sprite={this.state.playerOne.sprite} />
        <Player sprite={this.state.playerTwo.sprite} flipped />
        {this.state.warning}
        <div className='chao' />
      </Background>
    )
  }

  render() {
    return (
      <>
        {/* <ModalInstructions /> */}
        {this.state.instructions ? '' : this.renderGame()}
      </>
    )
  }
}

export default App
