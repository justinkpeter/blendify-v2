import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';

import { ProgressPill } from "./ProgressPill";


const IconButton = ({icon, label, text}) => {
    return (
        <div className='dropdown'>
            <label tabIndex={0} className={"btn btn-ghost rounded-full m-1 flex gap-1 text-sm focus:bg-green-500/30 focus:text-green-500 normal-case "}>
                {icon}
                {label}
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-5 shadow bg-zinc-800 rounded-box w-[40rem] text-white">
                <div className={'p-6'}>
                    <h1 className={'text-4xl font-extrabold'}> About the app </h1>
                    <div className={'mt-4'}>
                        Blendify is a streaming analysis and music discovery tool for Spotify users built on Spotify's Web API. In no way is this app affiliated with Spotify.
                    </div>

                    {/* PRIVACY */}
                    <div className={'mt-8 space-y-2'}>
                        <div className={'capitalize font-bold text-gray-300 text-sm'}> PRIVACY </div>
                        <div>
                            Blendify requires access to your Spotify account to function, as this includes your listening history, playlists, and saved tracks.
                            This data is not stored or shared with any third parties. No data is collected or stored on any server.
                        </div>
                    </div>

                    {/* RESOURCES */}
                    <div className={'mt-8 space-y-2'}>
                        <div className={'capitalize font-bold text-gray-300 text-sm'}> RESOURCES </div>
                        <div className={'flex rounded-lg overflow-hidden h-20'}>
                            <span className={'flex justify-center items-center w-20 bg-black'}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30">
                                        <path fill="#FFFFFE" fill-rule="evenodd" d="M2.535 15.304c0 5.436 3.572 10.048 8.525 11.675.622.114.851-.267.851-.592 0-.293-.011-1.263-.017-2.29-3.467.744-4.2-1.452-4.2-1.452-.566-1.423-1.383-1.8-1.383-1.8-1.131-.764.085-.749.085-.749 1.252.087 1.91 1.268 1.91 1.268 1.113 1.881 2.917 1.337 3.628 1.023.112-.795.435-1.338.791-1.645-2.768-.311-5.679-1.366-5.679-6.08 0-1.344.487-2.442 1.285-3.303-.13-.31-.556-1.562.12-3.257 0 0 1.047-.33 3.43 1.262.993-.273 2.06-.41 3.12-.414 1.058.004 2.126.141 3.122.414 2.379-1.592 3.424-1.262 3.424-1.262.679 1.695.252 2.946.122 3.257.8.861 1.283 1.959 1.283 3.302 0 4.726-2.916 5.766-5.691 6.071.447.382.845 1.13.845 2.278 0 1.647-.014 2.972-.014 3.377 0 .327.224.711.856.59 4.95-1.629 8.517-6.239 8.517-11.673C27.465 8.508 21.884 3 15 3 8.117 3 2.535 8.508 2.535 15.304z"></path>
                                    </svg>
                                </span>
                            </span>
                            <div className={'flex flex-col justify-center px-4 rounded-r-lg bg-gray-700/30'}>
                                <h5 className={'font-bold'}> Explore Codebase </h5>
                                <span className={'text-gray-400'}> coming soon </span>
                            </div>
                        </div>
                    </div>
                </div>

            </ul>

        </div>
    );
}


const ProfileButton = ({user}) => {
    return(
        <>
            <div className={'navbar-end'}>
                <label> { user?.display_name } </label>
                <label className="avatar pl-4">
                    <div className="w-10 rounded-full">
                        <img src={user?.images[0].url}/>
                    </div>
                </label>

            </div>
        </>
    )
}


export const Navbar = ({user}) => {
    return (
        <>
            <div className='navbar text-white fixed z-50 px-10 '>
                <div className='navbar-start'>
                    <a className='btn btn-ghost normal-case text-md'>blendify</a>
                    <IconButton icon={<LinkIcon/>} label={'About'} text={'some text '}/>
                    <IconButton icon={<ShareIcon/>} label={'Share'} text={'some text '}/>
                </div>
                <ProgressPill/>
                <ProfileButton user={user}/>
            </div>
        </>
    );
}