import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import ShopBagItem from './ShopBagItem'
import { BsFillWalletFill } from 'react-icons/bs'

const Bag = () => {
  const { bag: items } = useContext(AppContext)
  const [total , setTotal] = useState(0)

  const handleTotalPayment = ()=>{
    let total = items
    .map(item =>item.price * item.qty * (1-item.discount))
    .reduce((accumulator , currentValue)=>accumulator + currentValue , 0)
    .toFixed(2)
    return total
  }
  useEffect(()=>{
    setTotal(handleTotalPayment())
  } , [items])

  return (
    <div className=" w-[100vw] h-[80vh] flex justify-center  py-8 px-4 ">
      <div className="w-[90%] mx-auto -md rounded-lg p-6 relative top-[130px]">
        <h1 className="text-3xl font-bold mb-9 relative bottom-[20px] text-center">My Shopping Bag</h1>

        {items.length === 0 ? (
          <h2 className="text-xl text-center text-gray-500">Your Bag is empty?</h2>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full  table-auto divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-700 text-[16px] font-semibold">
                  <tr>
                    <th className="px-4 py-2 text-center">No.</th>
                    <th className="px-4 py-2 text-center">Preview</th>
                    <th className="px-4 py-2 text-center">Product</th>
                    <th className="px-4 py-2 text-center">Size</th>
                    <th className="px-4 py-2 text-center">Price</th>
                    <th className="px-4 py-2 text-center">Qty</th>
                    <th className="px-4 py-2 text-center">Discount</th>
                    <th className="px-4 py-2 text-center">Payment</th>
                    <th className="px-4 py-2 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <ShopBagItem index={index} key={item._id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
              <p className="text-lg font-medium">Total Items: {items.length}</p>

              {/* Placeholder for future checkout */}
              <div className="flex items-center gap-2 mt-4 sm:mt-0 relative top-[50px]">
                <span className="text-lg font-semibold block text-white">Total:{total} </span>
                
                <a href="#" className="bg-white text-black px-4 py-2 w-[200px]
                 h-[40px] rounded flex justify-center items-center gap-2 hover:bg-black hover:text-white">
                  Checkout <BsFillWalletFill />
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Bag
