import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import User from './components/User'
import Product from './components/Product'
import Order from './components/Order'
import Sidebar from './components/Sidebar'
// import Auth from './components/Auth'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <div className="distributer">
        <div className='dis_1'><Sidebar/></div>
        <div className='dis_2' >
       <Routes>
         <Route path='/' element={<Dashboard/>}></Route>
         <Route path='/User' element={<User/>}></Route>
         <Route path='/Product' element={<Product/>}></Route>
         <Route path='/Order' element={<Order/>}></Route>
         {/* <Route path='/Auth' element={<Auth/>}></Route> */}
       </Routes>
       </div>
       </div>
      </BrowserRouter>
    </>
  )
}

export default App
