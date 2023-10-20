import Categories from "./Categories";

export default function Navbar(){
    return(
        <div className=" w-screen">
            <div className="bg-stone-900 w-screen py-2 z-10 fixed">
                <div className="grid place-items-center text-white">
                    <hr/>
                    <div className="text-center ">
                        <h1 className="text-white text-4xl font-bold leading-6">STUDBUD</h1>
                        <p className="text-white font-semibold">THE NEWSPAPER</p>
                    </div>
                    
                    <hr className=""/>
                </div>
            </div>
            
        </div>
        
    )
}