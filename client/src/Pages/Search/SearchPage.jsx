
// import { useState } from "react";

// import Frame from "../Component/Frame";
// import { SearchBar } from "../Component/SearchBar";

// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
 
//     const results = [
//       { id: 1, title: "Result 1", description: "Description 1" },
//       { id: 2, title: "Result 2", description: "Description 2" },
//     ];
//     setSearchResults(results);
//   };

//   return (
//     <div className="p-8">
//       <SearchBar onSearch={handleSearch} />
//       <h2 className="text-2xl font-bold my-4">
//          {searchQuery}
//       </h2>
//       <Frame searchResults={searchResults} />
//     </div>
//   );
// };

// export default SearchPage;