import React, {useEffect, useState} from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { getScrollPercentage } from "../utils/functions";


export const ProgressPill = () => {

    const [scrollerStyle, setScrollerStyle] = useState(`translate3d(0px, 0%, 0px)`);

    // framer motion progress bar
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // sections
    const sections = [
        {name: "Favorite Artists", color: "bg-yellow-500"},
        {name: "Favorite Tracks", color: "bg-blue-500"},
        {name: "Top Genres", color: "bg-red-500"},
        {name: "Taste Profile", color: "bg-blue-500"},

    ]

    function getScrollerStyle( label ){
        switch(label) {
            default:  setScrollerStyle('translate3d(0px, 0%, 0px)')
                break
            case "Favorite Artists":
                setScrollerStyle('translate3d(0px, 0%, 0px)')
                break
            case "Favorite Tracks":
                setScrollerStyle('translate3d(0px, -25%, 0px)')
                break
            case "Top Genres":
                setScrollerStyle('translate3d(0px, -50%, 0px)')
                break
            case "Taste Profile":
                setScrollerStyle('translate3d(0px, -75%, 0px)')
                break

        }
    }

    // handles label on progress bar when scrolling through sections
    useEffect(() => {
        document.addEventListener("scroll", () => {
            const currentSection = sections[Math.floor(getScrollPercentage() /  ( 100 / sections.length ))]?.name
            getScrollerStyle(currentSection)
        });

    })


    return (
        <>
            <div className="navbar-center justify-start rounded-full h-10 bg-red-300">
                <div className={"flex relative bg-green-500 rounded-full h-full w-48 object-contain place-content-center z-0 overflow-hidden"}>
                    <motion.div
                        id={"progress-bar"}
                        style={{scaleX, transformOrigin: 'left center'}}
                        className={"flex absolute left-0 w-full h-full bg-green-700 rounded-l-lg will-change-transform z-0"}
                    >
                    </motion.div>
                    <div className={"flex flex-col transition absolute z-10 gap-y-2 font-bold text-sm pt-2 text-white ease-out duration-500"}
                         style={{transform: `${scrollerStyle}`}}>
                        {sections.map((section) => {
                            return(
                                <span className={'flex justify-center w-full'} key={section.name}> {section.name } </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>

    );
}
