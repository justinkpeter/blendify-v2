import { ModalNav } from "./Modals/ModalNav";
import { HeartIcon, StarIcon, MusicalNoteIcon, ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import { QuickStat } from "./QuickStat"
import { Carousel } from "./Carousel";
import '../styles/Modal.css'
import * as React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import {AudioFeature} from "./AudioFeature";



export const GenrePill = ({genre}) => {
    return(
        <>
            <span className={'text-sm bg-zinc-500/60  inline-block rounded-full px-5 py-2 mr-1.5 mb-4'}> {genre} </span>
        </>
    )
}
export const Modal = ({isOpen,loading, data, onUpdateData}) => {

    const handleModalClose = () => {
        console.log('closing modal')
        onUpdateData(null);
    }



    if(isOpen && data?.type === 'artist'){
        return(
           <>
               <input type="checkbox" id={'modal'} className="modal-toggle" />
               <div className="modal">
                   <div className="modal-box rounded-3xl max-w-6xl max-h-[85vh] relative px-14 bg-zinc-900 min-h-[20vh] py-0">
                       <ModalNav closeModal={() => handleModalClose()}/>
                       <div className={'h-[70vh] w-full relative modal-content'}  >
                           { loading ? <LoadingSpinner/> : ''}
                           <div  id={'scrollable'} className={'relative flex w-full h-full overflow-y-scroll gap-[70px] scroll-smooth mt-[5vh]'} >
                               {/*image */}
                               <div className={'w-fit h-fit sticky top-0'}>
                                   <div className={'h-fit text-white'}>
                                       <div className={'relative overflow-hidden w-[306px] h-[306px] '}>
                                           <div className={'w-full h-full bg-cover rounded-2xl'} style={{backgroundImage: `url(${data?.data.images[0]?.url})`}}/>
                                       </div>
                                       <a className={'btn hover:bg-green-800 w-full mt-5 bg-green-500 text-white border-0 normal-case'} href={data?.data.uri} >
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
                                                {data?.data.name}
                                            </span>
                                       </h1>
                                       {/* genres*/}
                                       <div className={'mt-5'}>
                                           {data?.data?.genres.map((genre) => {
                                               return(
                                                   <GenrePill genre={genre}/>
                                               )
                                           })}
                                       </div>
                                       {/*/!* popularity & followers *!/*/}
                                       <div className={'flex mb-[25px]'}>
                                           <QuickStat title={'Popularity'} value={data?.data.popularity} Icon={StarIcon}/>
                                           <QuickStat title={'Followers'} value={data?.data.followers.total} Icon={HeartIcon}/>
                                       </div>
                                       {/* top tracks*/}
                                       <div>
                                           { data?.data.top_tracks && <Carousel title={'Top Tracks'} id={'top-tracks-carousel'} items={data.data.top_tracks.slice(0, 6)} numbers={true}/>}
                                           <div className={'flex'}>
                                               <QuickStat title={'Discography'} value={data?.data.related_releases} Icon={MusicalNoteIcon}/>
                                               <QuickStat title={'Latest Release'} value={data?.data.related_releases[0].release_date} Icon={ChevronDoubleUpIcon}/>
                                           </div>
                                       </div>
                                       {/* related artists */}
                                       <div>
                                           <Carousel title={'Related Artists'} id={'related-artists-carousel'}  items={data?.data?.related_artists.slice(0,6)} numbers={false}/>
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

    if(isOpen && data?.type === 'track') {
        return(
            <>
                <input type="checkbox" id={'modal'} className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box rounded-3xl max-w-6xl max-h-[85vh] relative px-14 bg-zinc-900 min-h-[20vh] py-0">
                        <ModalNav closeModal={() => handleModalClose()}/>
                        <div className={'h-[70vh] w-full relative modal-content'}  >
                            { loading ? <LoadingSpinner/> : ''}
                            <div  id={'scrollable'} className={'relative flex w-full h-full overflow-y-scroll gap-[70px] scroll-smooth mt-[5vh]'} >
                                {/*image */}
                                <div className={'w-fit h-fit sticky top-0'}>
                                    <div className={'h-fit text-white'}>
                                        <div className={'relative overflow-hidden w-[306px] h-[306px] '}>
                                                <div className={'w-full h-full bg-cover rounded-2xl'} style={{backgroundImage: `url(${data?.data.album.images[0]?.url})`}}/>
                                        </div>
                                        <a className={'btn hover:bg-green-800 w-full mt-5 bg-green-500 text-white border-0 normal-case'} href={data?.data.uri}>
                                            <span> Open in Spotify</span>
                                        </a>
                                    </div>
                                </div>
                                {/* content*/}
                                <div className={'w-full max-w-[576px] h-fit'}>
                                    <div className={'text-white min-w-[576px] height-[80vh]  overflow-y-scroll'} >
                                        {/* name*/}
                                        <h1 className={'text-6xl font-black mt-3 mb-7'}>
                                            <span className={'inline-block leading-[5rem]'}>
                                                {data?.data.name}
                                            </span>
                                        </h1>
                                        {/* genres*/}
                                        <div className={'my-5'}>
                                            {data?.data?.artists.map((artist) => {
                                                return(
                                                    <GenrePill genre={artist.name}/>
                                                )
                                            })}
                                        </div>
                                        {/*/!* popularity & followers *!/*/}
                                        <div className={'flex mb-[25px]'}>
                                            <QuickStat title={'Popularity'} value={data?.data.popularity} Icon={StarIcon}/>
                                            <QuickStat title={'Latest Release'} value={data?.data.release_date} Icon={ChevronDoubleUpIcon}/>
                                        </div>

                                        <div className={'mt-10 '}>
                                            <h4 className={'text-2xl font-bold mb-5'}> Audio Features </h4>
                                            <AudioFeature feature={'Danceability'} value={data?.data?.audio_features?.danceability} Icon={MusicalNoteIcon}/>
                                            <AudioFeature feature={'Energy'} value={data?.data?.audio_features?.energy} Icon={MusicalNoteIcon}/>
                                            <AudioFeature feature={'Speechiness'} value={data?.data?.audio_features?.speechiness} Icon={MusicalNoteIcon}/>
                                            <AudioFeature feature={'Valence'} value={data?.data?.audio_features?.valence} Icon={MusicalNoteIcon}/>
                                            <AudioFeature feature={'Loudness'} value={data?.data?.audio_features?.loudness} Icon={MusicalNoteIcon}/>
                                            <AudioFeature feature={'Tempo'} value={data?.data?.audio_features?.tempo} Icon={MusicalNoteIcon}/>
                                        </div>

                                        <div className={'mt-5'}>
                                            {/*<Carousel title={'Related Tracks'} id={'related-tracks-carousel'}  items={data?.data?.related_tracks.slice(0,6)} numbers={false}/>*/}
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



}