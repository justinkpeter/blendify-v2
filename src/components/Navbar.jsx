import React, {useState} from 'react';
import LinkIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';
import { EllipsisVerticalIcon} from "@heroicons/react/20/solid";
import { ArrowsPointingOutIcon, ArrowsPointingInIcon, ArrowLeftOnRectangleIcon, SpeakerXMarkIcon, SpeakerWaveIcon} from "@heroicons/react/20/solid";

import { ProgressPill } from "./ProgressPill";
import { AboutDropdown } from "./Dropdowns/AboutDropdown";
import { ShareBlendify } from "./Dropdowns/ShareBlendify";
import {enterFullscreen, exitFullscreen, mutePage, unmutePage} from "../utils/functions";

import { useDataLayerValue } from "../utils/DataLayer";




const IconButton = ({icon, label, index, dropdown}) => {
    return (
        <div className='dropdown'>
            <label tabIndex={index} className={"btn btn-ghost rounded-full m-1 flex gap-1 text-sm focus:bg-green-500/30 focus:text-green-500 normal-case "}>
                {icon}
                {label}
            </label>
            {dropdown}

        </div>
    );
}

const ProfileButton = ({user}) => {

    const [{ token }, dispatch ] = useDataLayerValue();


    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isAudio, setIsAudio] = useState(true);

    const handleFullscreen = () => {
        if (isFullscreen) {
            setIsFullscreen(false);
            exitFullscreen();
        } else {
            setIsFullscreen(true);
            enterFullscreen();
        }
    }

    const handleAudio = () => {
        if (isAudio) {
            setIsAudio(false);
            mutePage();
        } else {
            setIsAudio(true);
            unmutePage();
        }
    }

    const handleLogout = () => {
        dispatch({
            type: 'SET_TOKEN',
            token: null
        })
    }

    return(
        <>
            <div className={'navbar-end'}>
                <label> { user?.display_name } </label>
                <label className="avatar pl-4">
                    <div className="w-10 rounded-full">
                        <img src={user?.images[0].url} alt={''}/>
                    </div>
                </label>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle m-1 focus:bg-green-500/30">
                        <EllipsisVerticalIcon className={'h-6 w-8 group-hover:text-gray-200'}/>
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu overflow-hidden shadow bg-black/10 rounded-box w-52 group">
                        {
                            !isFullscreen &&
                            <li className={'active:bg-blue-600'} onClick={() => handleFullscreen()}>
                                <span> <ArrowsPointingOutIcon className={'h-4 w-4 group-hover:text-gray-200'}/> Enter fullscreen </span>
                            </li>
                        }
                        {
                            isFullscreen &&
                            <li className={''} onClick={() => handleFullscreen()}>
                                <span> <ArrowsPointingInIcon className={'h-4 w-4 group-hover:text-gray-200'}/> Exit fullscreen </span>
                            </li>
                        }
                        {
                            isAudio &&
                            <li className={''} onClick={() => handleAudio()}>
                                <span> <SpeakerXMarkIcon className={'h-4 w-4 group-hover:text-gray-200'}/> Mute audio </span>
                            </li>

                        }
                        {
                            !isAudio &&
                            <li className={''} onClick={() => handleAudio()}>
                                <span> <SpeakerWaveIcon className={'h-4 w-4 group-hover:text-gray-200'}/> Unmute audio </span>
                            </li>
                        }
                        {
                            <li className={''} onClick={() => handleLogout()}>
                                <span> <ArrowLeftOnRectangleIcon className={'h-4 w-4 group-hover:text-gray-200'}/> Logout </span>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export const Navbar = ({user}) => {
    if (!user) return (<></>)

    return (
        <>
            <div className='navbar text-white fixed z-50 px-10 '>
                <div className='navbar-start'>
                    <button className=' normal-case text-xs font-bold'> blendify </button>
                    <IconButton icon={<LinkIcon/>} label={'About'} dropdown={ <AboutDropdown tabIndex={0}/> } index={0}/>
                    <IconButton icon={<ShareIcon/>} label={'Share'} dropdown={ <ShareBlendify tabIndex={1}/> } index={1}/>
                </div>
                <ProgressPill/>
                <ProfileButton user={user}/>
            </div>
        </>
    );
}