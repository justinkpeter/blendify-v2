import React from "react";
import { motion } from "framer-motion";
export const GridItem = ({ col, row, children, large, animate, custom}) => {

    // set grid item style based on if large prop is passed
    const gridItemStyle = large ?
        {
            gridColumnStart: col,
            gridColumnEnd: col + 4,
            gridRowStart: row,
            gridRowEnd: row + 5
        } :
        {
            gridColumnStart: col,
            gridColumnEnd: col + 3,
            gridRowStart: row,
            gridRowEnd: row + 3
        }

    const variants = {
        visible: i => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: i * 0.6,
                duration: 0.8,
                type: 'easeInOut',
            },
            transformOrigin: 'top left'
        }),
        hidden: { opacity: 0, scale:0, transition: {
            delay: 1.4,
            },
            transformOrigin: 'top left'},
    }



    return (
        <motion.div
            className={'relative grid'}
            style={gridItemStyle}
            initial={'hidden'}
            animate={animate}
            variants={variants}
            custom={custom}
        >
            {children}
        </motion.div>
    )
};

