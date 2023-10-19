export function Recomm(props){
    return(
        <a href={props.url} target="_blank_"><div className="max-h-fit max-w-sm bg-white drop-shadow-xl rounded-xl">
            {props.urlToImage &&<img src={props.urlToImage} loading="lazy"/>}
            <div className="px-4 py-2 text-sm">
                <h1 className="font-bold py-2 text-lg">{props.title}</h1>
                <h2>{props.description}</h2>
            </div>
            <div className="px-4 py-2">
                <p className="text-sm font-semibold text-gray-500">{props.author}</p>
                <p className="text-sm text-gray-400">{props.source_id}</p>
            </div>
        </div></a>
    )
}
export function Res(props){
    return(
        <a href={props.url} target="_blank">
        <div className="max-h-fit h-[15vh] flex w-[25vw] bg-white drop-shadow-xl rounded-xl">
            {props.image && (
            <img loading="lazy"
            src={props.image}
            alt="Your Alt Text Here"
            className="aspect-square w-1/2 rounded-l-xl"
            />
        )}

            <div className="px-4 py-2 text-sm">
                <h1 className="font-bold py-2 text-lg">{props.title}</h1>
                {/* <h2>{props.description}</h2> */}
                <p className="text-sm text-gray-400">{props.author}</p>
            </div>
            
        </div></a>
    )
}
export function Searching(props){
    return(
        <a href={props.url} target="_blank">
        <div className="max-h-fit h-[15vh] flex w-full bg-white drop-shadow-xl rounded-xl">
            {/* {props.image && (
            <img loading="lazy"
            src={props.image}
            alt="Your Alt Text Here"
            className="aspect-square w-1/2 rounded-l-xl"
            />
        )} */}

            <div className="px-4 py-2 text-sm">
                <h1 className="font-bold py-2 text-lg">{props.title}</h1>
                {/* <h2>{props.description}</h2> */}
                <p className="text-sm text-gray-400">{props.author}</p>
            </div>
            
        </div></a>
    )
}