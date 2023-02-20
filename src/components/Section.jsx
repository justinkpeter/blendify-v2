export const Section = ({topTracks, children}) => {

    if(topTracks){
        return (
            <section className={'grid grid-cols-33 grid-rows-10 h-section w-[330vh]'}> {children} </section>
        )
    }
    else{
        return (
            <section className={'grid grid-cols-26 grid-rows-10 h-section'}>
                {children}
            </section>
        )
    }
}