import React, { useContext } from 'react'
import Header from '../components/Header'
import BotTable from '../components/BotTable'
import Product from '../components/Product'
import ErrorLog from '../components/ErrorLog'
import ContextStore from '../Context/ContextStore'

const BotInfo = () => {
  const {contextStore, setContextStore} = useContext(ContextStore)
  return (
    <div>
      <Header />
      <Product />
      <BotTable />
      <ErrorLog data = {contextStore.storeErrors}/>
    </div>
  );
}

export default BotInfo