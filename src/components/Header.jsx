import React, { useContext, useState } from 'react'
import './header.css'
import navListData from '../data/navListData'
import NavListitem from './NavListitem'
import { BsFillHouseHeartFill } from 'react-icons/bs'
import { FaHeart, FaShoppingBag } from 'react-icons/fa'
import { Link } from 'react-router'
import { AppContext } from '../App'

const Header = () => {
    const {collection , bag} = useContext(AppContext)
    const [navList , setNavList]= useState(navListData)

    return (
        <header>
            <a href="#" className="logo font-cursive ">Fashion</a>
            <ul className="nav">
                {
                    navList.map(nav=>(

                         <NavListitem key={nav._id} nav ={nav}/>
                    ))   
                }
            </ul>    
            <div className="userItems">
                <Link to='/collection' className="icon">
                 <i> <FaHeart /></i>
                 <span className="like">{collection.length}</span>
                </Link>
                 <Link to={'/bag'} className="icon">
                 <i> <FaShoppingBag /></i>
                  <span className='bag'>{bag.length}</span>
                </Link>
                
            </div>
        </header>
    )
}

export default Header