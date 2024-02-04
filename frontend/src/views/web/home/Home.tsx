import React from 'react'
import Banner from './components/Banner'
import Stats from './components/Stats'
import ShopByArtist from './components/ShopByArtist'
import Newsletter from './components/Newsletter'
import { injectReducer } from '@/store'
import reducer from './store'
import ShopByTheme from './components/ShopByTheme'

injectReducer('home', reducer)

const Home = () => {

  return (
    <div>
      <Banner />
      <ShopByArtist />
      <Stats />
      <ShopByTheme />
      <Newsletter />
    </div>
  )
}

export default Home