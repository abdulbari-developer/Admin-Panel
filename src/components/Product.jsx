import React, { useState } from 'react'
import Product_List from './Product_List'
const Product = () => {
  const [selectCategory, setselectCategory] = useState('')
  const [product, setproduct] = useState(Product_List)
  const [id, setid] = useState(0)
  const [name, setname] = useState('')
  const [price, setprice] = useState(0)
  const [description, setdescription] = useState('')
  const [quantity, setquantity] = useState(0)
  const [category, setcategory] = useState('')
  const [image,setimage] =useState('')
  const [isUpdate, setisUpdate] = useState(false)
  let productCategory = ['Mobiles', 'Laptops', 'Chargers', 'Speakers', 'Gaming Console' ];

  const addProduct = (e)=>{
    let error = ''
     if(name ===''){
        error = 'Write Product name'
     }
     if(price <= 0 ){
      error = 'Add Product price'
     }
     if(description.length > 100|| description === ''){
      error='Description Length should be under 200 characters'
     }
     if(quantity===''){
      error='Write Product quantity '
     }
     if (image === '') {
      error='Give Product image URL'
     }
     if (category==='') {
      error='Choose Product category'
     }
     if(error!== ''){
      alert(error)
      return
     }
     e.preventDefault()
     let add = [...product];
     let newProduct = {
      id:Date.now()+Math.floor(Math.random()*1000),
      name,
      price,
      quantity,
    description,
    image,
    category,
     }
     add.push(newProduct)
     setproduct(add)
     handleClear()
  }
  
  const handleEdit = (id) =>{
     let edit= product.filter(item=> item.id === id)
     if(edit !== undefined){
      setisUpdate(true)
      setid(id)
      setname(edit[0].name)
      setprice(edit[0].price)
      setcategory(edit[0].category)
      setimage(edit[0].image)
      setdescription(edit[0].description)
      setquantity(edit[0].quantity)
     }
  }
  const handleUpdate = (e) =>{
  e.preventDefault()
  let index = product.map((item)=> {
    return item.id
  }).indexOf(id)
  let update =[ ...product]
  update[index].name = name,
  update[index].price = price,
  update[index].quantity = quantity,
  update[index].description = description,
  update[index].category = category,
  update[index].image = image,
  setproduct(update)
  setisUpdate(false)
  handleClear()
  }
  const handleDelete = (id) =>{
    
    let del=  product.filter(item=> item.id !== id);
    setproduct(del)
    handleClear()
  }
  const handleClear = () =>{

    {
      setid(0)
      setname('')
      setcategory('')
      setdescription('')
      setimage('')
      setprice()
      setquantity()
    }
  }
  const filterProduct = selectCategory?product.filter(item => item.category === selectCategory):product;
  return (
    <div className='products'>
      <h1 className="user-h">Products</h1>
      <div className="add-products">
        <form onSubmit={addProduct}>
          <input type="text" value={name} onChange={(e)=> setname(e.target.value)} placeholder='Product Name' />
          <input type="text" value={price} onChange={(e)=> setprice(e.target.value)} placeholder='Product Price' />
          <input type="text" value={description} onChange={(e)=> setdescription(e.target.value)} placeholder='Product description' />
          <input type="text" value={quantity} onChange={(e)=> setquantity(e.target.value)} placeholder='Product quantity' />
          <input type="text" value={image} onChange={(e)=> setimage(e.target.value)} placeholder='Product image URL' />
          <select value={category} onChange={(e)=> setcategory(e.target.value)}>
            <option value="">Select Category</option>
            {
              productCategory.map((item,index)=>(
                <option value={item} key={index}>{item}</option>
              ))
            }
          </select>{
          isUpdate?<button onClick={handleUpdate} className='btn-top btn-green' >Update</button>:<button type='submit' className='btn-top btn-green'>Add Product</button>
          }
          <button type='button' onClick={handleClear} className='btn-red'>Clear</button>
        </form>
        <div className="select">
          <select value={selectCategory} onChange={(e)=> setselectCategory(e.target.value)}>
            <option value="">All Category</option>
            {
              productCategory.map((item,index)=>(
                <option value={item} key={index}>{item}</option>
              ))
            }
          </select>
        </div>
        <div className="product-cards">
         {
          filterProduct.map( item => (
          <div className="card" key={item.id}>
            <h6 className='card-id'>{item.id}</h6>
            <div className="image">
              <img src={item.image} alt="image"/>
            </div>
            <h2 className='card-h'>{item.name}</h2>
            <span className='card-quantity'>{item.quantity}</span>
            <p className='card-desc'>{item.description.length>100? item.description.substring(0,100)+'...':item.description}</p>
            <p className='card-price'>price: ${item.price}</p>
            <div className="button-action">
              <button onClick={()=>handleEdit(item.id)} className='btn-edit'>Edit</button>
              <button onClick={()=>handleDelete(item.id)} className='btn-red'>Delete</button>
            </div>
          </div> 
        ))}
        </div>
      </div>
    </div>
  )
}

export default Product
