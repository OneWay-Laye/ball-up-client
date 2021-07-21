import React from 'react'
import './Mininav.scss'

const Mininav = () => {
  return (
    <nav>
      <ul className='mininav'>
        <li className="mininav-link"><a href='#/park'>Parks</a></li>
        <li className="mininav-link"><a href='#/pickup'>Pick-Up Games</a></li>
      </ul>
    </nav>
  )
}

export default Mininav
