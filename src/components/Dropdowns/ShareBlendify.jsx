import React, { useState } from "react";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { ClipboardDocumentIcon } from "@heroicons/react/20/solid";





export const ShareBlendify = ({tabIndex}) => {

    const [copyLink, setCopyLink] = useState(false)
    const handleClick = (card) => {
        if(card === 'Copy Link') {
            // copy the link to the clipboard
            navigator.clipboard.writeText('https://blendify.xyz')
            // remove the alert after 2 seconds
            setCopyLink(true)
            setTimeout(() => {
                setCopyLink(false)
            }, 2000)
        }
        else if(card === 'Twitter') {
            // share the link on twitter
            window.open('https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20app%20I%20found%20on%20the%20web%20called%20Blendify%20-%20https://blendify.netlify.app/')
        }
    }

    // function to slowly increase the opacity of the alert

    const ShareCard = ({icon, title}) => {
        return(
            <>
                <div className={'w-28 h-32 bg-gray-400/10 rounded-2xl flex flex-col items-center justify-between py-6 font-bold btn btn-ghost normal-case'} onClick={() => handleClick(title)}>
                    {icon}
                    {title}
                </div>
            </>
        )
    }

    return (
        <>
            <ul tabIndex={tabIndex} className="dropdown-content menu mt-5 p-5 pb-2 shadow bg-zinc-800 rounded-box w-[25rem] text-white h-80 ">
                <div className={'p-6'}>
                    <h1 className={'text-4xl font-extrabold'}> Share blendify </h1>
                    <div className={'mt-1 text-white/50 text-sm font-bold '}>
                        Choose your preferred social platform
                    </div>

                    <div className={'mt-3 flex gap-4'}>
                        <ShareCard icon={ <TwitterIcon/> } title={'Twitter'}/>
                        <ShareCard icon={ <ClipboardDocumentIcon className={'h-11 h-11'}/> } title={'Copy Link'}/>
                    </div>


                    {/* COPY LINK ALERT */}
                    <div className="ml-32 h-fit alert alert-info bg-transparent text-green-500 text-sm w-full text-right font-medium transition ease-in duration-600">
                        <div>
                            <span> {copyLink ? 'copied link!' : ''}</span>
                            {/*<span> copied </span>*/}
                        </div>
                    </div>

                </div>
            </ul>
        </>
    );
}