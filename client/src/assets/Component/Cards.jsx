export function Recomm(props){
    return(
        <a href={props.url} target="_blank_"><div className="h-96 max-h-fit bg-white drop-shadow-xl rounded-xl">
            {props.imageUrl &&<img src={props.imageUrl} loading="lazy" className="max-w-full"/>}
            <div className="px-4 py-2 text-sm">
                <h1 className="font-bold py-2 text-lg">{props.title}</h1>
                
            </div>
            <div className="px-4 py-2">
                <p className="text-sm font-semibold text-gray-500">{props.author}</p>
                <p className="text-sm text-gray-400">{props.source_id}</p>
            </div>
        </div></a>
    )
}
export function Break({props}){
    return(
        <a href={props.url} target="_blank_"><div className="max-h-fit max-w-lg bg-white drop-shadow-xl rounded-xl">
            {props.imageUrl &&<img src={props.imageUrl} loading="lazy" className="w-full"/>}
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
        <div className="max-h-fit h-fit flex w-fit bg-white drop-shadow-xl rounded-xl">

            <div className="px-4 py-2 text-sm">
                <h1 className="font-bold py-2 text-lg">{props.title}</h1>
                <h2>{props.description}</h2>
                <p className="text-sm text-gray-400">{props.author}</p>
            </div>
            
        </div></a>
    )
}
export function Respond({props}){
    return(
        <a href={props.url} target="_blank">
        <div className="max-h-fit h-fit flex w-fit bg-white drop-shadow-xl rounded-xl">

            <div className="px-4 py-2 text-sm">
                <h1 className="font-bold py-2 text-lg">{props.title}</h1>
                <h2>{props.description}</h2>
                <p className="text-sm text-gray-400">{props.author}</p>
            </div>
            
        </div></a>
    )
}