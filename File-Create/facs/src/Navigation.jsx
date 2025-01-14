import React from 'react'
import { Link } from 'react-router-dom' 

function Navigation() {
  return (
    <>
    <nav>
        <Link to = "/" ></Link>
        <Link to = "/files" ></Link>
        <Link to = "/folders" ></Link>
    </nav>
    </>
  )
}

export default Navigation