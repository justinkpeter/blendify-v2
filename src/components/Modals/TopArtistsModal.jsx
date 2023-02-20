import {useEffect, useRef, useState} from "react";
import { ContentArea } from '../Modals/ContentArea';
import { ListItems } from "../Modals/ListItems";
import { ListCard } from "../Modals/ListCard";
import '../../styles/Modal.css'


import {motion, useTransform, useScroll, useMotionValueEvent } from "framer-motion";

export const TopArtistsModal = ({artists}) => {


    // get scroll position of modal
    const { scrollYProgress } = useScroll();

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useEffect(() => {

        //select modal element
        // const modal = document.querySelector('.modal');


        document.addEventListener("scroll", (e) => {
            console.log(scrollYProgress.get())
        });
    })

    const [scrollPercentage, setScrollPercentage] = useState(0);

    const onScroll = (e) =>{
        // get scroll position of modal
        const scrollPosition = e.target.scrollTop;
        // get height of modal
        const modalHeight = e.target.scrollHeight - e.target.clientHeight;
        // get scroll percentage
        const scrollPercentage = (scrollPosition / modalHeight) * 100;
        // set scroll percentage to state
        setScrollPercentage(scrollPercentage);
        console.log(scrollPercentage)
    }


    return (
        <>
            <input type="checkbox" id={'top-artists-modal'} className="modal-toggle" />
            <div className="modal ">
                {/*<div className={'absolute top-10 right-24 my-6 z-50 bottom-10 rounded-lg bg-zinc-500 w-1 backdrop-blur-2xl'}>*/}
                {/*    <div className={'relative w-full h-10 bg-green-500'} style={{height: `${scrollPercentage}%`}}>*/}

                {/*    </div>*/}
                {/*</div>*/}

                <div className="modal-box h-fit max-w-6xl relative bg-zinc-900 text-white " onScroll={onScroll}>
                    <label htmlFor="top-artists-modal" className="btn btn-sm btn-circle fixed right-6 top-2 z-50">✕</label>
                    {/*<span> {artists[0]?.name} </span>*/}
                    <ContentArea>

                        <div className={'flex relative'}>

                            {/* text */}
                            <div className={'sticky top-0 flex flex-col space-y-3 pt-24 w-2/3 h-fit gap-x-[10vh] pr-0 '}>
                                <div className={'inline-block text-7xl font-extrabold'}>
                                    <h1 className={'inline-block'}>
                                        <span>Your Top</span>
                                    </h1>
                                    <h1 className={'inline-block text-green-500'}>
                                        <span>Artists</span>
                                    </h1>
                                </div>
                            </div>

                            {/* cards */}
                            <div className={'w-full h-full overflow-y-scroll '} >
                                <ListItems>
                                    {
                                        artists.map((artist, index) => {
                                            return(
                                                <ListCard key={index} index={index + 1} artist={artist}/>
                                            )
                                        })
                                    }
                                </ListItems>
                            </div>

                        </div>



                    </ContentArea>
                    {/*<ContentArea>*/}
                    {/*    <div className={'flex w-full h-fit gap-x-[10vh] pr-0 '}>*/}
                    {/*        <div className={'sticky top-0 w-2/3 h-fit flex flex-col space-y-3 pt-24 '}>*/}
                    {/*            <h1 className={'inline-block text-7xl font-extrabold'}>*/}
                    {/*                <span>Your Top</span>*/}
                    {/*            </h1>*/}
                    {/*            <h1 className={'inline-block text-7xl text-green-500 font-extrabold'}>*/}
                    {/*                <span>Artists</span>*/}
                    {/*            </h1>*/}
                    {/*            <p>*/}
                    {/*                <span>*/}
                    {/*                    Showing your top artists in the past 30 days. You can also add a playlist on Spotify.*/}
                    {/*                    {artists[0]?.name}*/}
                    {/*                </span>*/}
                    {/*            </p>*/}
                    {/*        </div>*/}

                    {/*        <div className={'w-full h-full overflow-y-scroll '} >*/}
                    {/*            <ListItems>*/}
                    {/*                {*/}
                    {/*                    artists.map((artist, index) => {*/}
                    {/*                        return(*/}
                    {/*                            <ListCard key={index} index={index + 1} artist={artist}/>*/}
                    {/*                        )*/}
                    {/*                    })*/}
                    {/*                }*/}

                    {/*            </ListItems>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</ContentArea>*/}

                    {/*<h3 className="text-lg font-bold">Your Top Artists </h3>*/}
                    {/*<p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>*/}
                </div>
            </div>
        </>
    );
}