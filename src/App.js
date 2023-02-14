import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { Navbar } from "./components/Navbar";
import { Section } from "./components/Section";
import {PlayIcon} from "@heroicons/react/24/solid";
import { framer, motion } from "framer-motion";
import { useDataLayerValue } from "./utils/DataLayer";
import { getTokenFromUrl } from "./auth/spotify";
import { numberWithCommas, getPopularity, getArtistTopTrack } from "./utils/functions";

import SpotifyWebApi from "spotify-web-api-js";
import './styles/ArtistCard.css'

import {
    ArtistCardTitle,
    ArtistCardImage,
    ArtistCardImageOverlay,
    ArtistCardContent,
    ArtistCardTrackPreview,
    ArtistCard } from "./components/ArtistCard/ArtistCard";

const spotify = new SpotifyWebApi();

function App() {

    const [{ user, token }, dispatch ] = useDataLayerValue();

    const dispatchTopArtists = async (shortTermTopArtists, mediumTermTopArtists, longTermTopArtists) => {
        dispatch({
            type: 'shortTermTopArtists',
            shortTermTopArtists: shortTermTopArtists
        })
        dispatch({
            type: 'mediumTermTopArtists',
            mediumTermTopArtists: mediumTermTopArtists
        })
        dispatch({
            type: 'longTermTopArtists',
            longTermTopArtists: longTermTopArtists
        })
    }

    const dispatchTopTracks = async (shortTermTopArtistsTopTracks, mediumTermTopArtistsTopTracks, longTermTopArtistsTopTracks) => {
        dispatch({
            type: 'shortTermTopArtistsTopTracks',
            shortTermTopArtistsTopTracks: shortTermTopArtistsTopTracks
        })
    }

    // a function that gets the token from the url and updates the data layer
    const getSpotifyData = async (token) => {
        dispatch({
            type: "SET_TOKEN",
            token: token
        })
        spotify.setAccessToken(token);
        const user = await spotify.getMe().then((user) => {
            dispatch({
                type: 'SET_USER',
                user: user
            })
            return user
        });

        // getting top artists
        const shortTermTopArtists = await spotify.getMyTopArtists({time_range: 'short_term', limit: 10}).then((response) => {return response.items})
        const mediumTermTopArtists = await spotify.getMyTopArtists({time_range: 'medium_term', limit: 10}).then((response) => {return response.items})
        const longTermTopArtists = await spotify.getMyTopArtists({time_range: 'long_term', limit: 10}).then((response) => {return response.items})

        //getting individual artists top tracks
        let artistsTopTracks = []

        // with all the short term top artists, get each artist's top tracks and append to the artist object
        const shortTermTopArtistsTopTracks = await Promise.all(shortTermTopArtists.map(async (artist) => {
            await spotify.getArtistTopTracks(artist.id, 'US').then((response) => {
                artist.tracks = response.tracks
                console.log({artist, response})
            });
            return artist
        }))

        // map top tracks to the artist object
        shortTermTopArtists.map((artist) => {
            shortTermTopArtistsTopTracks.map((track) => {
                if(artist.id === track.id){
                    artist.top_track = track.tracks[0]
                }
            })
        })


        console.log({shortTermTopArtists, shortTermTopArtistsTopTracks})

        await dispatchTopArtists(shortTermTopArtists, mediumTermTopArtists, longTermTopArtists)
        await dispatchTopTracks(shortTermTopArtistsTopTracks)

    }

    // check if there is a token in the url
    useEffect(() => {
        const hash = getTokenFromUrl()
        window.location.hash = ""
        const _token = hash.access_token

        if(_token){
            getSpotifyData(_token)

        }

    }, [getSpotifyData]);


    const SectionSummary = () => {
        const [{ shortTermTopArtists, mediumTermTopArtists, longTermTopArtists }, dispatch ] = useDataLayerValue();
        const topArtist = shortTermTopArtists[0]
        return(
            <div className={'relative grid grid-cols-7 col-[3_/_span_7] row-[4_/_span_6]  z-20'}>
                <div className={'absolute top-0 left-0 leading-6'}>
                    <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                        <span className={'inline-block xl:pr-[5vh]'}>
                            <span> Grooving to </span><br/>
                            <span className={'break-normal text-green-400'}> {topArtist?.name} </span>
                            <br/>
                         </span>
                    </h1>
                    <p className={'font-light text-xl text-gray-100 pr-[10vh]'}>
                        <span className={'inline-block leading-loose'}>
                            When it comes to that one artist to grace your ears, nobody does is quite
                            like {topArtist?.name} for you!
                        </span>
                    </p>
                </div>
            </div>
        )
    }

    const TopArtist = ({children}) => {
        return(
            <div className={'relative grid grid-cols-4  row-[3_/_span_5] col-[10_/_span_4] '}>
                {children}
            </div>
        )
    }

    const TopArtistCard = ({img, artist, children}) => {
        const [{ token,  shortTermTopArtists, shortTermTopArtistsTopTracks }, dispatch ] = useDataLayerValue();
        const topArtist = shortTermTopArtists[0]
        const topTrack = "https://p.scdn.co/mp3-preview/a959b7872181a589248ed17ecde94904bd307c5c?cid=b136039c2bad4a978b33db20e143a30a"


        const [time, setTime] = useState(0)
        const [duration, setDuration] = useState(0)
        const [playTime, setPlayTime] = useState(0)


        function playTrack() {
            const audio = document.getElementById('myAudio')
            setDuration(audio.duration)
            audio.volume = 0;
            audio.play();
            const fade = setInterval(() => {
                if (audio.volume < 0.99) {
                    audio.volume += 0.01;
                } else {
                    clearInterval(fade);
                }
            }, 50);

        }

        function pauseTrack() {
            const audio = document.getElementById('myAudio')
            const fade = setInterval(() => {
                if (audio.volume > 0.01) {
                    audio.volume -= 0.01;
                } else {
                    clearInterval(fade);
                    audio.pause();
                }
            })
        }


        function getPlaybackTime() {
            const audio = document.getElementById('myAudio')
            if(audio){
                // get audio current time
                setTime(audio.currentTime)
                // get audio duration
                setDuration(audio.duration)
                // set audio play time
                setPlayTime(audio.currentTime / audio.duration * 100)
            }

        }

         const AudioToggle = () => {
            return (
                <div className={"music"}>
                    <div className={"bar"}></div>
                    <div className={"bar"}></div>
                    <div className={"bar"}></div>
                    <div className={"bar"}></div>
                </div>
            )
        }

        return(
            <div className={'artist-card'} onMouseEnter={() => playTrack()} onMouseLeave={() => pauseTrack()}>
                <div className={'artist-card-title'}>
                    <span className={'text-lg font-normal'}> Your Top Artist </span>
                    <span className={'text-xl 2xl:text-3xl font-bold'}> {topArtist?.name} </span>
                </div>
                <img src={topArtist?.images[0].url} alt={topArtist?.name} className={'artist-card-image'}/>
                <div className={'artist-card-image-overlay'}/>
                <div className={'artist-card-content'}>
                    <ul className={'font-medium w-2/3 overflow-hidden space-y-3.5'}>
                        <li>
                            <h3 className={'text-base font-light'}> Popularity </h3>
                            <p className={'text-2xl font-bold'}> {getPopularity(topArtist?.popularity)} </p>
                        </li>
                        <li>
                            <h3 className={'text-base font-light'}> Followers </h3>
                            <p className={'text-2xl font-bold'}> { numberWithCommas(topArtist?.followers?.total)}</p>
                        </li>
                        <li>
                            <h3 className={'text-base font-light'}> Top Track </h3>
                            <p className={'text-2xl font-bold'}> {'placeholder'} </p>
                        </li>
                    </ul>
                </div>
                <div className={'artist-card-player'} >

                    {/* container */}
                    <div className={'w-full h-full rounded-full '}>
                        <div className={'backdrop'}/>
                        <div className={'absolute top-2 left-2.5'}>
                            <PlayIcon className={"w-6 h-6 icon "}/>
                        </div>
                    </div>

                    <div className={'track-details'}>
                        <div className={'track-cover'} style={{backgroundImage: `url(${topArtist?.images[0].url})`}}/>
                        <div className={'mt-1 rounded-full w-full h-1 bg-gray-200'}>
                            <div style={{width: `${playTime}%`}} className={'w-1/2 rounded-full h-1 bg-green-500'}/>
                        </div>
                        <h4 className={'font-bold lg:text-lg text-right overflow-hidden'}>
                            <span className={'mt-3 flex flex-col justify-center'}>
                               A Track name
                            </span>
                        </h4>
                        <audio id="myAudio" preload="none" src={topTrack} onTimeUpdate={() => getPlaybackTime()}></audio>
                    </div>
                </div>
            </div>
        )
    }


  const [{shortTermTopArtists, shortTermTopArtistsTopTracks } ] = useDataLayerValue();
  const topArtist = shortTermTopArtists[0]
  return (
    <div>
        <Navbar/>
        { !token ? <Login/> :
            <Dashboard>
                <Section>
                    <SectionSummary/>
                    <TopArtist>
                        <ArtistCard>
                            <ArtistCardTitle name={topArtist?.name}/>
                            <ArtistCardImage image={topArtist?.images[0].url}/>
                            <ArtistCardImageOverlay/>
                            <ArtistCardContent
                                popularity={topArtist?.popularity}
                                followers={topArtist?.followers.total}
                                topTrack={topArtist?.top_track.name} />
                            <ArtistCardTrackPreview topTrack={topArtist?.top_track}/>

                        </ArtistCard>

                        {/*<TopArtistCard/>*/}
                    </TopArtist>

                    {/*<div className={'col-[10_/_span_4] row-[3_/_span_4] bg-blue-500'}>2</div>*/}
                </Section>
            </Dashboard>
        }
    </div>
  );
}

export default App;
