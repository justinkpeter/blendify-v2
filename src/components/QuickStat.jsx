import {getPopularity, numberWithCommas} from "../utils/functions";



export const QuickStat = ({title, value, Icon}) => {
    return (
        <>
            <div className={'inline-flex items-center bg-zinc-700/80 mb-[15px] px-6 py-4 mr-2 rounded-2xl overflow-hidden group'}>
                <span className={'relative w-[43px]'}>
                    <span className={'w-[29px] inline-block'}>
                        { <Icon className={'group-hover:text-green-500'}/> }
                    </span>
                </span>
                <div className={'min-w-[120px]'}>
                    <h4 className={'text-xs font-bold text-zinc-100/70'}>
                        {title}
                    </h4>
                    <p className={'text-2xl font-bold'}>
                        {title == 'Popularity' ?  getPopularity(value) : numberWithCommas(value)}
                    </p>
                </div>
            </div>
        </>
    );
}