import React, { useState, useEffect, useRef }from 'react';
import * as THREE from "three";
import WAVES from 'vanta/dist/vanta.waves.min';

import { loginUrl } from "./auth/spotify.js";

export const Login = () => {

    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                WAVES({
                    el: vantaRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: false,
                    gyroControls: true,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: "#18181b"
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    const goToSpotifyAuthPage = () => {
        window.location.href = loginUrl
    }

    return (
        <>
            <div ref={vantaRef} className={'relative h-screen w-screen'}>
                <div className={'my-auto h-full w-screen flex flex-col items-center justify-center text-white'}>
                    <div className={"text-7xl font-bold"}>
                        <span> Discover how you </span>
                        <span className={"text-green-500"}> listen.</span>
                    </div>
                    <div className={"mt-2 text-3xl text-white"}>
                        <span> Explore your music taste and create awesome playlists.</span>
                    </div>
                    <div className={"flex mt-16"}>
                        <button
                            className={"p-6 w-64 rounded-full bg-green-500 font-bold transition hover:bg-green-800"}
                            onClick={goToSpotifyAuthPage}
                        >
                            Continue with Spotify
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}