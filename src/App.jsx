import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import axios from 'axios';

export const AppContext = React.createContext();

const App = () => {
  const [getData, setGetData] = useState([])
  console.log(getData)
  async function handleData() {
    let data = await axios.get("http://localhost:3000/items")
    setGetData(data.data)

  }
  useEffect(() => {
    handleData()

  }, [])

  return (
    <>
      <AppContext.Provider value={{getData ,setGetData}}>
        <Header />
        <Home />
      </AppContext.Provider>

    </>
  )
}

export default App