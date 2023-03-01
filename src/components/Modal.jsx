import { ModalNav } from "./Modals/ModalNav";
import { HeartIcon, StarIcon, MusicalNoteIcon, ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import { QuickStat } from "./QuickStat"
import { Carousel } from "./Carousel";
import '../styles/Modal.css'

const GenrePill = ({genre}) => {
    return(
        <>
            <span className={'text-sm bg-zinc-500/60  inline-block rounded-full px-5 py-2 mr-1.5 mb-4'}> {genre} </span>
        </>
    )
}
export const Modal = ({ id, artist}) => {

    return(
        <>
            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box rounded-3xl max-w-6xl max-h-[85vh] relative px-14 bg-zinc-900 min-h-[20vh] py-0">
                    <ModalNav id={id}/>
                    <div className={'h-[70vh] w-full relative modal-content'}  >
                        <div  id={'scrollable'} className={'relative flex w-full h-full overflow-y-scroll gap-[70px] scroll-smooth '} >
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
                            <div className={'w-full max-w-[576px] h-fit'}>
                                <div className={'text-white min-w-[576px] height-[80vh]  overflow-y-scroll'} >
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
                                    <div className={'flex mb-[25px]'}>
                                        <QuickStat title={'Popularity'} value={artist?.popularity} Icon={StarIcon}/>
                                        <QuickStat title={'Followers'} value={artist?.followers.total} Icon={HeartIcon}/>
                                    </div>
                                    {/* top tracks*/}
                                    <div>
                                        <Carousel title={'Top Tracks'} id={'top-tracks-carousel'}  items={artist?.tracks.slice(0,6)} numbers={true}/>
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

                    {/* scroll bar */}
                    {/*<div className={'absolute right-14 top-36 bg-gray-400/40 w-0.5 h-[50vh]'}>*/}
                    {/*    <motion.div className={' relative w-full h-[30vh] bg-green-500'}>*/}

                    {/*    </motion.div>*/}
                    {/*</div>*/}

                    {/*<ScrollBar position={scrollPosition}/>*/}
                </div>
            </div>
        </>
    )

}