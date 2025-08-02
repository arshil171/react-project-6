import React, { useContext } from 'react'
import { AppContext } from '../App'

const ShopBagItem = ({ item, index }) => {
  const { bag, setBag } = useContext(AppContext)

  const handleRemoveFromBag = (prod) => {
    setBag(bag.filter((item) => item._id !== prod._id))
  }

  return (
    <tr className="text-center text-sm text-gray-700">
      <td className="py-2">{index + 1}</td>
      <td className="py-2">
        <img src={item.bgImg} className="w-16 h-16 relative left-[40px] object-cover mx-auto" alt={item.title} />
      </td>
      <td className="py-2">{item.title}</td>
      <td className="py-2">{item.size || 'M'}</td>
      <td className="py-2">₹{item.price.toFixed(2)}</td>
      <td className="py-2">{item.qty || 1}</td>
      <td className="py-2">{(item.discount * 100).toFixed(0)}%</td>
      <td className="py-2">₹{(item.price * (1 - item.discount)).toFixed(2)}</td>
      <td className="py-2">
        <button
          onClick={() => handleRemoveFromBag(item)}
          className="text-red-600 hover:underline"
        >
          Remove
        </button>
      </td>
    </tr>
  )
}

export default ShopBagItem
