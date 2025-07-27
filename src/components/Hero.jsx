import React, { useEffect, useState, useContext } from 'react'
import './hero.css'
import axios from 'axios'
import { AppContext } from '../App'
import { BsBookmarkPlusFill } from 'react-icons/bs'
import { IoCartOutline } from 'react-icons/io5'
const Hero = () => {
  const { getData, setGetData } = useContext(AppContext)
  console.log(getData._id)
  return (
    <div className="banner">
      {
        getData && getData.map((item, index) => {
          return (
            <div className="item">
              <img src={item.bgImg} alt="" className={`bgImg ${item.active ? "active" :undefined}`} />
              <div  className={`content ${item.active ? "active" :undefined}`}>
                <div className='
                line'>________</div>
              <p className='para'>{item.subtitle}</p>
                <h1 className='head'>{item.title}</h1>
                <a href="#" className="mainButton"><p>Shop Now</p> <i><IoCartOutline /></i></a>
                <a href="#" className="markButton"><i><BsBookmarkPlusFill /></i></a>
              </div>
              <div className="subtitle">
                <span className="slogan1" >
                  Spring & Summer Collection
                </span>
                <span  className={`number ${item.active ? "active" :undefined}`}>
                  0{item._id}
                </span>
                <div className='line2'></div>
              </div>
            </div>
          )
        })
      }

    </div>



  )
}

export default Hero