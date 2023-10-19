
import { useState } from "react";
import { SearchBar, SearchModal } from "../../assets/Component/SearchBar";
import { useLocation } from "react-router-dom";
import { useDataContext } from "../../assets/Component/DataContext";
import { Searching } from "../../assets/Component/Cards";

const SearchPage = () => {
    const [modal,setmodal]=useState(false)
    function handleModal(){
        setmodal(!modal)
    }
    const res = useDataContext();
    // console.log(res.result)
return (
    <div className="">
        {modal && <div className="fixed w-full h-screen bg-neutral-gray z-10">
                <button className="fixed z-10 right-5 border border-black px-4 py-2 text-5xl font-bold text-red-600" onClick={handleModal}>X</button>

                <SearchModal/>
            </div>}
        <div className="p-8">
            <section className="mb-8" onClick={handleModal}>
                <SearchBar/>
            </section>
            <h1 className="text-3xl tracking-wide py-2 font-semibold">Search Result.</h1>
                <div className="grid grid-cols-1 place-items-left gap-2">
                {res.result.map((data) =>{
                    return(
                        <Searching
                        {...data}
                        />
                    )
                    
                })}
                </div>
        
        </div>
        
    </div>
    )
};

export default SearchPage;