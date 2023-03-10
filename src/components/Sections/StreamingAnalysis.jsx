import React from "react";
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
            <section className={'grid grid-cols-26 grid-rows-10 h-section text-white'}>
                <SectionIcon Icon={UserPlusIcon} gradient={'bg-gradient-to-r from-yellow-400 to-teal-500'}/>
                <div className={'relative grid grid-cols-7 col-[3_/_span_7] row-[4_/_span_4] z-20'}>
                    <div className={'absolute top-0 left-0 leading-6'}>
                        <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                            <span className={'inline-block xl:pr-[5vh] leading-[5rem]'}>
                                <span> {user?.display_name.split(" ")[0] }, </span><br/>
                                <span className={'break-normal text-green-400'}> your taste profile </span>
                                <br/>
                                </span>
                        </h1>
                        <p className={'font-light text-xl text-gray-100 '}>
                            <span className={'inline-block leading-loose'}>
                                All of your analytics, <span className={'italic'}> blended </span> into one.
                                <span className={'italic'}> Your music taste is truly immaculate. </span>
                            </span>
                        </p>
                    </div>
                </div>
                <div className={'relative grid grid-cols-10 grid-rows-6 col-[11_/_span_12] row-[3_/_span_7]  p-5 z-20  rounded-3xl '}>
                    <div className={'relative col-[1_/_span_12] row-[1_/_span_2] group'}>
                        <div className=" relative w-full h-full rounded-2xl shadow-2xl overflow-hidden">
                            <img src={ user?.images[0]?.url } alt={''} className={'h-full w-full object-cover group-hover:scale-125 duration-[1200ms] transition ease-in-out'}/>
                            <div className={'w-full h-full absolute top-0 bg-black/80'}/>
                        </div>
                    </div>
                    <div className={'relative col-[4_/_span_7] row-[1_/_span_2]'}>
                        <div className={'inline-block w-full h-full flex flex-col items-start justify-center pl-10 '}>
                            <h1 className={'text-5xl stat-value'}> {user?.display_name} </h1>
                            <h5 className={'stat-title mt-2'}> { user?.followers.total } followers · { playlists?.total } Public Playlists </h5>
                        </div>
                    </div>
                    <div className={'col-[1_/_span_10] row-[3_/_span_4] flex space-x-5 pt-12 flex justify-center'}>
                        <div className={'px-3 py-6 w-54 h-64 flex flex-col items-center bg-zinc-800/30 rounded-lg hover:bg-zinc-500/30 duration-200 transition ease-in'}>
                            <div className="avatar">
                                <div className="w-36 rounded-full shadow-2xl">
                                    <img src={favoriteArtists[0]?.images[0]?.url } alt={''} />
                                </div>
                            </div>
                            <div className={'mt-6 w-full h-fit self-start'}>
                                <p className={'stat-title text-xs font-medium'}> Artist of the month </p>
                                <h4 className={'text-md font-bold'}> {favoriteArtists[0]?.name }</h4>
                            </div>
                        </div>
                        <div className={'px-3 py-6 w-54 h-64 flex flex-col items-center bg-zinc-800/30 rounded-lg hover:bg-zinc-500/30 duration-200 transition ease-in'}>
                            <div className="avatar">
                                <div className="w-36 rounded-full shadow-2xl">
                                    <img src={favoriteTracks[0]?.album.images[0]?.url } alt={''}/>
                                </div>
                            </div>
                            <div className={'mt-6 w-full h-fit self-start overflow-hidden'}>
                                <p className={'stat-title text-xs font-medium'}> Song of the month </p>
                                <h4 className={'text-md font-bold'}> {favoriteTracks[0]?.name }</h4>
                            </div>
                        </div>
                        <div className={'px-3 py-6 w-54 h-64 flex flex-col items-center bg-zinc-800/30 rounded-lg hover:bg-zinc-500/30 duration-200 transition ease-in'}>
                            <div className="avatar">
                                <div className="relative w-36 rounded-full shadow-2xl bg-white/5">
                                    <span className={'absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-red-300 to-orange-400 h-full flex items-center justify-center bg-clip-text text-transparent text-sm font-bold'}>
                                        {favoriteGenres[0]?.name}.
                                    </span>
                                </div>
                            </div>
                            <div className={'mt-6 w-full h-fit self-start'}>
                                <p className={'stat-title text-xs font-medium'}> Genre of the month </p>
                                <h4 className={'text-md font-bold'}> {favoriteGenres[0]?.name }</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}