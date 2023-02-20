import {useEffect} from "react";
import '../../styles/ListCard.css'


export const ListCard = ({index, artist}) => {

    return(
        <>
            <div className={'list-card'}>
                {/*<div className={'bg-cover object-center'} >*/}
                {/*    <img src={artist.images[0].url} alt={artist.name} className={'w-full h-full'}/>*/}
                {/*</div>*/}

                <div className={'artist-cover'} style={{backgroundImage: `url(${artist.images[0].url})`}}/>
                <div className={'details'}>
                    <h3 className={'text-md font-bold flex flex-col mb-2 '}>
                        <span className={'flex'}> {index + ". "} {artist.name} </span>
                    </h3>
                        {/*{artist.genres.slice(0,3).map((genre, index) => {*/}
                        {/*    if(index < 2  ){*/}
                        {/*        return(*/}
                        {/*            <span key={index} className={'text-sm text-gray-300'}> {genre + ', '} </span>*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*    else{*/}
                        {/*        return(*/}
                        {/*            <span key={index} className={'text-sm text-gray-300'}> {genre} </span>*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*})}*/}

                </div>

                {/*<div className={'relative bg-zinc-800 w-full h-full py-2 px-3 group translate-y-36 transition duration-[1200ms] ease-in-out'}>*/}

                {/*</div>*/}
            </div>
        </>
    )



}