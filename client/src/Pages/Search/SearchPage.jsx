
import { useState } from "react";
import { SearchBar } from "../../assets/Component/SearchBar";
import { useLocation } from "react-router-dom";

const SearchPage = ({result}) => {
    console.log(result)
    const res = result;
return (
    <div className="p-8">
        <SearchBar/>
        <ul>
            {res.map((res, index) => (
                <li key={index}>{res}</li>
            ))}
        </ul>
    </div>
    )
};

export default SearchPage;