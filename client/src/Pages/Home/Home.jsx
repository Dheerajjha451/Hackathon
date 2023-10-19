import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/Component/Logo";
import Categories from "../../assets/Component/Categories"
import recommend from "../../../public/list/recommend.json"
import current from "../../../public/list/current.json"
import Least from "../../../public/list/least.json"
import {SearchBar,SearchModal} from "../../assets/Component/SearchBar";
import { Recomm, Res } from "../../assets/Component/Cards";
export default function Home(){
    const [modal,setmodal]=useState(false)
    function handleModal(){
        setmodal(!modal)
    }
   
    const recomend=Least.map(data=>{
        return(
          <Recomm 
            {...data}
          />
        )
    })
    const Re_search=current.map(data=>{
      return(      
        <Res
          {...data}
        />
      )
    })
    return(
        <div>
            {modal && <div className="fixed w-full h-screen bg-neutral-gray z-10">
                <button className="fixed z-10 right-5 border border-black px-4 py-2 text-5xl font-bold text-red-600" onClick={handleModal}>X</button>

                <SearchModal/>
            </div>}
        <div className="container mx-auto p-4">

  
        <main>
          <section className="mb-8" onClick={handleModal}>
            <SearchBar/>
          </section>
  
          <section className="mb-8">
            <Categories />
          </section>
          <h1 className="text-3xl tracking-wide py-2 font-semibold">RECOMMENDED.</h1>
          <div className="grid grid-cols-3 place-items-center gap-2">
            {recomend}
          </div>
          {/* New Research  */}
          <h1 className="text-3xl tracking-wide py-12 pb-4 font-semibold">NEW RESEARCH.</h1>
          <div className="grid grid-cols-2 place-items-start gap-6 px-32">
            {Re_search}
          </div>
          {/* Suscription */}
          <h1 className="text-3xl tracking-wide py-2 font-semibold">SUBSCRIPTION.</h1>
          <div className="grid grid-cols-3 place-items-center gap-2">
            {recomend}
          </div>
        </main>

  </div>
      </div>
    )
}