import React from "react"
import Banner from "./Banner"
import Catogory from "./Catogory"
import Products from "./Products"
import Collections from "./Collections"
import BestSellers from "./BestSellers"
import Newsletters from "./Newsletters"


const Home = () => {
  return (
    <div>
      <Banner/>
      <Catogory/>
      <Products/>
      <Collections/>
      <BestSellers/>
      <Newsletters/>
    </div>
  )
}

export default Home