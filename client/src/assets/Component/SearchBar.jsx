/* eslint-disable react/prop-types */
export default function SearchBar({placeholder, data}){
    return(
      <div className="search">
        <div className="searchInput">
          <input type="text" placeholder={placeholder}/> 
          <div className="searchIcon">
  
          </div>
        </div>
        <div className="dataResult">
          {data.map((value,key)=>{
            return(
              <a className="dataItem" href={value.url} target="_blank">
                {" "}
                {value.title}{" "}
                </a>
            );})}
                
        </div>
      </div>
    )
  }