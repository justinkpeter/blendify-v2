import React, {useState} from 'react';
import { numberWithCommas } from "../../utils/functions";
import {PlayIcon} from "@heroicons/react/24/solid";

export const ArtistCardTitle = ({name}) => {
    return (
        <>
            <div className={'artist-card-title'}>
                <span className={'text-lg font-normal'}> Your Top Artist </span>
                <span className={'text-xl 2xl:text-3xl font-bold'}> {name} </span>
            </div>
        </>
    );
}

export const ArtistCardImage = ({image}) => {
    return(
        <>
            <img src={image} alt={'Artist Image'} className={'artist-card-image'}/>
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
    return(
        <>
            <div className={'artist-card-content'}>
                <ul className={'font-medium w-2/3 overflow-hidden space-y-3.5'}>
                    <li>
                        <h3 className={'text-base font-light'}> Popularity </h3>
                        <p className={'text-2xl font-bold'}>{popularity}</p>
                    </li>
                    <li>
                        <h3 className={'text-base font-light'}> Followers </h3>
                        <p className={'text-2xl font-bold'}>{numberWithCommas(followers)}</p>
                    </li>
                    <li>
                        <h3 className={'text-base font-light'}> Top Track </h3>
                        <p className={'text-2xl font-bold'}>{topTrack}</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export const ArtistCardTrackPreview = ({topTrack}) => {

    const [playTime, setPlayTime] = useState(0)
    function pauseTrack() {
        const audio = document.getElementById('myAudio')
        const fade = setInterval(() => {
            if (audio.volume > 0.01) {
                audio.volume -= 0.01;
            } else {
                clearInterval(fade);
                audio.pause();
            }
        })
    }

    function getPlaybackTime() {
        const audio = document.getElementById('myAudio')
        if(audio){
            setPlayTime(audio.currentTime / audio.duration * 100)
        }

    }

    return(
        <>
            <div className={'artist-card-player'}>
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
                    <span className={'mt-3 flex flex-col justify-center'}>
                       A Track name
                    </span>
                    </h4>
                    <audio id="myAudio" preload="none" src={topTrack} onTimeUpdate={() => getPlaybackTime()}></audio>
                </div>
            </div>
        </>
    )
}

export const ArtistCard  = ({children}) =>{
    return(
        <>
            <div className={'artist-card'}>
                {children}
            </div>
        </>
    )
}