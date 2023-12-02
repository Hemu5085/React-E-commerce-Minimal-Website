/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { FaFilter } from "react-icons/fa"
import Cards from '../../components/Cards';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default")

  useEffect(() =>{
    const fetchData = async () => {
      try{
        const response = await fetch("/products.json");
        const data = await response.json();
        // console.log(data)
        setProducts(data)
        setFilteredItems(data)

      } catch (error){
        console.log("Error fetching data:",error)
      }
    }
    fetchData()
  } , [])

  // filtering function 
  const filtereItems = (category) => {
       const filtered = category === "all" ? (products) : products.filter((item) => item.category === category);
       setFilteredItems(filtered);
       setSelectedCategory(category)

      }
      //  show all products 
      
      const showAll = () => {
        setFilteredItems(products);
        selectedCategory("all");
      }

      // sorting functionality

      const handleSortChange = (option) => {
        setSortOption(option);
     

      // logic for sorting 

      let sortedItems = [...filteredItems]
      
      switch (option) {
      case "A-Z" :
        sortedItems.sort((a,b) => a.title.localeCompare(b.title));
        break;

        case "Z-A" :
          sortedItems.sort((a,b) => b.title.localeCompare(a.title));
          break;

          case "low-to-high" :
            sortedItems.sort((a,b) => a.price - b.price);
            break;

            case "high-to-low" :
            sortedItems.sort((a,b) => b.price - a.price);
            break;
            default :
            break;
      }
      
      setFilteredItems(sortedItems)

    }

  
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12'>
      <h2 className='text-3xl font-semibold capitalize text-center my-8'>Or subscribe to the newsletter</h2>

      {/* products cards */}

      <div>
        <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>

          {/* all btn  */}
          <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap '>
            <button onClick={showAll} className='hover:text-orange-500'>All Products</button>
            <button onClick={() => filtereItems ("men's clothing") } className='hover:text-orange-500'>Men Clothing</button>
            <button onClick={() => filtereItems ("women's clothing") } className='hover:text-orange-500'>Women Clothing </button>
            <button onClick={() => filtereItems ("Hand bag")} className='hover:text-orange-500'>Bag</button>

          </div>

          {/* sorting option  */}
          <div className='flex justify-end mb-4 rounded-sm'>
            <div className='bg-Black p-2'>
              <FaFilter className='text-white h-4 w-4 ' />
            </div>
            <select 
            id='sort'
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            className='bg-Black text-white px-2 py-1 '>
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low-to-High</option>
              <option value="high-to-low">High-to-Low</option>
            </select>
          </div>
        </div>
      <Cards filteredItems={filteredItems}/>

      </div>
    </div>
  );
};

export default Products