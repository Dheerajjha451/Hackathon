export default function Footer(){
    return(
        <div className="bg-stone-900 w-full py-2 pt-6">
            <div className="grid place-items-center text-white">
                <hr/>
                <div className="text-center ">
                    <h1 className="text-white text-4xl font-bold leading-6">STUDBUD</h1>
                    <p className="text-white font-semibold">THE NEWSPAPER</p>
                </div>
                
                <hr className=""/>
                <div className="grid place-items-center grid-cols-3 font-semibold py-4 text-lg">
                    <p>Home</p>
                    <p>About</p>
                    <p>Research</p>
                </div>
                <hr className="border-1 border-white w-11/12"/>
                <p className="py-2">Made with Love for BITS API HACKATHON 3.0</p>
            </div>
        </div>
    )
}