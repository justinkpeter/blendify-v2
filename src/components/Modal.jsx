import { ModalNav } from "./Modals/ModalNav";
import { HeartIcon, StarIcon, MusicalNoteIcon, ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import { QuickStat } from "./QuickStat"
import { Carousel } from "./Carousel";
import '../styles/Modal.css'
import React from "react";

export const GenrePill = ({genre}) => {
    return(
        <>
            <span className={'text-sm bg-zinc-500/60  inline-block rounded-full px-5 py-2 mr-1.5 mb-4'}> {genre} </span>
        </>
    )
}
export const Modal = ({loading, artist}) => {

    if(loading === true){
        return(
            <>
                <input type="checkbox" id={'modal'} className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box flex items-center rounded-3xl max-w-6xl max-h-[85vh] relative px-14 bg-zinc-900 min-h-[70vh] py-0">
                        <ModalNav/>
                        <div className={'w-full h-full  flex items-center justify-center z-50 '}>
                            <div className={'absolute top-[40%] left-[42%] spinner animate-spin text-white'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28 h-28 text-green-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </div>
                        </div>}
                    </div>
                </div>
            </>
        )
    }
    if(!artist){
        return null
    }

    return(
        <>
            <input type="checkbox" id={'modal'} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box rounded-3xl max-w-6xl max-h-[85vh] relative px-14 bg-zinc-900 min-h-[20vh] py-0">
                    <ModalNav/>
                    <div className={'h-[70vh] w-full relative modal-content'}  >
                        <div  id={'scrollable'} className={'relative flex w-full h-full overflow-y-scroll gap-[70px] scroll-smooth mt-[5vh]'} >
                            {/*image */}
                            <div className={'w-fit h-fit sticky top-0'}>
                                <div className={'h-fit'}>
                                    <div className={'relative overflow-hidden w-[306px] h-[306px] '}>
                                        { artist ? <div className={'w-full h-full bg-cover rounded-2xl'} style={{backgroundImage: `url(${artist?.images[0].url})`}}>
                                        </div> : '' }
                                    </div>
                                    <a className={'btn hover:bg-green-800 w-full mt-5 bg-green-500 text-white border-0 normal-case'} href={`spotify:artist:${artist?.id}`} target={"_blank"}>
                                        <span> Open in Spotify</span>
                                    </a>
                                </div>
                            </div>
                            {/* content*/}
                            <div className={'w-full max-w-[576px] h-fit'}>
                                <div className={'text-white min-w-[576px] height-[80vh]  overflow-y-scroll'} >
                                    {/* name*/}
                                    <h1 className={'text-6xl font-black mt-3 mb-7'}>
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
                                    <div className={'flex mb-[25px]'}>
                                        <QuickStat title={'Popularity'} value={artist?.popularity} Icon={StarIcon}/>
                                        <QuickStat title={'Followers'} value={artist?.followers.total} Icon={HeartIcon}/>
                                    </div>
                                    {/* top tracks*/}
                                    <div>
                                        <Carousel title={'Top Tracks'} id={'top-tracks-carousel'}  items={artist?.top_tracks.slice(0,6)} numbers={true}/>
                                        <div className={'flex'}>
                                            <QuickStat title={'Discography'} value={artist?.related_releases} Icon={MusicalNoteIcon}/>
                                            <QuickStat title={'Latest Release'} value={artist?.related_releases[0].release_date} Icon={ChevronDoubleUpIcon}/>
                                        </div>
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