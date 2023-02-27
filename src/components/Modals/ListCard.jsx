import {useEffect} from "react";
import '../../styles/ListCard.css'


export const ListCard = ({index, artist, carousel}) => {

    return(
        <>
            <div className={'list-card'}>
                { !carousel && <div className={'artist-cover'} style={{backgroundImage: `url(${artist?.album.images[0].url})`}}/>}
                {/*{ carousel && <div className={'artist-cover'} style={{backgroundImage: `url(${artist?.images[0].url})`}}/>}*/}
                {}
                <div className={'details'}>
                    <h3 className={'text-sm font-bold flex flex-col mb-2 '}>
                        <span className={'flex'}> {index + ". "} {artist?.name} </span>
                    </h3>
                </div>
            </div>
        </>
    )



}