import React, { Component } from 'react'
import './player.style.css'
export function Player({sprite, flipped}) {
  return (
    <img
      className={`dude ${flipped ? 'player-two' : 'player-one'}`}
      src={sprite}
      alt='player sprite'
    />
  )
}
