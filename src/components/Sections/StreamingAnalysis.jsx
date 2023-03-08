import React from "react";
import { GenrePill } from "../Modal";
import { SectionIcon } from '../SectionIcon';
import { UserPlusIcon } from "@heroicons/react/20/solid";
export const StreamingAnalysis = ({user, playlists, favoriteTracks, favoriteArtists, favoriteGenres }) => {

    if(!user) return null;
    if(!playlists) return null;
    if(!favoriteTracks) return null;
    if(!favoriteArtists) return null;
    if(!favoriteGenres) return null;

    return (
        <>
            <section className={'grid grid-cols-26 grid-rows-10 h-section w-[260vh] text-white'}>
                <SectionIcon Icon={UserPlusIcon} gradient={'bg-gradient-to-r from-yellow-400 to-teal-500'}/>

                <div className={'relative grid grid-cols-7 col-[3_/_span_7] row-[4_/_span_4]  z-20'}>
                    <div className={'absolute top-0 left-0 leading-6'}>
                        <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                            <span className={'inline-block xl:pr-[5vh]'}>
                                <span> {user?.display_name.split(" ")[0] }, </span><br/>
                                <span className={'break-normal text-green-400'}> all your tastes, blended into one </span>
                                <br/>

                                {/*<span> has been on repeat </span><br/>*/}
                                </span>
                        </h1>
                        <p className={'font-light text-xl text-gray-100 '}>
                            <span className={'inline-block leading-loose'}>
                                Just an overall <span className={'italic'}> vibe </span> of your music taste.
                                <span className={'italic'}> Keep grooving. </span>
                            </span>
                        </p>
                    </div>
                </div>

                {/*<StreamingAnalysis/>*/}
                <div className={'relative grid grid-cols-13 grid-rows-6 col-[11_/_span_10] row-[3_/_span_5]  z-20  rounded-3xl  glass bg-black/30 '}>

                    {/*<div className={'absolute top-0  w-full h-full glass z-0 '}/>*/}
                    <div className={'col-[1_/_span_6] row-[1_/_span_6] pt-10 relative pl-10'}>
                        <div className="w-56 h-56 pb-3 ">
                            <img
                                src={user?.images[0].url } alt="Avatar Tailwind CSS Component"
                                className=" w-full h-full object-cover rounded-lg"/>
                        </div>
                        <div>
                            <ul className={''}>
                                <li className={'stat-value'}> { user?.display_name } </li>
                                <li className={'stat-title'}> { user?.followers.total } followers · { playlists?.total } Public Playlists </li>
                            </ul>
                        </div>

                        <div className={'mt-5 w-64'}>
                            {favoriteGenres?.map((genre) => {
                                return(
                                    <GenrePill genre={genre.name}/>
                                )
                            })}
                        </div>
                    </div>

                    {/* top artists*/}
                    <div className={'col-[4_/_span_2] row-[1_/span_6] pt-10 relative '}>
                        <div>
                            <div className="stat-title font-black text-2xl ">Your Top Artists </div>
                            <ul>
                                { favoriteArtists?.slice(0,5).map((artist, index) => (
                                    <>
                                        <li key={index} className={'text-white/60 h-fit space-y-3 relative flex items-center gap-3   '}>
                                            <span className={'text-2xl font-black'}>{index+1} </span>

                                            <div className="w-16 h-16 ">
                                                <img
                                                    src={artist?.images[0].url } alt="Avatar Tailwind CSS Component"
                                                    className=" w-full h-full object-cover "/>
                                            </div>

                                            <div>
                                                <div className=""> { artist?.name }</div>
                                                {/*<div className="stat-value">89,400</div>*/}
                                            </div>
                                        </li>
                                        <hr className={'opacity-10 my-4'}/>
                                    </>

                                ))}
                            </ul>

                        </div>
                    </div>

                    {/* top tracks */}
                    <div className={'col-[7_/_span_3] row-[1_/span_6] pt-10 relative '}>
                        <div>
                            <div className="stat-title font-black text-2xl ">Your Top Tracks </div>
                            <ul>
                                { favoriteTracks.slice(0,5).map((track, index) => (
                                    <>
                                        <li key={index} className={'text-white/60 h-fit space-y-3 relative flex items-center gap-3   '}>
                                            <span className={'text-2xl font-black'}>{index+1} </span>
                                            <div className="w-16 h-16 ">
                                                <img
                                                    src={track?.album.images[0].url } alt="Avatar Tailwind CSS Component"
                                                    className=" w-full h-full object-cover "/>
                                            </div>
                                            <div>
                                                <div className="font-medium"> { track?.name }</div>
                                                <div className="font-thin">
                                                    {track?.artists?.map((artist, index) => {
                                                        return(
                                                            <>
                                                                <span> {artist.name}</span>
                                                                {index < track.artists.length - 1 && <span> , </span>}
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </li>
                                        <hr className={'opacity-10 my-4'}/>
                                    </>

                                ))}
                            </ul>
                        </div>
                    </div>


                </div>
            </section>
        </>
    );
}