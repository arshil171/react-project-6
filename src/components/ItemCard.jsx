import React, { useContext } from 'react'
import { AppContext } from '../App'
import { Link } from 'react-router-dom'
import { BsBagFill, BsBookmarkPlusFill } from 'react-icons/bs'

const ItemCard = ({ item }) => {
  const { collection, setCollection } = useContext(AppContext)

  const handleAddToCollection = (prod) => {
    setCollection([...collection, prod])
  }

  const handleRemoveFromCollection = (prod) => {
    setCollection(collection.filter(item => item._id !== prod._id))
  }

  const isCollected = collection.some(col => col._id === item._id)

  return (
    <div className="w-full h-[400px]  sm:w-1/2 md:w-1/3 lg:w-1/4 p-3">
      <div className="bg-white h-[400px] rounded-2xl shadow hover:shadow-lg transition-all duration-300 relative overflow-hidden">
        
        {/* Product Image */}
        <img
          src={item.bgImg}
          alt={item.title}
          className="w-full h-[250px] object-cover"
        />

        {/* Bookmark Icon */}
        <button
          onClick={() => isCollected ? handleRemoveFromCollection(item) : handleAddToCollection(item)}
          className={`absolute top-3 right-3 text-2xl transition-colors ${
            isCollected ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
          }`}
        >
          <BsBookmarkPlusFill />
        </button>

        {/* Category & Promotion Tags */}
        <div className="px-4 pt-3 flex justify-between text-xs text-gray-600">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            {item.category}
          </span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            {item.promotion}
          </span>
        </div>

        {/* Title */}
        <div className="px-4 flex justify-center items-center h-[60px] text-base color font-semibold  line-clamp-1">
          {item.title}
        </div>

        {/* Price Section */}
        <div className="px-4 mt-1 mb-4 relative flex items-center  h-[50px] w-[80%] space-x-2">
          {item.discount !== 0 && (
            <>
              <span className="text-red-600 absolute top-[0] font-medium text-sm">
                {item.discount * 100}% OFF
              </span>
              <span className="line-through absolute top-[20px] text-gray-400 text-sm">
                ${item.price.toFixed(2)}
              </span>
            </>
          )}
          <span className="text-black absolute left-[70px] top-[15px] font-bold text-lg">
            ${(item.price * (1 - item.discount)).toFixed(2)}
          </span>
        </div>

        {/* Bag Icon (Link to Details Page) */}
        <Link
          to={`/items/${item._id}`}
          className="absolute bottom-3 flex justify-center items-center right-3 w-[50px] h-[50px] bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
        >
          <i className=' text-[25px]'><BsBagFill className='' /></i>
        </Link>
      </div>
    </div>
  )
}

export default ItemCard
