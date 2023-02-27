import {useEffect, useState} from "react";
import { ModalNav } from "./Modals/ModalNav";
import {getPopularity, numberWithCommas} from "../utils/functions";

import { ListItems } from "./Modals/ListItems";
import { ListCard } from "./Modals/ListCard";

import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { HeartIcon, StarIcon, UserIcon } from "@heroicons/react/20/solid";

import { QuickStat } from "../components/QuickStat"


import { Carousel } from "./Carousel";


const GenrePill = ({genre}) => {
    return(
        <>
            <span className={'text-sm bg-zinc-500/60  inline-block rounded-full px-5 py-2 mr-1.5 mb-4'}> {genre} </span>
        </>
    )
}
export const Modal = ({children, id, artist}) => {

    return(
        <>
            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box rounded-3xl max-w-6xl max-h-[85vh] relative px-20 bg-zinc-900 min-h-[20vh] ">
                    <ModalNav id={id}/>

                    <div className={'h-[70vh] w-full relative '}>
                        <div className={'relative flex w-full h-full overflow-y-scroll gap-[70px]'}>

                            {/*image */}
                            <div className={'w-fit h-full sticky top-0'}>
                                <div className={'h-fit'}>
                                    <div className={'relative overflow-hidden w-[306px] h-[306px] '}>
                                        { artist ? <div className={'w-full h-full bg-cover rounded-2xl'} style={{backgroundImage: `url(${artist?.images[0].url})`}}>

                                        </div> : '' }
                                    </div>
                                    <div className={'btn btn-wide'}> oops</div>
                                </div>
                            </div>

                            {/* content*/}
                            <div className={'w-full max-w-[576px] h-[120vh] '}>
                                <div className={'text-white min-w-[576px] height-[80vh] overflow-y-scroll '}>
                                    {/* name*/}
                                    <h1 className={'text-6xl font-black mb-7'}>
                                        <span className={'inline-block'}>
                                            {artist?.name}
                                        </span>
                                    </h1>
                                    {/* genres*/}
                                    <div className={'mt-5'}>
                                        {artist?.genres.map((genre) => {
                                            return(
                                                <GenrePill genre={genre}/>
                                            )
                                        })}
                                    </div>
                                    {/* popularity & followers */}
                                    <div className={'flex gap-1.5 mb-[25px]'}>
                                        <QuickStat title={'Popularity'} value={artist?.popularity} Icon={StarIcon}/>
                                        <QuickStat title={'Followers'} value={artist?.followers.total} Icon={HeartIcon}/>
                                        {/*<TitleCard title={'Popularity'} value={artist?.popularity}/>*/}
                                        {/*<TitleCard title={'Followers'} value={artist?.followers.total}/>*/}
                                    </div>
                                    {/* top tracks*/}
                                    <div>
                                        <Carousel title={'Top Tracks'} id={'top-tracks-carousel'}  items={artist?.tracks.slice(0,6)} numbers={true}/>
                                    </div>

                                    {/* related artists */}
                                    <div>
                                        <Carousel title={'Related Artists'} id={'related-artists-carousel'}  items={artist?.related_artists.slice(0,6)} numbers={false}/>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}