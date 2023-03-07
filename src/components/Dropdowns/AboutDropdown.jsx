import React from "react";
import { GithubIcon } from "../Icons/GithubIcon";

export const AboutDropdown = ({tabIndex}) => {

    const handleGitHub = () => {
        window.open('https://github.com/justinkpeter/blendify-v2')
    }
    // if(!tabIndex) return null;
    return (
        <>
            <ul tabIndex={tabIndex} className="dropdown-content menu p-5 shadow bg-zinc-800 rounded-box w-[40rem] text-white">
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
                        <div className={'flex w-fit rounded-lg overflow-hidden h-20 group'} onClick={handleGitHub}>
                            <span className={'flex justify-center items-center w-20 bg-black group-hover:bg-black/90'}>
                                <span className={'group-hover:scale-125 transition duration-800 ease-in-out'}>
                                    <GithubIcon/>
                                </span>
                            </span>
                            <div className={'flex flex-col justify-center px-4 rounded-r-lg bg-gray-700/30 group-hover:bg-gray-700/50 transition duration-800'}>
                                <h5 className={'font-bold'}> Explore Codebase </h5>
                                <span className={'text-gray-400 group-hover:underline'}> show me </span>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </>
    );
}