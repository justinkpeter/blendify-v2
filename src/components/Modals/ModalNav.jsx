// import  LeftArrow  from '../../assets/icons/LeftArrow.svg';
// import  RightArrow from '../../assets/icons/RightArrow.svg';



// render right and left arrowws in the modal

const LeftArrow = () => {
    return(
        <>
            <div className={'btn btn-ghost'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
        </>
    )
}

const RightArrow = () => {
    return(
        <>
            <div className={'btn btn-ghost'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </>
    )
}


export const ModalNav = ({closeModal}) => {
    return (
        <>
            <nav className={'sticky top-8 left-10 flex justify-center z-50 '}>
                <div className={'relative flex w-full h-full'}>
                    <span className={'mr-9'}> <LeftArrow/> </span>
                    <span className={'mr-9'}> <RightArrow/> </span>
                </div>
            </nav>
            <label htmlFor={'modal'} className="btn btn-ghost font-black btn-circle text-3xl absolute right-10 top-8 text-red-500  z-50" onClick={closeModal}> ✕ </label>
        </>
    );


}