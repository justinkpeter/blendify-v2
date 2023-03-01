import React, {useEffect, useState} from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { getScrollPercentage } from "../utils/functions";


export const ProgressPill = () => {

    const [scrollerStyle, setScrollerStyle] = useState(`translate3d(0px, 0%, 0px)`);

    // add scroll with spring effect
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // sections
    const sections = [
        {name: "Favorite Artists", color: "bg-yellow-500"},
        {name: "Favorite Tracks", color: "bg-blue-500"}
        // {name: "Personality Profile", color: "bg-yellow-500"},
        // {name: "Audio Analysis", color: "bg-red-500"}
    ]

    function getScrollerStyle( label ){
        switch(label) {
            default:  setScrollerStyle('translate3d(0px, 0%, 0px)')
                break
            case "Favorite Artists":
                setScrollerStyle('translate3d(0px, 0%, 0px)')
                break

            case "Favorite Tracks":
                setScrollerStyle('translate3d(0px, -45%, 0px)')
                break
        }
    }

    // handles label on progress bar when scrolling through sections
    useEffect(() => {
        document.addEventListener("scroll", () => {
            // need to find a way to dynamically get the 'breakpoints' for each section
            // I used 33% for each section, because I have 3 sections at the time of writing this
            // so 100 / 3 = 33
            // but if I add more sections, I need to dynamically calculate the percentage
            const currentSection = sections[Math.floor(getScrollPercentage() / 30)]?.name
            getScrollerStyle(currentSection)
        });

    }, [sections])


    return (
        <div className="navbar-center justify-start rounded-full h-10 bg-red-300">
            <div className={"flex relative bg-green-500 rounded-full h-full w-48 object-contain place-content-center z-0 overflow-hidden"}>
                <motion.div
                    id={"progress-bar"}
                    style={{scaleX, transformOrigin: 'left center'}}
                    className={"flex absolute left-0 w-full h-full bg-green-700 rounded-l-lg will-change-transform z-0"}
                >
                </motion.div>
                <div className={"flex flex-col transition absolute z-10 gap-y-3 font-bold text-sm p-2 text-white ease-out duration-500"}
                     style={{transform: `${scrollerStyle}`}}>
                    {sections.map((section) => {
                        return(
                            <span key={section.name}> {section.name } </span>
                        )
                    })}

                </div>
            </div>
        </div>
    );
}
