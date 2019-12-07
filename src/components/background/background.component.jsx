import React from 'react'
import './background.style.css'

export function Background(props) {
  return (
    <div className='background-body'>
      <div className='sky'></div>
      <div className='ground'></div>
      <div className='scene'>{props.children}</div>
    </div>
  )
}
