import React, { useContext } from 'react'
import './collection.css'
import { AppContext } from '../App'
import ItemCard from '../components/ItemCard'

const Collection = () => {
  const { collection: items } = useContext(AppContext)
  return (
    <div className='collection'>
      <div className="container">
        <div className="row">
          <h1>My Collection</h1>
        </div>
        <div className='row'>

          {!items || items.length === 0 ? (
            <h2 className="text-xl text-center text-gray-500">Your Bag is empty?</h2>
          ) : (items.map(item => <ItemCard key={item._id} item={item} />))}
        </div>
      </div>
    </div>
  )
}

export default Collection