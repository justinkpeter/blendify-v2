import React, {useState} from 'react';
import { numberWithCommas } from "../../utils/functions";
import {PlayIcon} from "@heroicons/react/24/solid";

export const ArtistCardTitle = ({name,rank}) => {

    const DefaultTitle = () => {
        return(
            <>
                <span className={'text-lg xl:text-xl font-normal'}> Your Top Artist </span>
            </>
        )
    }
    return (
        <>
            <div className={'artist-card-title'}>
                { rank && <span className={'text-lg font-normal'}> #{rank} </span> }
                { !rank && <span className={'text-lg font-normal'}> Your Top Artist {rank} </span> }
                <span className={'text-xl 2xl:text-3xl font-bold'}> {name} </span>
            </div>
        </>
    );
}



export const ArtistCardImage = ({image, large}) => {

    const width = large ? 'w-[40vh]' : 'w-[30vh]'
    const height = large ? 'h-[50vh]' : 'h-[30vh]'

    return(
        <>
            <img src={image} alt={'Artist Image'} className={`artist-card-image ${width} ${height}`}/>
        </>
    )
}

export const ArtistCardImageOverlay = () =>{
    return(
        <>
            <div className={'artist-card-image-overlay'}/>
        </>
    )
}

export const ArtistCardContent = ({popularity, followers, topTrack}) => {

    const Popularity = ({popularity}) => {
        return(
            <>
                <li>
                    <h3 className={'text-base font-light'}> Popularity </h3>
                    <p className={'text-2xl font-bold'}>{popularity}</p>
                </li>
            </>
        )
    }

    const Followers = ({followers}) => {
        return(
            <>
                <li>
                    <h3 className={'text-base font-light'}> Followers </h3>
                    <p className={'text-2xl font-bold'}>{numberWithCommas(followers)}</p>
                </li>
            </>
        )
    }

    const TopTrack = ({topTrack}) => {
        return(
            <>
                <li>
                    <h3 className={'text-base font-light'}> Top Track </h3>
                    <p className={'text-2xl font-bold'}>{topTrack}</p>
                </li>
            </>
        )
    }

    return(
        <>
            <div className={'artist-card-content'}>
                <ul className={'font-medium w-2/3 overflow-hidden space-y-3.5'}>
                    { popularity && <Popularity popularity={popularity}/> }
                    { followers && <Followers followers={followers}/> }
                    { topTrack && <TopTrack topTrack={topTrack}/> }
                </ul>
            </div>
        </>
    )
}

export const ArtistCardTrackPreview = ({topTrack}) => {

    const [playTime, setPlayTime] = useState(0)

    const trackPreviewId = topTrack?.name.replace(/\s/g, '-').toLowerCase()

    function getPlaybackTime() {
        const audio = document.getElementById(trackPreviewId)
        if(audio){
            setPlayTime(audio.currentTime / audio.duration * 100)
        }

    }


    return(
        <>
            <div className={'artist-card-player bg-blue-300'}>
                <div className={'w-full h-full rounded-full '}>
                    <div className={'backdrop'}/>
                    <div className={'absolute top-2 left-2.5'}>
                        <PlayIcon className={"w-6 h-6 icon "}/>
                    </div>
                </div>

                <div className={'track-details'}>
                    <div className={'track-cover'} style={{backgroundImage: `url(${topTrack?.album.images[0].url})`}}/>
                    <div className={'mt-1 rounded-full w-full h-1 bg-gray-200'}>
                        <div style={{width: `${playTime}%`}} className={'w-1/2 rounded-full h-1 bg-green-500'}/>
                    </div>
                    <h4 className={'font-bold lg:text-lg text-right overflow-hidden'}>
                        <span className={'mt-3 flex flex-col justify-center'}>{topTrack?.name}</span>
                    </h4>
                    <audio id={trackPreviewId} preload="none" src={topTrack?.preview_url} onTimeUpdate={() => getPlaybackTime()}></audio>
                </div>
            </div>
        </>
    )
}

export const ArtistCard  = ({children}) =>{



    // function playTrack() {
    //     const audio = document.getElementById('myAudio')
    //     audio.volume = 0;
    //     audio.play();
    //     const fade = setInterval(() => {
    //         if (audio.volume < 0.99) {
    //             audio.volume += 0.01;
    //         } else {
    //             clearInterval(fade);
    //         }
    //     }, 50);
    //
    // }
    // function pauseTrack() {
    //     const audio = document.getElementById('myAudio')
    //     const fade = setInterval(() => {
    //         if (audio.volume > 0.01) {
    //             audio.volume -= 0.01;
    //         } else {
    //             clearInterval(fade);
    //             audio.pause();
    //         }
    //     })
    // }


    return(
        <>
            {/*<div className={'artist-card'} onMouseEnter={() => playTrack()} onMouseLeave={() => pauseTrack()}>*/}
            <div className={'artist-card'} >
                {children}
            </div>
        </>
    )
}