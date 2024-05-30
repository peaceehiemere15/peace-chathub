import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  
  return (
    <div className='navbar'>
      <div className="user">
        <p style={{backgroundColor: '#5d5b8d', padding: '0 10px', borderRadius: '15px', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{ currentUser.displayName}</p>

        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar