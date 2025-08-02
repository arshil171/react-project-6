import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import axios from 'axios'
import { Route, Routes } from 'react-router'
import ItemDetails from './pages/ItemDetails'
import Bag from './pages/Bag'
import Collection from './pages/Collection'

export const AppContext = React.createContext()

const App = () => {
  const [getData, setGetData] = useState([])

 
  const [bag, setBag] = useState(() => {
    const stored = localStorage.getItem('shoppingBag')
    return stored ? JSON.parse(stored) : []
  })

  
  const [collection, setCollection] = useState(() => {
    const stored = localStorage.getItem('collection')
    return stored ? JSON.parse(stored) : []
  })

  console.log(getData)

  async function handleData() {
    let data = await axios.get('http://localhost:3000/items')
    setGetData(data.data)
  }

  // Save bag and collection to localStorage when either changes
  useEffect(() => {
    localStorage.setItem('shoppingBag', JSON.stringify(bag))
  }, [bag])

  useEffect(() => {
    localStorage.setItem('collection', JSON.stringify(collection))
  }, [collection])

  useEffect(() => {
    handleData()
  }, [])

  return (
    <AppContext.Provider
      value={{ getData, setGetData, bag, setBag, collection, setCollection }}
    >
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='items/:id' element={<ItemDetails />} />
        <Route path='/bag' element={<Bag />} />
        <Route path='/collection' element={<Collection />} />
      </Routes>
    </AppContext.Provider>
  )
}

export default App
