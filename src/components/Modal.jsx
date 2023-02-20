export const Modal = () => {
    return (
        <>
            <div className={'modal-background'}>
                <div className={'modal-container w-screen fixed top-0 left-0 bottom-0 right-0 h-screen '}>
                    <button> close the modal </button>
                    <header> Title </header>
                    <section> Content </section>
                    <footer> Footer </footer>
                </div>
            </div>

        </>
    );
}