import {getPopularity, numberWithCommas, convertArtistReleaseDate, getArtistAlbumSingleCount} from "../utils/functions";



export const QuickStat = ({title, value, Icon}) => {


    const handleQuickStatValue = () => {
        switch(title) {
            case 'Popularity':
                return getPopularity(value)
            case 'Latest Release':
                return convertArtistReleaseDate(value)
            case 'Followers':
                return numberWithCommas(value)
            case 'Discography':
                return getArtistAlbumSingleCount(value)
            default:
                return value
        }
    }



    return (
        <>
            <div className={'inline-flex items-center bg-zinc-700/80 mb-[15px] px-6 py-4 mr-2 rounded-2xl overflow-hidden group'}>
                <span className={'relative w-[43px]'}>
                    <span className={'w-[29px] inline-block'}>
                        { <Icon className={'group-hover:text-green-500'}/> }
                    </span>
                </span>
                <div className={'min-w-[120px]'}>
                    <h4 className={'text-md font-bold text-zinc-500/70'}>
                        {title}
                    </h4>
                    <p className={'text-lg font-bold'}>
                        {handleQuickStatValue()}
                    </p>
                </div>
            </div>
        </>
    );
}