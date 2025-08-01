import React, { useState } from 'react'
import Product_List from './Product_List'
import UserList from './User_List'

const Order = () => {
  const [selectedUser, setselectedUser] = useState('')
  const [selectedProduct, setselectedProduct] = useState('')
  const [quantity, setquantity] = useState(1)
  const [paymentMethod, setpaymentMethod] = useState('COD')
  const generateOrder = () => {
    return [
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        user: UserList[0],
        product: [
          {...Product_List[1],quantity:1}, {...Product_List[4], quantity:2}],
        paymentMethod: 'COD',
        status: 'pending'
      },
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        user: UserList[2],
        product: [{...Product_List[0], quantity:1}],
        paymentMethod: 'COD',
        status: 'delivered'
      },
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        user: UserList[1],
        product: [{...Product_List[2],quantity:3}],
        paymentMethod: 'Card',
        status: 'pending'
      },
    ]
  }

  const [orders, setorders] = useState(generateOrder())
  
  const addOrder = (e)=>{
    e.preventDefault()
    if(!selectedUser || !selectedProduct || !quantity){ 
      return alert('fill all the field')
    }
    let user = UserList.find(u => u.id === parseInt(selectedUser))
    let product = Product_List.find(u => u.id === parseInt(selectedProduct))
    let newOrder = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      user,
      product:[{...product, quantity : parseInt(quantity)}],
      paymentMethod,
      status:'pending',
    }
    setorders([...orders,newOrder])
    setselectedUser('')
    setselectedProduct('')
    setquantity(1)
  }
  return (
    <div className='sec order-sec'>
      <h1 className="user-h">Orders</h1>
        <div className="orderForm">
          <select value={selectedUser} onChange={(e)=> setselectedUser(e.target.value)}>
            <option value="">Select User</option>
            {UserList.map(value=> (
              <option value={value.id} key={value.id}>{value.name}</option>
            ))}
          </select>
          <select value={selectedProduct} onChange={(e)=> setselectedProduct(e.target.value)}>
            <option value="">Select User</option>
            {Product_List.map(value=> (
              <option value={value.id} key={value.id}>{value.name}</option>
            ))}
          </select>
          <input type="number" value={quantity} onChange={(e)=> setquantity(e.target.value)} placeholder='quantity..' />
          <select value={paymentMethod} onChange={(e)=> setpaymentMethod(e.target.value)}>
            <option value="COD">COD</option>
        <option value="Card">Card</option>
          </select>
          <button onClick={addOrder}>Add Order</button>
        </div>
      {orders.map(order => {
        const totalAmount = order.product.reduce((acc, item) => acc + (item.price * item.quantity), 0)

        return (
          <div className="order-card" key={order.id}>
            <h2>Order ID: {order.id}</h2>

            <div className="order-user">
              <h3>User Details</h3>
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email:</strong> {order.user.email}</p>
              <p><strong>Phone:</strong> {order.user.phone}</p>
            </div>

            <div className="order-products">
              <h3>Products:</h3>
              {order.product.map((prod, index) => (
                <div className="order-product" key={index}>
                  <img src={prod.image} alt={prod.name} width={80} />
                  <div>
                    <p><strong>{prod.name}</strong></p>
                    <p>Price: Rs {prod.price}</p>
                    <p>Quantity: {prod.quantity}</p>
                    <p>Total: Rs {prod.price * prod.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-payment">
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong style={{ color: 'green' }}>Grand Total:</strong> Rs {totalAmount}</p>
            </div>
            <hr />
          </div>
        )
      })}
    </div>
  )
}

export default Order
