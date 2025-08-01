import React, { useEffect, useState } from 'react'
import UserList from './User_List'
const User = () => {
  const [user, setUser] = useState(UserList);
  const [name, setname] = useState('')
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('')
  const [id, setId] = useState(0)
  const [isupdate, setupdate] = useState(false)


  useEffect(() => {
  setUser(user) 
  }, [])
  
  const handleAdd = (e) => {

    let error = ''
    if (name === '') {
      error = "write name"
    }

    if (email === '') {
      error = "write email"
    }
    if (phone === '' || phone.length !== 11) {
      error = "write phone number correctly and numbers length should equal to 11 "
    }
    if (error !== '') {
      alert(error)
      return;
    }
    e.preventDefault()
    let add = [...user];
    const newUser = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name,
      phone,
      email,
      isblocked: false
    }
    add.push(newUser)
    setUser(add)
    handleClear()
  }
  const toggleBlock = (id) => {
    const updatedUser = user.map(u =>
      u.id === id ? { ...u, isBlocked: !u.isBlocked } : u
    )
    setUser(updatedUser)
  }

  const handleEdit = (id) => {
    const edit = user.filter(item => item.id === id)
    if (edit !== undefined) {
      setupdate(true)
      setId(id)
      setname(edit[0].name),
        setemail(edit[0].email),
        setphone(edit[0].phone)``
    }
  }
  const handleUpdate = () => {
    e.preventDefault()
    let index = user.map((item) => {
      return item.id
    }).indexOf(id)

    let update = [...user]
    update[index].name = name,
      update[index].email = email,
      update[index].phone = phone,
      setUser(update)
    setupdate(false)
    handleClear()
  }
  const handleClear = () => {
    {
      setId(0)
      setname('')
      setphone('')
      setemail('')
      setupdate(false)
    }
  }
  const handleDelete = (deletedId) => {
    const del = user.filter(item => item.id !== deletedId)
    setUser(del)
    handleClear()
  }
  return (
    <div className='user-sec sec'>
      <h1 className="user-h">Users</h1>
      <div className="add-user">
        <div>
          <form onSubmit={handleAdd}>
            <input type="text" onChange={(e) => setname(e.target.value)} placeholder='Enter Name' value={name} />
            <input type="email" onChange={(e) => setemail(e.target.value)} placeholder='Enter Email' value={email} />
            <input type="number" onChange={(e) => setphone(e.target.value)} placeholder='Enter Phone' value={phone} />
            {isupdate ? <button className='btn-top btn-green' onClick={handleUpdate}>Update</button> : <button className='btn-top btn-green' type='submit'>Add User</button>}
            <button type='button' onClick={handleClear} className='btn-red'> Clear</button>
          </form>
        </div>
      </div>
      <div className="all-users">
        {
          user.map((u) => (
            <table className="user" key={u.id}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone NO</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='id'>{u.id}</td>
                  <td className="name">{u.name}</td>
                  <td className="email">{u.email}</td>
                  <td className="phone">{u.phone}</td>
                  <td><button className='btn' onClick={() => toggleBlock(u.id)} style={u.isBlocked ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}>{u.isBlocked ? "Blocked" : "Active"}</button>
                    <button className='btn-edit' onClick={() => handleEdit(u.id)}>Edit</button>
                    <button className='btn-red' onClick={() => handleDelete(u.id)}>Delete</button></td>
                </tr>
              </tbody>

            </table>
          ))
        }
      </div>
    </div>
  )
}

export default User
