
import { useState } from "react";
import { SearchBar } from "../../assets/Component/SearchBar";

const SearchPage = (props) => {

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