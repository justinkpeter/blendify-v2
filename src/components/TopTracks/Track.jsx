import React, {useEffect, useState} from "react";
import '../../styles/TopTracks.css'
import { playLivePreview, pauseLivePreview} from "../../utils/functions";
import { ExplicitIcon } from "../Icons/ExplicitIcon";
import { PlayIcon } from "@heroicons/react/24/solid";


// displays the rank of the track
const TrackRank = ({rank, explicit}) => {
    return(
        <>
            <div className={'absolute block -left-10 top-track-rank'}>
                <div className={'flex flex-col items-start text-lg '}>
                    <span>#{rank}</span>
                    {explicit && <span> <ExplicitIcon/> </span>}
                </div>
            </div>
        </>
    )
}

// displays the image of the track
const TrackImage = ({image, large}) => {
    const imageClass = large ? 'top-track-image relative h-[50vh]' : 'top-track-image relative h-[30vh] w-[30vh]';
    return(
        <>
            <div className={imageClass}>
                <div
                    style={{backgroundImage: `url(${image})`}}
                    className={'absolute w-full h-full bg-cover bg-center '}>
                </div>
            </div>
        </>
    )
}

// displays the name and artists of the track
const TrackInfo = ({name, artists, previewUrl, previewTrack, id}) => {

    useEffect(() => {
        if(previewTrack === true ){
            playLivePreview(id)
        }
        else if(previewTrack === false){
            pauseLivePreview(id)
        }
    })

    return(
        <>
            <div className={'flex text-left normal-case items-center my-6 text-white '}>
                <div className={'border-2 border-green-400 h-12 w-12 rounded-full '}>
                    <PlayIcon className={'ml-2 mt-1.5 h-8 w-8 text-green-400'}/>
                </div>
                <div className={'pl-4 overflow-hidden w-3/4 flex flex-col content-center space-y-1'}>
                    <h2 className={'font-bold truncate text-ellipsis text-3xl whitespace-nowrap'}>
                        {name}
                    </h2>
                    <h3 className={'text-gray-400'}>
                        {artists?.map((artist, index) => {
                            return(
                                <>
                                    <span> {artist.name}</span>
                                    {index < artists.length - 1 && <span> , </span>}
                                </>
                            )
                        })}
                    </h3>
                </div>
                <audio id={name?.replace(/\s/g, '-').toLowerCase()} preload="none" src={previewUrl} ></audio>
            </div>
        </>
    )
}


// parent component to display the track and all of its goods --- rank, image, name, artists
export const Track = ({rank, image, name, large, artists, explicit, preview}) => {

    const trackClass = large ? 'w-[50vh] h-full top-track relative' : 'w-[30vh] h-full top-track relative';
    const trackId = name?.replace(/\s/g, '-').toLowerCase()
    const [isHovered, setIsHovered] = useState(false)

    const playTrack = () => {
        setIsHovered(true)
    }

    const pauseTrack = () => {
        setIsHovered(false)
    }



    return(
        <>
            <div className={trackClass} onMouseEnter={() => playTrack()} onMouseLeave={() => pauseTrack()}>
                <TrackRank rank={rank} explicit={explicit}/>
                <TrackImage image={image} large={large}/>
                <TrackInfo name={name} artists={artists} previewUrl={preview} previewTrack={isHovered} id={trackId}/>
            </div>
        </>
    )
}


