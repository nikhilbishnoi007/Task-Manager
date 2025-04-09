import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='nav'>
      <div className="logo">
        <h3>itask</h3>
      </div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#">Your Task</a></li>     
      </ul>
    </div>
  )
}

export default Navbar
