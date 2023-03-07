import React from "react";
import {Track} from "../TopTracks/Track";
import {Tile} from "../Tile";

export const FavoriteTracks = ({favoriteTracks}) => {

    const gridPositions = [
        {row: 3, col: 11},
        {row: 4, col: 17},
        {row: 3, col: 21},
        {row: 2, col: 25},
        {row: 4, col: 29}
    ]

    if(!favoriteTracks) return null;

    return (
        <>
            <section className={'grid grid-cols-33 grid-rows-10 h-section w-[330vh]'}>
                <div className={'relative grid grid-cols-7 col-[3_/_span_7] row-[4_/_span_6] z-20'}>
                    <div className={'absolute top-0 left-0 leading-6'}>
                        <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                                <span className={'inline-block xl:pr-[5vh]'}>
                                    <span className={'break-normal text-green-400'}> {favoriteTracks[0]?.name} </span>
                                    <br/>
                                    <span> has been on repeat </span><br/>
                                 </span>
                        </h1>
                        <p className={'font-light text-xl text-gray-100 pr-[10vh]'}>
                                <span className={'inline-block leading-loose'}>
                                    Yeah, you have other songs you like to bump, but {favoriteTracks[0]?.name} by {favoriteTracks[0]?.artists[0]?.name} truly hit some chords with you.
                                </span>
                        </p>
                    </div>
                </div>

                {/* track cards  */}
                { gridPositions.map((position, index) => {
                    if(index === 0){
                        return (
                            <Tile col={11} row={3} large key={index}>
                                <Track
                                    large
                                    rank={1}
                                    image={favoriteTracks[0]?.album?.images[0]?.url}
                                    name={favoriteTracks[0]?.name}
                                    artists={favoriteTracks[0]?.artists}
                                    explicit={favoriteTracks[0]?.explicit}
                                    preview={favoriteTracks[index]?.preview_url}
                                />
                            </Tile>
                        )
                    }
                    else{
                        return (
                            <Tile col={position.col} row={position.row} key={index}>
                                <Track
                                    rank={index + 1}
                                    image={favoriteTracks[index]?.album?.images[0]?.url}
                                    name={favoriteTracks[index]?.name}
                                    artists={favoriteTracks[index]?.artists}
                                    explicit={favoriteTracks[index]?.explicit}
                                    preview={favoriteTracks[index]?.preview_url}
                                />
                            </Tile>
                        )
                    }

                })}

            </section>
        </>
    );
}