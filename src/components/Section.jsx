export const Section = ({topTracks, topGenres, streamingAnalysis, children}) => {

    if(topTracks){
        return (
            <section className={'grid grid-cols-33 grid-rows-10 h-section w-[330vh]'}> {children} </section>
        )
    }

    if(topGenres){
        return (
            <section className={'grid grid-cols-19 grid-rows-10 h-section w-[190vh] text-white'}> {children} </section>
        )
    }
    if(streamingAnalysis){
        return (
            <section className={'grid grid-cols-26 grid-rows-10 h-section w-[260vh] text-white'}> {children} </section>
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