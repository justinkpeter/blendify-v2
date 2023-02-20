export const ListItems = ({children}) => {
    return(
        <div className={'relative grid grid-cols-3 gap-4 overflow-y-scroll' }>
            {children}
        </div>
    )
}