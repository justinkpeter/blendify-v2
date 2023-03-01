import React from "react";

export const GridItem = ({ col, row, children, large }) => {

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


    // use inline div style to position grid items
    return (
        <div className={'relative grid'}
             style={gridItemStyle}
        >
            {children}
        </div>
    )
};

