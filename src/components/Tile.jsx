export const Tile = ({col, row, children, large}) => {

    const tileStyle = large ?
        {
            gridColumnStart: col,
            gridColumnEnd: col + 5,
            gridRowStart: row,
            gridRowEnd: row + 6
        } :
        {
            gridColumnStart: col,
            gridColumnEnd: col + 3,
            gridRowStart: row,
            gridRowEnd: row + 3
        }

    const tileClass = 'btn w-full h-full px-0 bg-transparent border-none hover:bg-transparent hover:border-none'

    return (


        <>
            <div className={'relative grid'} style={tileStyle}>
                {/*{children}*/}
                <label htmlFor={'modal'} className={tileClass}>
                    {children}
                </label>
            </div>
        </>
    );
}