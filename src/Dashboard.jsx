import React, { useRef, useState, useLayoutEffect, useCallback, forwardRef } from "react";
import ResizeObserver from "resize-observer-polyfill"
import { motion, useTransform, useSpring, useScroll} from "framer-motion"
import {LoadingSpinner} from "./components/LoadingSpinner";
import {Navbar} from "./components/Navbar";
import {Footer} from "./components/Footer";


const ScrollContainer = ({ children }) => {
    return(
        <div className={'fixed left-0 right-0 will-change-transform '}>
            {children}
        </div>
    )
}

const SectionContainer = forwardRef(({ children, style }, ref) => {
    return(
        <motion.div className={'fixed h-screen max-w-fit flex items-center scrollbar-hide'} ref={ref} style={style}>
            {children}
        </motion.div>
    )
})


const Sections = ({ children }) => {
    return(
        <div className={'relative w-full flex bg-zinc-900'}>
            {children}
        </div>
    )
}


export const Dashboard = ({children, isLoaded, user}) => {

    const scrollRef = useRef(null)
    const ghostRef = useRef(null)
    const [scrollRange, setScrollRange] = useState(0)
    const [viewportWidth, setViewportWidth] = useState(0)

    useLayoutEffect(() => {
        scrollRef && setScrollRange(scrollRef.current.scrollWidth);
    }, [scrollRef, children]);

    const onResize = useCallback((entries) => {
        for (let entry of entries) {
            setViewportWidth(entry.contentRect.width);
        }
    }, []);

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => onResize(entries));
        resizeObserver.observe(ghostRef.current);
        return () => resizeObserver.disconnect();
    }, [onResize]);

    const { scrollYProgress } = useScroll();
    const transform = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -scrollRange + viewportWidth]
    );
    const physics = { damping: 15, mass: 0.27, stiffness: 55 };
    const spring = useSpring(transform, physics);



    const LoadingScreen = () => {
        return(
            <div className={'relative h-screen w-screen'}>
                <LoadingSpinner/>
            </div>
        )
    }

    return (
        <>
            <ScrollContainer>
                <Navbar user={user}/>
                <SectionContainer ref={scrollRef} style={{x:spring}}>
                    { isLoaded === false ?
                        <Sections> <LoadingScreen/> </Sections> :
                        <Sections> {children} </Sections> }
                </SectionContainer>
            </ScrollContainer>
            <div ref={ghostRef} style={{ height: scrollRange }} className={'w-screen'} />
            <Footer/>

        </>
    );
}