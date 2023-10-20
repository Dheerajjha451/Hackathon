import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/Component/Logo";
import Categories from "../../assets/Component/Categories"
import recommend from "../../../public/list/recommend.json"
import daily from "../../../public/list/daily.json"
import current from "../../../public/list/current.json"
import Least from "../../../public/list/least.json"
import { SearchBar, SearchModal } from "../../assets/Component/SearchBar";
import { Break, Recomm, Res, Respond } from "../../assets/Component/Cards";
import axios from "axios";
import { useDataContext } from "../../assets/Component/DataContext";
export default function Home() {
  const [modal, setmodal] = useState(false)
  const {res1, set1} = useDataContext()
  const {res2, set2} = useDataContext()
  const {res3, set3} = useDataContext()
  const {res4, set4} = useDataContext()
  function handleModal() {
    setmodal(!modal)
  }
  const backendUrl="http://127.0.0.1:5000"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/`);
        // Handle the response data
        console.log(response.data);
        set1(response.data.result.res1)
        set2(response.data.result.res2)
        set3(response.data.result.res3)
        set4(response.data.result.res4)
        // console.log(datta)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      {modal && <div className="fixed w-full h-screen bg-neutral-gray z-10">
        <button className="fixed z-10 right-5 border border-black px-4 py-2 text-5xl font-bold text-red-600" onClick={handleModal}>X</button>
        <SearchModal />
      </div>}
      <div className="container mx-auto p-4">
        <div className="w-full bg-white pt-16 pb-4">
          <Categories />
        </div>

        <main>
          <hr className="border-1 border-black py-2 w-11/12" />

          <section className="mb-8" onClick={handleModal}>
            <SearchBar />
          </section>

          {/* <section className="mb-8">
            <Categories />
          </section> */}
          {/* <h1 className="text-3xl tracking-wide py-2 font-semibold">RECOMMENDED.</h1> */}
          <div className="grid grid-cols-3 place-items-start gap-12">
            <div>
              <ul className="list-disc text-justify grid gap-3">
                <h1 className="font-bold text-2xl underline tracking-wider underline-offset-8">LATEST ARTICLES</h1>
                {res3.map((data) => {
                  return (
                    <li className="font-semibold py-2 text-lg hover:text-blue-800 active:text-purple-800">
                      <a href={data.url}>{data.title}</a>
                    </li>
                  )
                })}
              </ul>
              <div className="grid gap-4">
                <h1 className="font-bold text-2xl underline tracking-wider underline-offset-8">RECOMMENDED</h1>
                <div className="grid grid-cols-2 gap-4">
                {res1.map((data) => {
                  return (
                    data.imageUrl &&<Recomm
                      {...data}
                    />
                  )
                })}
                </div>
                
              </div>

            </div>
            <div className="grid gap-4">
              <h1 className="font-bold text-2xl underline tracking-wider underline-offset-8">THE BREAKING NEWS</h1>
              {res2[0]!=undefined &&<Break props={res2[0]} />}
              {res1[1]!=undefined&&<Respond props={res1[1]} />}
              {res2[1]!=undefined &&<Respond props={res2[1]} />}
              {/* {/* <Respond props={recommend.results[3]}/> */}
            </div>
            <div className="grid gap-4">
              <h1 className="font-bold text-2xl underline tracking-wider underline-offset-8">Daily Feed</h1>
              {res4.map((data) => {
                return (
                  <Res
                    {...data}
                  />
                )
              })}
            </div>
          </div>
          <h1 className="font-bold pt-6 text-2xl underline tracking-wider underline-offset-8">FEATURED STORIES.</h1>
          <div className="grid grid-cols-4 justify-evenly grid-flow-cols gap-4 py-4 place-items-start">
              {res2.map((data) => {
                return (
                  data.imageUrl&&<Recomm
                    {...data}
                  />
                )
              })}
          </div>

          {/* <h1 className="text-3xl tracking-wide py-12 pb-4 font-semibold">NEW RESEARCH.</h1>
          <div className="grid grid-cols-2 place-items-start gap-6 px-32">
            {Re_search}
          </div>
          
          <h1 className="text-3xl tracking-wide py-2 font-semibold">SUBSCRIPTION.</h1>
          <div className="grid grid-cols-3 place-items-center gap-2">
            {recomend}
          </div> */}
        </main>

      </div>
    </div>
  )
}