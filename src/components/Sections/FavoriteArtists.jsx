import React from 'react';
import { motion } from 'framer-motion';
import {ArtistCard} from '../ArtistCard/ArtistCard';
import { GridItem } from '../GridItem';

export const FavoriteArtists = ({favoriteArtists, onUpdateData}) => {

    const gridPositions = [
        {row: 3, col: 10},
        {row: 4, col: 15},
        {row: 7, col: 18},
        {row: 3, col: 19},
        {row: 2, col: 23}
    ]
    const handleButtonClick = (artist) => {
        if(!artist) return null;
        return onUpdateData(artist);
    };

    if(!favoriteArtists) return null;

    return (
        <>
            <section className={'grid grid-cols-26 grid-rows-10 h-section relative'}>
                {/*    summary  */}
                <div className={'relative grid grid-cols-7 col-[3_/_span_7] row-[4_/_span_6]  z-20'}>
                    <div className={'absolute top-0 left-0 leading-6'}>
                        <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                        <span className={'inline-block lg:pr-[5vh]'}>
                            <motion.span initial={{opacity: 0 ,  y:100}} animate={{opacity: 1 ,  y:0 }} transition={{duration: 0.4, delay: 0.5}}> Grooving to </motion.span><br/>
                            <motion.span initial={{opacity: 0 ,  y:100}} animate={{opacity: 1 ,  y:0 }} transition={{duration: 0.4, delay: 0.8}} className={'break-normal text-green-400'}> {favoriteArtists[0]?.name} </motion.span>
                            <br/>
                         </span>
                        </h1>
                        <p className={'font-light text-xl text-gray-100 pr-[10vh]'}>
                        <motion.span className={'inline-block leading-loose'} initial={{opacity: 0, y:30}} animate={{opacity: 1, y:0 }} transition={{duration: 0.8, delay: 0.8}}>
                            When it comes to that one artist to grace your ears, nobody does is quite
                            like {favoriteArtists[0]?.name} for you!
                        </motion.span>
                        </p>
                    </div>
                </div>

                {/* artist cards */}
                { gridPositions.map((position, index) => {

                    // Top Artist is a large grid item and large artist card
                    if(index === 0){
                        return (
                            <GridItem key={index} row={position.row} col={position.col} large animate={'visible'} custom={index}>
                                <label htmlFor="modal" className="absolute btn w-full h-full border-0" onClick={() => handleButtonClick(favoriteArtists[index])}>
                                    <ArtistCard large artist={favoriteArtists[index]}  />
                                </label>
                            </GridItem>
                        )
                    }
                    return (
                        <GridItem key={index} row={position.row} col={position.col} animate={'visible'} custom={index}>
                            <label htmlFor="modal" className="absolute btn w-full h-full border-0" onClick={() => handleButtonClick(favoriteArtists[index])}>
                                <ArtistCard rank={index + 1} artist={favoriteArtists[index]}  />
                            </label>
                        </GridItem>
                    )
                })}


            </section>


        </>
    );
}