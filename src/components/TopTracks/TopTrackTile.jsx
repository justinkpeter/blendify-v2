import {PlayIcon} from "@heroicons/react/24/solid";
import React, {useEffect, useState}  from "react";

export const TopTrackTile = ({children, row, col}) => {

    const gridPosition = {

        blue: 'bg-blue-600 hover:bg-blue-500',
        red: 'bg-red-600 hover:bg-red-500',
    }

    function getRowClass() {
        return `row-[${row}_/_span_3]`
    }

    function getColClass() {
        return `col-[${col}_/_span_3]`
    }

    if(row && col){

        const className = `relative grid ${getRowClass() } ${getColClass() }`

        return (
            <>
                <div className={className}>
                    {children}
                </div>
            </>
        );
    }

    else{
        return (
            <>
                <div className={'grid relative row-start-3 row-span-6 col-start-11 col-span-5'}>
                    {children}
                </div>
            </>
        );
    }


}

export const TopTrackCard = ({children}) => {
    return(
        <>
            <div className={'absolute inset-0 z-20'}>
                {children}
            </div>
        </>
    )
}

export const TopTrackRank = ({rank}) => {
    return(
        <>
            <div className={'absolute block -left-10'}>
                <div className={'flex flex-col items-start text-white'}>
                    <span>#{rank}</span>
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30" height="30"
                            width="30">
                                <g opacity="1"><g>
                                <path
                                    fill="rgb(255,0,46)"
                                    fillOpacity="1"
                                    opacity="1"
                                    fillRule="evenodd"
                                    d="M7,5 L23,5 C24.103830337524414,5 25,5.896170139312744 25,7 L25,23 C25,24.103830337524414 24.103830337524414,25 23,25 L7,25 C5.896170139312744,25 5,24.103830337524414 5,23 L5,7 C5,5.896170139312744 5.896170139312744,5 7,5 L7.818181991577148,6.818181991577148 L22.18181800842285,6.818181991577148 C22.733734130859375,6.818181991577148 23.18181800842285,7.266266822814941 23.18181800842285,7.818181991577148 L23.18181800842285,22.18181800842285 C23.18181800842285,22.733734130859375 22.733734130859375,23.18181800842285 22.18181800842285,23.18181800842285 L7.818181991577148,23.18181800842285 C7.266266822814941,23.18181800842285 6.818181991577148,22.733734130859375 6.818181991577148,22.18181800842285 L6.818181991577148,7.818181991577148 C6.818181991577148,7.266266822814941 7.266266822814941,6.818181991577148 7.818181991577148,6.818181991577148 L12.062560081481934,19.628097534179688 L17.93743896484375,19.628097534179688 L17.93743896484375,17.6698055267334 L14.125295639038086,17.6698055267334 L14.125295639038086,15.894287109375 L17.57189178466797,15.894287109375 L17.57189178466797,14.079602241516113 L14.125295639038086,14.079602241516113 L14.125295639038086,12.317138671875 L17.92438316345215,12.317138671875 L17.92438316345215,10.37190055847168 L12.062560081481934,10.37190055847168 L12.062560081481934,19.628097534179688 L7,5Z"></path></g></g></svg>
                    </span>
                </div>
            </div>
        </>
    )
}

export const TopTrackImage = ({children, small}) => {

    const heightClass = small ? 'relative h-[30vh]' : 'relative h-[50vh]';

    return(
        <>
            <div className={heightClass}>
                {children}
            </div>
        </>
    )
}

export const TopTrackInfo = ({children}) => {
    return(
        <>
            <div className={'flex  items-center my-6 text-white '}>
                <div className={'border-2 border-green-400 h-12 w-12 rounded-full '}>
                    <PlayIcon className={'ml-2 mt-1.5 h-8 w-8 text-green-400'}/>
                </div>
                <div className={'pl-4 overflow-hidden w-3/4 flex flex-col content-center space-y-1'}>
                    {children}
                </div>

            </div>
        </>
    )
}