import { useState } from "react";
import {ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/react/24/solid";


const CarouselItem = ({item, index, showNumber}) => {

    // search for first image url in item
    const imageSrc = item?.images?.[0]?.url || item?.album?.images?.[0]?.url;
    const rank = parseInt(index) + 1 + '. ';

    return(
        <>
            <div className={'carousel-item relative w-[11.5rem]'}>
                <div className={'list-card'}>
                    <div className={'artist-cover'} style={{backgroundImage: `url(${imageSrc})`}}/>
                    <div className={'details'}>
                        <h3 className={'text-sm font-bold flex flex-col mb-2 '}>
                            <span className={'flex'}> { showNumber ? rank : '' } {item?.name} </span>
                        </h3>
                        <div className={'flex flex-col'}>
                            <span className={'text-xs text-gray-400'}> {item?.artists?.map((artist) => {
                                return (
                                    <>
                                        <span> {artist.name}</span>
                                    </>
                                )
                            })} </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}
export const Carousel = ({items, title, id, numbers}) =>{

    function scrollCarousel(containerId, direction) {
        // direction is either 'left' or 'right'
        const container = document.getElementById(containerId);
        const containerWidth = container.offsetWidth;
        const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;

        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    const colorVariants = {
        'gray': 'text-gray-500',
        'white': 'text-white'
    }

    const [color, setColor] = useState(colorVariants['gray']);

    const handleScrollLeft = () => {
        scrollCarousel(id, 'left');
        setColor(colorVariants['gray'])
    };

    const handleScrollRight = () => {
        scrollCarousel(id, 'right');
        setColor(colorVariants['white'])
    };

    if(items.length === 0) return null;
    return (
        <>
            <div className={'relative mb-16'}>
                <div className={'flex justify-between'}>
                    <h4 className={'text-2xl font-bold'}>{title} </h4>
                    <div className={'flex gap-4'}>
                        <button className="btn btn-sm btn-ghost btn-circle text-xl" onClick={handleScrollLeft} >
                            { color === colorVariants['gray'] ? <ArrowLongLeftIcon className={'w-6 h-6 text-gray-500'}/> : <ArrowLongLeftIcon className={'w-6 h-6 text-white'}/> }
                        </button>
                        <button className="btn btn-sm btn-ghost btn-circle text-xl" onClick={handleScrollRight}>
                            { color === colorVariants['gray'] ? <ArrowLongRightIcon className={'w-6 h-6 text-white'}/> : <ArrowLongRightIcon className={'w-6 h-6 text-gray-500'}/>  }
                        </button>
                    </div>
                </div>
                <div id={id} className={'carousel carousel-center max-w-2xl pt-5 h-fit relative gap-3'}>
                    {items?.map((item, index) => {
                        return(
                            <CarouselItem key={index} item={item} index={index} showNumber={numbers}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}