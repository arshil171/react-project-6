import React, { useEffect, useState, useContext } from 'react'
import './hero.css'
import axios from 'axios'
import { AppContext } from '../App'
import { BsBookmarkPlusFill } from 'react-icons/bs'
import { IoCartOutline } from 'react-icons/io5'
import HeroSwiper from './HeroSwiper'
import { Link } from 'react-router'
const Hero = () => {
  const { getData, setGetData } = useContext(AppContext)

  const handleSlideChange = _id => {
    // console.log(id)
    const newItems = getData.map(item => {
      // item.active = false
      // if(item.id === id){
      //   item.active = true
      // }
      item.active = item._id === _id;
      return item;
    })
    setGetData(newItems)
  }
  return (
    <div className="banner">
      {getData && getData.map(item => {
        return (
          item.active && ( 
            <div key={item._id} className="item">
              <img src={item.bgImg} alt="" className="bgImg active" />
              <div className="content active">
                <div className="line">________</div>
                <p className="para">{item.subtitle}</p>
                <h1 className="head">{item.title}</h1>
                <Link to={`/items/${item._id}`} className="mainButton">
                  <p>Shop Now</p> <i><IoCartOutline /></i>
                </Link>
                <a href="#" className="markButton">
                  <i><BsBookmarkPlusFill /></i>
                </a>
              </div>

              <div className="subtitle">
                <span className="slogan1">
                  Spring & Summer Collection
                </span>
                <span className="number active">
                  0{item._id}
                </span>
                <div className="line2"></div>
              </div>
            </div>
          )
        )
      })}

      {getData && getData.length > 0 && <HeroSwiper slides={getData} slideChange={handleSlideChange} />}
    </div>



  )
}

export default Hero