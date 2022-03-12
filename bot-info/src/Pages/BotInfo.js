import React from 'react'
import Header from '../components/Header'
import BotTable from '../components/BotTable'
import Product from '../components/Product'
import ErrorLog from '../components/ErrorLog'

const BotInfo = () => {
  return (
    <div>
      <Header />
      <Product />
      <BotTable />
      <ErrorLog />
    </div>
  );
}

export default BotInfo