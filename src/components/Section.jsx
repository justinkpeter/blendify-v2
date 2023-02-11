export const Section = ({children}) => {
    return (
        <>
            <section className={'grid grid-cols-26 grid-rows-10 h-section'}>
                {children}
            </section>
        </>
    );
}