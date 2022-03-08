import React from 'react'
import Header from './Header'
import BotTable from './BotTable'
import Product from './Product'
import ErrorLog from './ErrorLog'

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