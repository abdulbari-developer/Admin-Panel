import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
    <div className="left-side">
     <div className="side">
        <div className="logo">
            <h1>Admin Panel</h1>
        </div>
        <div className="links">
            <ul>
                 <Link className='link' to='/'><li>Dashboard</li></Link>
                 <Link className='link' to='/User'><li>Users</li></Link>
                 <Link className='link' to='/Product'><li>Products</li></Link>
                 <Link className='link' to='/Order'><li>Orders</li></Link>
            </ul>
        </div>
     </div> 
    </div>
    </>
  )
}

export default Sidebar
