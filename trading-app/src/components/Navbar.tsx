import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to={"../webpages/Home.tsx"}></Link>
        <Link to={"../webpages/login"}></Link>
        <Link to={"../webpages/trading"}></Link>
    </div>
  )
}

export default Navbar