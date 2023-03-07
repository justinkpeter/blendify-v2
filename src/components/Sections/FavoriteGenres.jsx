import React from "react";
import { motion } from "framer-motion";
const GenreBar = ({name, percentage, index, color}) => {

    const variants = {
        visible: i => ({
            transform: `scaleY(1)`,
            // opacity: 1,
            transition: {
                delay: i * 0.25,
                duration: 1.4,
                type: 'easeOut',
            },
            transformOrigin: 'bottom'
        }),
        hidden: {
            // opacity: 0,
            transform: `scaleY(0)`,
            transformOrigin: 'bottom'
        },
    }

    if(!percentage) return null;

    return (
        <>
            <div className={'absolute inset-0 z-20 block text-xl'}>
                {/* genre bar*/}
                <div className={'relative h-[50vh] overflow-hidden bg-gray-700 rounded-lg'}>
                    <span className={'h-[7.8vh] flex justify-center items-center transition text-gray-400 font-bold'}> {percentage}% </span>
                    {/*  genre bar level*/}
                    <motion.div
                        initial={'hidden'}
                        variants={variants}
                        whileInView={'visible'}
                        custom={index + 1}
                        style={{height: `${percentage}%`}}
                        className={`absolute right-0 bottom-0 left-0 rounded-lg ${color} origin-bottom`}/>
                </div>
                <h3 className={'absolute my-2 overflow-hidden capitalize text-center font-bold -left-[3vh] -right-[3vh] '}>
                    {name}
                </h3>
            </div>
        </>
    );
}




export const FavoriteGenres = ({favoriteGenres}) => {

    const genreBarPositions = [
        {row: 3, col: 9, color: 'bg-gradient-to-t from-amber-500 to-red-500'},
        {row: 3, col: 11, color: 'bg-gradient-to-t from-purple-200 to-blue-500'},
        {row: 3, col: 13, color: 'bg-gradient-to-t from-purple-800 to-blue-500'},
        {row: 3, col: 15, color: 'bg-gradient-to-t from-blue-200 to-green-500'},
        {row: 3, col: 17, color: 'bg-gradient-to-t from-blue-200 to-green-500'}
    ]


    if(!favoriteGenres) return null;

    return (
        <>
            <section className={' grid grid-cols-19 grid-rows-10 h-section w-[190vh] text-white '}>
                {/*summary*/}
                <div className={'relative grid grid-cols-7 col-[1_/_span_7] row-[4_/_span_6]  z-20'}>
                    <div className={'absolute top-0 left-0 leading-6'}>
                        <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                            <span className={'inline-block xl:pr-[5vh]'}>
                                <span> {favoriteGenres[0]?.name} </span><br/>
                                <span className={'break-normal text-green-400'}> is truly undefeated. </span>
                                <br/>
                             </span>
                        </h1>
                        <p className={'font-light text-xl text-gray-100 pr-[10vh]'}>
                            <span className={'inline-block leading-loose'}>
                               Looks like you're a <span className={'italic'}> huge </span>
                                {favoriteGenres[0]?.name} fan! This genre appears in {favoriteGenres[0]?.percentage}%
                                of your top tracks played in the last 4 weeks.
                            </span>
                        </p>
                    </div>
                </div>
                 {/* content*/}
                {favoriteGenres.map((genre, index) => {
                    return(
                        <div key={index} className={`grid relative row-[${genreBarPositions[index].row}_/_span_6] col-[${genreBarPositions[index].col}_/_span_1] z-20`}>
                            <GenreBar index={index} name={favoriteGenres[index]?.name} percentage={favoriteGenres[index]?.percentage} color={genreBarPositions[index].color}/>
                        </div>
                    )
                })}

            </section>
        </>
    );
}