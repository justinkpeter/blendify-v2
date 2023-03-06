import React, { useEffect, useState } from "react";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { Navbar } from "./components/Navbar";
import { Section } from "./components/Section";
import { useDataLayerValue } from "./utils/DataLayer";
import { getTokenFromUrl } from "./auth/spotify";

import { GenrePill, Modal } from "./components/Modal";
import { ModalNav } from "./components/Modals/ModalNav";
import { TopArtists } from "./components/TopArtists";
import { GenreBar, TopGenres } from "./components/TopGenres/GenreBar";

import './styles/TopTracks.css'

import { Track } from "./components/TopTracks/Track";
import { Tile } from "./components/Tile";
// import { GenrePill } from "./components/TopGenres/";


import SpotifyWebApi from "spotify-web-api-js";
import './styles/ArtistCard.css'

import { ArtistCard } from "./components/ArtistCard/ArtistCard";
import { GridItem } from "./components/GridItem";
import {Carousel} from "./components/Carousel";
import {numberWithCommas} from "./utils/functions";

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

    const dispatchFavoriteTracks = async (shortTermTopTracks, mediumTermTopTracks, longTermTopTracks) => {
        dispatch({
            type: 'shortTermTopTracks',
            shortTermTopTracks: shortTermTopTracks
        })
        dispatch({
            type: 'mediumTermTopTracks',
            mediumTermTopTracks: mediumTermTopTracks
        })
        dispatch({
            type: 'longTermTopTracks',
            longTermTopTracks: longTermTopTracks
        })
    }

    const dispatchTopGenres = async (topGenres) => {
        dispatch({
            type: 'topGenres',
            topGenres: topGenres
        })
    }

    const dispatchPlaylists = async (playlists) => {
        dispatch({
            type: 'SET_PLAYLISTS',
            playlists: playlists
        })
    }

    const dispatchIsLoaded = async (isLoaded) => {
        dispatch({
            type: 'IS_LOADED',
            isLoaded: isLoaded
        })
    }

    // a function that gets the token from the url and updates the data layer

    // const [isLoaded, setIsLoaded] = useState(false)
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

        // get user number of playlists
        const playlists = await spotify.getUserPlaylists(user.id).then((playlists) => {
            console.log('playlist number is: ', playlists)
            return playlists
        })



        // getting top artists
        const shortTermTopArtists = await spotify.getMyTopArtists({time_range: 'short_term', limit: 50}).then((response) => {return response.items})
        const mediumTermTopArtists = await spotify.getMyTopArtists({time_range: 'medium_term', limit: 10}).then((response) => {return response.items})
        const longTermTopArtists = await spotify.getMyTopArtists({time_range: 'long_term', limit: 10}).then((response) => {return response.items})


        // getting user most played tracks
        const shortTermTopTracks = await spotify.getMyTopTracks({ time_range: "short_term", limit: 50}).then((response) => {return response.items})
        const mediumTermTopTracks = await spotify.getMyTopTracks({ time_range: "medium_term", limit: 50}).then((response) => {return response.items})
        const longTermTopTracks = await spotify.getMyTopTracks({ time_range: "long_term", limit: 50}).then((response) => {return response.items})

        //getting individual artists top tracks
        let artistsTopTracks = []

        // with all the short term top artists, get each artist's top tracks and append to the artist object
        const shortTermTopArtistsTopTracks = await Promise.all(shortTermTopArtists.map(async (artist) => {
            await spotify.getArtistTopTracks(artist.id, 'US').then((response) => {
                artist.tracks = response.tracks
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

        const shortTermTopGenres = []
        const genreFrequency = {}

        shortTermTopTracks.map((track) => {
            // loop through track artists and get their genres
            // for every track, get the artist's genres
            track.artists.map((artist) => {
                // for every artist, get their genres
                // find artist in shortTermTopArtists
                let match = shortTermTopArtists.find((a) => a.id === artist.id)
                if(match){
                    // console.log('match is', match)
                    match.genres.map((genre) => {
                        if(shortTermTopGenres.includes(genre)){
                            genreFrequency[genre] += 1
                            return
                        }
                        else
                            genreFrequency[genre] = 1
                            shortTermTopGenres.push(genre)
                    })
                }
            })
        })

        console.log('shortTermTopGenres is', shortTermTopGenres, genreFrequency)

        // get the top 5 highest frequency genres
        const sortedGenres = Object.keys(genreFrequency).sort(function(a,b){return genreFrequency[b]-genreFrequency[a]})
        const topGenres = [
            {name: sortedGenres[0], percentage: Math.round(genreFrequency[sortedGenres[0]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[1], percentage: Math.round(genreFrequency[sortedGenres[1]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[2], percentage: Math.round(genreFrequency[sortedGenres[2]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[3], percentage: Math.round(genreFrequency[sortedGenres[3]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[4], percentage: Math.round(genreFrequency[sortedGenres[4]]/ shortTermTopGenres.length * 100)},
        ]
        console.log('topGenres is', topGenres)

        // getting related artists
        const shortTermTopArtistsRelatedArtists = await Promise.all(shortTermTopArtists.map(async (artist) => {
            await spotify.getArtistRelatedArtists(artist.id).then((response) => {
                artist.related_artists = response.artists
            });
            return artist

        }))

        // add related artists to the top artists
        shortTermTopArtists.map((artist) => {
            shortTermTopArtistsRelatedArtists.map((relatedArtist) => {
                if(artist.id === relatedArtist.id){
                    artist.related_artists = relatedArtist.related_artists
                }
            })
        })



        // getting artist related release
        const shortTermTopArtistsRelatedReleases = await Promise.all(shortTermTopArtists.map(async (artist) => {
            await spotify.getArtistAlbums(artist.id, {limit: 50}).then((response) => {
                artist.related_releases = response.items
            });
            return artist

        }))

        shortTermTopArtists.map((artist) => {
            shortTermTopArtistsRelatedReleases.map((relatedRelease) => {
                if(artist.id === relatedRelease.id){
                    artist.related_releases = relatedRelease.related_releases
                }
            })
        })


        await spotify.getMySavedTracks().then((response) => {
            // dispatch({
            //     type: 'SET_SAVED_TRACKS',
            //     savedTracks: response.items
            // })
            console.log('saved tracks are', response.total)
            dispatch({
                type: 'SET_SAVED_TRACKS',
                savedTracks: response.total
            })
        })



        await dispatchTopArtists(shortTermTopArtists, mediumTermTopArtists, longTermTopArtists)
        await dispatchTopTracks(shortTermTopArtistsTopTracks)
        await dispatchFavoriteTracks(shortTermTopTracks, mediumTermTopTracks, longTermTopTracks)
        await dispatchTopGenres(topGenres)
        await dispatchPlaylists(playlists)
        await dispatchIsLoaded(true)

        // console.log(playlists)

        // after data is fetched, set isLoaded to true


    }


    // check if there is a token in the url
    useEffect(() => {
        const hash = getTokenFromUrl()
        window.location.hash = ""
        const _token = hash.access_token

        if(_token){

            getSpotifyData(_token)

            // while data is being fetched, set the token

        }

    }, [getSpotifyData]);


    const Loading = ({isLoading, user}) => {
        return(
            <>
                {isLoading && user ? null : <div className={'loading w-screen h-screen bg-zinc-900 relative z-50 '}>
                    <div className={'absolute top-[43%] left-[45%] spinner animate-spin text-white '}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-28 h-28 text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>


                    </div>

                </div>}
            </>
        )


        // if(!isLoading){
        //     <>
        //         <div className={'loading w-full h-full'}></div>
        //     </>
        // }
        // else
        //     return null
    }


    const SectionSummary = () => {
        const [{ shortTermTopArtists, shortTermTopTracks }, dispatch ] = useDataLayerValue();
        const topArtist = shortTermTopArtists[0]
        return(
            <div className={'relative grid grid-cols-7 col-[3_/_span_7] row-[4_/_span_6]  z-20'}>
                <div className={'absolute top-0 left-0 leading-6'}>
                    <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                        <span className={'inline-block lg:pr-[5vh]'}>
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


  const [{shortTermTopArtists, shortTermTopTracks, topGenres, savedTracks, playlists, isLoaded } ] = useDataLayerValue();
  const topArtist = shortTermTopArtists[0]


    const [id, setId] = useState(null)


    const [test, setTest] = useState('')
    const [artistModal, setArtistModal] = useState(null)

    const handleItemClick = (gridItem) => {
        setId(gridItem)
        // setArtistModal({name: 'Justin Bieber', id: '1uNFoZAHBGtllmzznpCI3s'})
        setTest('hooray')
        let artist = getTileInfo(gridItem)
        setArtistModal(artist)
    }

    const getTileInfo = (id) => {
        const artist = shortTermTopArtists?.find(artist => artist.id === id)
        return artist
    }

    const getArtistInfo = (id) => {
        const artist = shortTermTopArtists?.find(artist => artist.id === id)
        return artist
    }

    const getTrackInfo = (id) => {
        const track = shortTermTopTracks?.find(track => track.id === id)
        return track
    }

    const handleArtistClick = (gridItem) => {
        setId(gridItem)
        let artist = getArtistInfo(gridItem)
        setArtistModal(artist)
    }

    const handleTrackClick = (gridItem) => {
        setId(gridItem)
        let track = getTrackInfo(gridItem)
        setArtistModal(track)
    }




  return (
    <div>
        <Navbar user={user}/>
        <Modal artist={artistModal} id={id}/>


        { !token ? <Login/> :
            <Dashboard>
                <Loading isLoading={isLoaded} user={user}/>
                <Section>
                    <SectionSummary/>
                    <GridItem row={3} col={10} large >
                        <label htmlFor={id} className="absolute btn w-full h-full border-0" onClick={() => handleArtistClick(shortTermTopArtists[0]?.id)}>
                            <ArtistCard large artist={shortTermTopArtists[0]} />
                        </label>
                    </GridItem>
                    <GridItem row={4} col={15} >
                        <label htmlFor={id} className="absolute btn w-full h-full  absolute btn w-full h-full border-0" onClick={() => handleArtistClick(shortTermTopArtists[1]?.id)}>
                            <ArtistCard rank={2} artist={shortTermTopArtists[1]} />
                        </label>
                    </GridItem>
                    <GridItem row={7} col={18} >
                        <label htmlFor={id} className="absolute btn w-full h-full  absolute btn w-full h-full border-0" onClick={() => handleArtistClick(shortTermTopArtists[2]?.id)}>
                            <ArtistCard rank={3} artist={shortTermTopArtists[2]} />
                        </label>
                    </GridItem>
                    <GridItem row={3} col={19} >
                        <label htmlFor={id} className="absolute btn w-full h-full  absolute btn w-full h-full border-0" onClick={() => handleArtistClick(shortTermTopArtists[3]?.id)}>
                            <ArtistCard rank={4} artist={shortTermTopArtists[3]} />
                        </label>
                    </GridItem>
                    <GridItem row={2} col={23} >
                        <label htmlFor={id} className="absolute btn w-full h-full absolute btn w-full h-full border-0 " onClick={() => handleArtistClick(shortTermTopArtists[4]?.id)}>
                            <ArtistCard rank={5} artist={shortTermTopArtists[4]} />
                        </label>
                    </GridItem>
                </Section>
                <Section topTracks>
                    <div className={'relative grid grid-cols-7 col-[3_/_span_7] row-[4_/_span_6] z-20'}>
                        <div className={'absolute top-0 left-0 leading-6'}>
                            <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                                <span className={'inline-block xl:pr-[5vh]'}>
                                    {/*<span> Grooving to </span><br/>*/}
                                    <span className={'break-normal text-green-400'}> {shortTermTopTracks[0]?.name} </span>
                                    <br/>
                                    <span> has been on repeat </span><br/>
                                 </span>
                            </h1>
                            <p className={'font-light text-xl text-gray-100 pr-[10vh]'}>
                                <span className={'inline-block leading-loose'}>
                                    Yeah, you have other songs you like to bump, but {shortTermTopTracks[0]?.name} by {shortTermTopTracks[0]?.artists[0]?.name} truly hit some chords with you.
                                </span>
                            </p>
                        </div>
                    </div>
                    <Tile col={11} row={3} large>
                        <Track
                            large
                            rank={1}
                            image={shortTermTopTracks[0]?.album?.images[0]?.url}
                            name={shortTermTopTracks[0]?.name}
                            artists={shortTermTopTracks[0]?.artists}
                            explicit={shortTermTopTracks[0]?.explicit}
                        />
                    </Tile>
                    <Tile col={17} row={4} >
                        <Track
                            rank={2}
                            image={shortTermTopTracks[1]?.album?.images[0]?.url}
                            name={shortTermTopTracks[1]?.name}
                            artists={shortTermTopTracks[1]?.artists}
                            explicit={shortTermTopTracks[1]?.explicit}
                        />
                    </Tile>
                    <Tile col={21} row={3}>
                        <Track
                            rank={3}
                            image={shortTermTopTracks[2]?.album?.images[0]?.url}
                            name={shortTermTopTracks[2]?.name}
                            artists={shortTermTopTracks[2]?.artists}
                            explicit={shortTermTopTracks[2]?.explicit}
                        />

                    </Tile>
                    <Tile col={25} row={2}>
                        <Track
                            rank={4}
                            image={shortTermTopTracks[3]?.album?.images[0]?.url}
                            name={shortTermTopTracks[3]?.name}
                            artists={shortTermTopTracks[3]?.artists}
                            explicit={shortTermTopTracks[3]?.explicit}
                        />
                    </Tile>
                    <Tile col={29} row={4}>
                        <Track
                            rank={5}
                            image={shortTermTopTracks[4]?.album?.images[0]?.url}
                            name={shortTermTopTracks[4]?.name}
                            artists={shortTermTopTracks[4]?.artists}
                            explicit={shortTermTopTracks[4]?.explicit}
                        />
                    </Tile>

                    {/*/!* top 50 *!/*/}
                    {/*<div className={'group relative col-[30_/_span_1] row-[8_/_span_1] bg-zinc-500/40  flex justify-center items-center rounded-xl text-white'}>*/}
                    {/*    /!*<label htmlFor="my-modal-3" className="btn">open modal</label>*!/*/}
                    {/*    <TopArtists/>*/}

                    {/*</div>*/}
                </Section>
                <Section topGenres>
                    <div className={'relative grid grid-cols-7 col-[1_/_span_7] row-[4_/_span_6]  z-20'}>
                        <div className={'absolute top-0 left-0 leading-6'}>
                            <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                                <span className={'inline-block xl:pr-[5vh]'}>
                                    <span> {topGenres[0]?.name} </span><br/>
                                    <span className={'break-normal text-green-400'}> is truly undefeated. </span>
                                    <br/>
                                    {/*<span> has been on repeat </span><br/>*/}
                                 </span>
                            </h1>
                            <p className={'font-light text-xl text-gray-100 pr-[10vh]'}>
                                <span className={'inline-block leading-loose'}>
                                   Looks like you're a <span className={'italic'}> huge </span>
                                    {topGenres[0]?.name} fan! This genre appears in {topGenres[0]?.percentage}%
                                    of your top tracks played in the last 4 weeks.

                                </span>
                            </p>
                        </div>
                    </div>

                    <TopGenres topGenres={topGenres}/>

                </Section>
                <Section streamingAnalysis>

                    <div className={'relative grid grid-cols-7 col-[4_/_span_7] row-[4_/_span_6]  z-20'}>
                        <div className={'absolute top-0 left-0 leading-6'}>
                            <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                                <span className={'inline-block xl:pr-[5vh]'}>
                                    <span> {user?.display_name.split(" ")[0] }, </span><br/>
                                    <span className={'break-normal text-green-400'}> all your tastes, blended into one </span>
                                    <br/>

                                    {/*<span> has been on repeat </span><br/>*/}
                                    </span>
                            </h1>
                            <p className={'font-light text-xl text-gray-100 '}>
                                <span className={'inline-block leading-loose'}>
                                    Just an overall <span className={'italic'}> vibe </span> of your music taste.
                                    <span className={'italic'}> Keep grooving. </span>
                                </span>
                            </p>
                        </div>
                    </div>

                    {/*<StreamingAnalysis/>*/}
                    <div className={'relative grid grid-cols-13 grid-rows-6 col-[13_/_span_13] row-[3_/_span_6]  z-20  rounded-3xl  glass bg-black/30 '}>

                        {/*<div className={'absolute top-0  w-full h-full glass z-0 '}/>*/}
                        <div className={'col-[1_/_span_7] row-[1_/_span_6] pt-10 relative pl-10'}>
                            <div className="w-56 h-56 pb-3 ">
                                <img
                                    src={user?.images[0].url } alt="Avatar Tailwind CSS Component"
                                    className=" w-full h-full object-cover rounded-lg"/>
                            </div>
                            <div>
                                <ul className={''}>
                                    <li className={'stat-value'}> { user?.display_name } </li>
                                    <li className={'stat-title'}> { user?.followers.total } followers · { playlists?.total } Public Playlists </li>
                                    {/*{ playlists && <li className={'stat-title'}> { playlists.total } public playlists  </li> }*/}
                                    {/*<li className={'stat-title'}> { numberWithCommas(savedTracks) } Liked Songs  </li>*/}
                                </ul>
                            </div>

                            <div className={'mt-5 w-64'}>
                                {topGenres?.map((genre) => {
                                    return(
                                        <GenrePill genre={genre.name}/>
                                    )
                                })}
                            </div>
                        </div>


                        <div className={'col-[5_/_span_7] row-[1_/span_6] pt-10 relative '}>

                            <div>
                                <div className="stat-title font-black text-2xl ">Your Top Artists </div>

                                <ul>
                                    { shortTermTopArtists.slice(0,5).map((artist, index) => (
                                        <li key={index} className={'text-white/60 h-fit space-y-3 relative flex items-center gap-3   '}>
                                            <span className={'text-2xl font-black'}>{index+1} </span>

                                            <div className="w-16 h-16 ">
                                                <img
                                                    src={artist?.images[0].url } alt="Avatar Tailwind CSS Component"
                                                    className=" w-full h-full object-cover "/>
                                            </div>

                                            <div>
                                                <div className=""> { artist?.name }</div>
                                                {/*<div className="stat-value">89,400</div>*/}
                                            </div>


                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>


                        <div className={'col-[9_/_span_7] row-[1_/span_6] pt-10 relative '}>
                            <div>
                                <div className="stat-title font-black text-2xl ">Your Top Tracks </div>
                                <ul>
                                    { shortTermTopTracks.slice(0,5).map((track, index) => (
                                        <li key={index} className={'text-white/60 h-fit space-y-3 relative flex items-center gap-3   '}>
                                            <span className={'text-2xl font-black'}>{index+1} </span>
                                            <div className="w-16 h-16 ">
                                                <img
                                                    src={track?.album.images[0].url } alt="Avatar Tailwind CSS Component"
                                                    className=" w-full h-full object-cover "/>
                                            </div>
                                            <div>
                                                <div className="font-medium"> { track?.name }</div>
                                                <div className="font-thin">
                                                    {track?.artists?.map((artist, index) => {
                                                        return(
                                                            <>
                                                                <span> {artist.name}</span>
                                                                {index < track.artists.length - 1 && <span> , </span>}
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>






                    </div>

                </Section>

            </Dashboard>
        }
    </div>
  );
}

export default App;
