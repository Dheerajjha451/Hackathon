
import { useState } from "react";
import { SearchBar, SearchModal } from "../../assets/Component/SearchBar";
import { useLocation } from "react-router-dom";
import { useDataContext } from "../../assets/Component/DataContext";
import Sum_Block from "../../assets/Component/Sum_Block";
import Categories from "../../assets/Component/Categories";

const SearchPage = () => {
    const [isOpen,setIsOpen]=useState(false);

    const [selectedArtcile,setSelectedContent]=useState({});

    const OpenSumm=(content)=>{
        setIsOpen(true);
    }
    const closeSumm=()=>{
        setIsOpen(false);
        
    }
    const handleArticleClick=(article)=>{
        setSelectedContent(article);
        OpenSumm();
    }
    const [modal,setmodal]=useState(false)
    function handleModal(){
        setmodal(!modal)
    }
    const res = useDataContext();
    // console.log(res.result)
return (
    <div className="py-0">
        
        {modal && <div className="fixed w-full h-screen bg-neutral-gray z-10">
        <button className="fixed z-10 right-5 border border-black px-4 py-2 text-5xl font-bold text-red-600" onClick={handleModal}>X</button>
        <SearchModal />
      </div>}
        <div className="p-8">
            <div className="w-full bg-white pt-12 pb-4">
                <Categories />
            </div>
          <hr className="border-1 border-black py-2 w-11/12" />

            <section className="mb-8" onClick={handleModal}>
                <SearchBar/>
            </section>
            <div className="grid place-items-center">
            <div className="grid gap-4 text-justify w-1/2">
                <h1 className="text-3xl tracking-wide py-2 font-bold text-gray-400">Search Result.</h1>
                <div className="grid grid-cols-1 place-items-left gap-2">
                {res.result.map((data) =>{
                    return(
                        <div className="drop-shadows-md py-2 ">
                            <h2 className="text-2xl font-bold">{data.title}</h2>
                            <p className="text-lg font-semibold">{data.description}</p>
                            <button onClick={() => handleArticleClick(data)} className="text-blue-500 bg-white-100 active:bg-blue-500 active:text-white font-semibold text-lg">Read More</button>
                        </div>
                    )
                    
                })}
                </div>
                <Sum_Block
                    isOpen={isOpen}
                    closeModal={closeSumm}
                    article={selectedArtcile}
                />
            </div>
            </div>
            
            
        </div>
        
    </div>
    )
};

export default SearchPage;