import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { useDataContext } from "./DataContext";
/* eslint-disable react/prop-types */
export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center justify-center">
      <div className=" w-full md:w-3/4 lg:w-2/3 xl:w-1/2 ">
        <div className="flex space-x-1">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
          />
          {/* <button
            onClick={handleSearch}
            className="px-4 text-white bg-blue-600 rounded-full"
          >
            Search
          </button> */}
        </div>
      </div>
    </div>
  );
};

  export const SearchModal=({onSearch})=>{
    const [queryy, setQuery] = useState("");
    const {result,setResult}=useDataContext();
    const backendUrl = "http://127.0.0.1:5000"
    const handleSearch=async () => {
      try {
        
        const response = await axios.get(`${backendUrl}/search?query=${queryy}`);

        // console.log("Search results:", response.data);
        setResult(response.data)
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      }
    };
    const handleInputChange = (e) => {
      setQuery(e.target.value);
    };
  
    
  return(
    <div className="bg-black absolute w-screen h-screen">
    <div className="flex flex-start pt-4 justify-center">
      <div className=" w-full md:w-3/4 lg:w-2/3 xl:w-1/2 ">
        <div className="">
          <input
            type="text"
            value={queryy}
            onChange={handleInputChange}
            className="block text-xl w-full px-6 py-4 text-purple-700 bg-white border-white-200 focus:border-white-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-20"
            placeholder="Search..."
          />
          {/* the new link */}
          {/* {console.log(result)} */}
           <Link to={{pathname:"/Search",state:{result}}}> <button onClick={handleSearch} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full xl:rounded-2xl mr-4">
    Search
  </button>
</Link>
{/* Previous code */}
           {/* <Link to={{path:"/Search", state:{result}}}><button onClick={handleSearch}>Search</button></Link> */}
        </div>
      </div>
    </div>
    </div>
  )
}