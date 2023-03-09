import React from "react";

export const AudioFeature = ({feature, value, Icon}) => {


    return (
        <>
            <div className={'relative inline-flex items-center bg-zinc-700/80 mb-[15px] py-6 pr-3 mr-2 rounded-2xl overflow-hidden group'}>
                <span className={'relative w-[43px] ml-4'}>
                    <span className={'w-[29px] inline-block'}>
                         <Icon className={'text-green-400'}/>
                    </span>
                </span>
                <div className={'min-w-[110px] mb-2'}>
                    <h4 className={'text-md font-bold text-zinc-500'}>
                        { feature }
                    </h4>

                    { feature.toLowerCase()  === 'loudness' && <p className={'text-xl font-black'}> { Number(value).toFixed(2) } <span className={'text-sm'}>db</span></p> }
                    { feature.toLowerCase()  === 'tempo' && <p className={'text-xl font-black'}> { Number(value).toFixed(0) } <span className={'text-sm'}>bpm</span></p> }
                    { feature.toLowerCase()  === 'danceability' && <p className={'text-xl font-black'}> { Number(value * 100).toFixed(1) } </p> }
                    { feature.toLowerCase()  === 'energy' && <p className={'text-xl font-black'}> { Number(value * 100).toFixed(1) } </p> }
                    { feature.toLowerCase()  === 'valence' && <p className={'text-xl font-black'}> { Number(value * 100).toFixed(1) } </p> }
                    { feature.toLowerCase()  === 'speechiness' && <p className={'text-xl font-black'}> { Number(value * 100).toFixed(1) } </p> }
                </div>
                <div className={'absolute bottom-0 left-0 w-full h-2 bg-green-500/30'}>
                    <div className={`relative h-2 bg-green-100 w-[${value * 100}%]`}/>
                </div>
            </div>
        </>
    );
}