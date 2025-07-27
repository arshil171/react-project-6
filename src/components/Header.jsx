import React, { useState } from 'react'
import './header.css'
import navListData from '../data/navListData'
import NavListitem from './NavListitem'
import { BsFillHouseHeartFill } from 'react-icons/bs'
import { FaHeart, FaShoppingBag } from 'react-icons/fa'

const Header = () => {
    const [navList , setNavList]= useState(navListData)
    return (
        <header>
            <a href="#" className="logo font-cursive "><img className='w-[90px]' src="../images/logo.png" alt="" /></a>
            <ul className="nav">
                {
                    navList.map(nav=>(

                       <NavListitem key={nav._id} nav ={nav}/>
                    ))
                }
            </ul>
            <div className="userItems">
                <a href="#" className="icon">
                 <i> <FaHeart /></i>
                 <span className="like">5</span>
                </a>
                 <a href="#" className="icon">
                 <i> <FaShoppingBag /></i>
                  <span className='bag'>3</span>
                </a>
                
            </div>
        </header>
    )
}

export default Header