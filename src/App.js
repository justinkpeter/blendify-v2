import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { Navbar } from "./components/Navbar";
import { Section } from "./components/Section";
import { useDataLayerValue } from "./utils/DataLayer";
import { getTokenFromUrl } from "./auth/spotify";

import { Modal } from "./components/Modal";
import { ModalNav } from "./components/Modals/ModalNav";
import { TopArtists } from "./components/TopArtists";
import { GenreBar } from "./components/TopGenres/GenreBar";

import './styles/TopTracks.css'

import {
    TopTrackTile,
    TopTrackCard,
    TopTrackInfo,
    TopTrackRank,
    TopTrackImage
} from "./components/TopTracks/TopTrackTile";


import SpotifyWebApi from "spotify-web-api-js";
import './styles/ArtistCard.css'

import { ArtistCard } from "./components/ArtistCard/ArtistCard";
import { GridItem } from "./components/GridItem";

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
                // console.log({artist, response})
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

        shortTermTopArtists.map((artist) => {
            artist.genres.map((genre) => {
                shortTermTopGenres.push(genre)
            })

            artist.genres.forEach(genre => {
                if(genreFrequency[genre]){
                    genreFrequency[genre] += 1
                } else {
                    genreFrequency[genre] = 1
                }
            })


        })

        // get the top 5 highest frequency genres
        const sortedGenres = Object.keys(genreFrequency).sort(function(a,b){return genreFrequency[b]-genreFrequency[a]})
        const topGenres = [
            {name: sortedGenres[0], percentage: Math.round(genreFrequency[sortedGenres[0]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[1], percentage: Math.round(genreFrequency[sortedGenres[1]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[2], percentage: Math.round(genreFrequency[sortedGenres[2]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[3], percentage: Math.round(genreFrequency[sortedGenres[3]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[4], percentage: Math.round(genreFrequency[sortedGenres[4]]/ shortTermTopGenres.length * 100)},
        ]

        console.log({topGenres})


        //         // mapping genre frequency to object
        //         const genreFrequency = {}
        //         genres.forEach(genre => {
        //             genre.forEach(genre => {
        //                 if(genreFrequency[genre]){
        //                     genreFrequency[genre] += 1
        //                 } else {
        //                     genreFrequency[genre] = 1
        //                 }
        //             })
        //         })
        //
        //         // sort genres by frequency
        //         const sortedGenres = Object.keys(genreFrequency).sort(function(a,b){return genreFrequency[b]-genreFrequency[a]})
        //
        //         // return topGenres
        //         topGenres =[
        //             {name: sortedGenres[0], percentage: Math.round(genreFrequency[sortedGenres[0]]/ genres.length * 100)},
        //             {name: sortedGenres[1], percentage: Math.round(genreFrequency[sortedGenres[1]]/ genres.length * 100)},
        //             {name: sortedGenres[2], percentage: Math.round(genreFrequency[sortedGenres[2]]/ genres.length * 100)},
        //             {name: sortedGenres[3], percentage: Math.round(genreFrequency[sortedGenres[3]]/ genres.length * 100)},
        //             {name: sortedGenres[4], percentage: Math.round(genreFrequency[sortedGenres[4]]/ genres.length * 100)},
        //         ]

        console.log({shortTermTopTracks}, {shortTermTopArtists})


        // getting related artists
        const shortTermTopArtistsRelatedArtists = await Promise.all(shortTermTopArtists.map(async (artist) => {
            await spotify.getArtistRelatedArtists(artist.id).then((response) => {
                artist.related_artists = response.artists
            });
            return artist

        }))

        console.log({shortTermTopArtistsRelatedArtists})

        // add related artists to the top artists
        shortTermTopArtists.map((artist) => {
            shortTermTopArtistsRelatedArtists.map((relatedArtist) => {
                if(artist.id === relatedArtist.id){
                    artist.related_artists = relatedArtist.related_artists
                }
            })
        })

        await dispatchTopArtists(shortTermTopArtists, mediumTermTopArtists, longTermTopArtists)
        await dispatchTopTracks(shortTermTopArtistsTopTracks)
        await dispatchFavoriteTracks(shortTermTopTracks, mediumTermTopTracks, longTermTopTracks)

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
        const [{ shortTermTopArtists, shortTermTopTracks }, dispatch ] = useDataLayerValue();
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

    const TopArtist = ({children, id}) => {
        return(
            <div className={'relative grid grid-cols-4  row-[3_/_span_5] col-[10_/_span_4]'} id={id} >
                {children}
            </div>
        )
    }

  const [{shortTermTopArtists, shortTermTopTracks } ] = useDataLayerValue();
  const topArtist = shortTermTopArtists[0]


    const [id, setId] = useState(null)


    const DynamicDiv = ({children, row, col}) => {
        return(
            <div className={`relative grid grid-cols-4  row-[${row}_/_span_5] col-[${col}_/_span_4]`} >
                {children}
            </div>
        )
      
    }

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








  return (
    <div>
        <Navbar/>
        <Modal artist={artistModal} id={id}/>


        { !token ? <Login/> :
            <Dashboard>
                <Section>
                    <SectionSummary/>

                    <GridItem row={3} col={10} large >
                        <label htmlFor={id} className="absolute btn w-full h-full " onClick={() => handleItemClick(shortTermTopArtists[0]?.id)}>
                            <ArtistCard large artist={shortTermTopArtists[0]} />
                        </label>
                    </GridItem>

                    <GridItem row={4} col={15} >
                        <label htmlFor={id} className="absolute btn w-full h-full " onClick={() => handleItemClick(shortTermTopArtists[1]?.id)}>
                            <ArtistCard rank={2} artist={shortTermTopArtists[1]} />
                        </label>
                    </GridItem>

                    <GridItem row={7} col={18} >
                        <label htmlFor={id} className="absolute btn w-full h-full " onClick={() => handleItemClick(shortTermTopArtists[2]?.id)}>
                            <ArtistCard rank={3} artist={shortTermTopArtists[2]} />
                        </label>
                    </GridItem>

                    <GridItem row={3} col={19} >
                        <label htmlFor={id} className="absolute btn w-full h-full " onClick={() => handleItemClick(shortTermTopArtists[3]?.id)}>
                            <ArtistCard rank={4} artist={shortTermTopArtists[3]} />
                        </label>
                    </GridItem>

                    <GridItem row={2} col={23} >
                        <label htmlFor={id} className="absolute btn w-full h-full " onClick={() => handleItemClick(shortTermTopArtists[4]?.id)}>
                            <ArtistCard rank={5} artist={shortTermTopArtists[4]} />
                        </label>
                    </GridItem>





                    {/*<div className={'relative col-[15_/_span_3] row-[4_/_span_3]'}>*/}
                    {/*    <ArtistCard>*/}
                    {/*        <ArtistCardTitle rank={2} name={shortTermTopArtists[1]?.name}/>*/}
                    {/*        <ArtistCardImage image={shortTermTopArtists[1]?.images[1].url}/>*/}
                    {/*        <ArtistCardImageOverlay/>*/}
                    {/*        <ArtistCardContent topTrack={shortTermTopArtists[1]?.top_track.name}/>*/}
                    {/*        <ArtistCardTrackPreview topTrack={shortTermTopArtists[1]?.top_track}/>*/}
                    {/*    </ArtistCard>*/}
                    {/*</div>*/}

                    {/*<div className={'relative col-[18_/_span_3] row-[7_/_span_3]'}>*/}
                    {/*    <ArtistCard>*/}
                    {/*        <ArtistCardTitle rank={3} name={shortTermTopArtists[2]?.name}/>*/}
                    {/*        <ArtistCardImage image={shortTermTopArtists[2]?.images[1].url}/>*/}
                    {/*        <ArtistCardImageOverlay/>*/}
                    {/*        <ArtistCardContent topTrack={shortTermTopArtists[2]?.top_track.name}/>*/}
                    {/*        <ArtistCardTrackPreview topTrack={shortTermTopArtists[2]?.top_track}/>*/}
                    {/*    </ArtistCard>*/}
                    {/*</div>*/}

                    {/*<div className={'relative col-[19_/_span_3] row-[3_/_span_3]'}>*/}
                    {/*    <ArtistCard>*/}
                    {/*        <ArtistCardTitle rank={4} name={shortTermTopArtists[3]?.name}/>*/}
                    {/*        <ArtistCardImage image={shortTermTopArtists[3]?.images[1].url}/>*/}
                    {/*        <ArtistCardImageOverlay/>*/}
                    {/*        <ArtistCardContent topTrack={shortTermTopArtists[3]?.top_track.name}/>*/}
                    {/*        <ArtistCardTrackPreview topTrack={shortTermTopArtists[3]?.top_track}/>*/}
                    {/*    </ArtistCard>*/}
                    {/*</div>*/}

                    {/*<div className={'relative col-[23_/_span_3] row-[2_/_span_3]'}>*/}
                    {/*    <ArtistCard>*/}
                    {/*        <ArtistCardTitle rank={5} name={shortTermTopArtists[4]?.name}/>*/}
                    {/*        <ArtistCardImage image={shortTermTopArtists[4]?.images[1].url}/>*/}
                    {/*        <ArtistCardImageOverlay/>*/}
                    {/*        <ArtistCardContent topTrack={shortTermTopArtists[4]?.top_track.name}/>*/}
                    {/*        <ArtistCardTrackPreview topTrack={shortTermTopArtists[4]?.top_track}/>*/}
                    {/*    </ArtistCard>*/}
                    {/*</div>*/}

                    {/*<div className={'relative col-[22_/span_4] row-[7_/_span_2]  bg-gradient-to-l from-green-500 rounded-xl '}>*/}
                    {/*    <div className={'absolute inset-0 z-20 flex items-center overflow-hidden'}>*/}
                    {/*        <div className={'absolute left-0 w-[30vh] h-[30vh]'}>*/}
                    {/*            <div*/}
                    {/*                style={{backgroundImage: `url(${shortTermTopArtists[0]?.images[0].url})`}}*/}
                    {/*                className={'absolute w-full h-full opacity-20 bg-cover bg-center origin-left'}>*/}
                    {/*            </div>*/}
                    {/*            <div*/}
                    {/*                style={{backgroundImage: `url(${shortTermTopArtists[1]?.images[0].url})`}}*/}
                    {/*                className={'absolute w-full h-full opacity-20 bg-cover bg-center origin-left'}>*/}
                    {/*            </div>*/}
                    {/*            <div*/}
                    {/*                style={{backgroundImage: `url(${shortTermTopArtists[2]?.images[0].url})`}}*/}
                    {/*                className={'absolute w-full h-full opacity-20 bg-cover bg-center origin-left'}>*/}
                    {/*            </div>*/}
                    {/*            <div*/}
                    {/*                style={{backgroundImage: `url(${shortTermTopArtists[3]?.images[0].url})`}}*/}
                    {/*                className={'absolute w-full h-full opacity-20 bg-cover bg-center origin-left'}>*/}
                    {/*            </div>*/}

                    {/*        </div>*/}
                    {/*        <div className={'h-full w-[30vh] h-[30vh] basis-[30vh] z-10 inline-flex flex-col justify-center pr-6 pb-2.5 pl-9 text-white'}>*/}
                    {/*            <h4 className={'pl-2 text-base font-medium'}> Suggestion Playlist</h4>*/}
                    {/*            <p  className={'pl-2 mt-1.5 text-2xl font-medium'}> A fresh playlist, just for you.</p>*/}
                    {/*        </div>*/}
                    {/*        <span className="flex h-3 w-3">*/}
                    {/*          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>*/}
                    {/*          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>*/}
                    {/*        </span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={'group relative col-[26_/_span_1] row-[5_/_span_1] bg-zinc-500/40  flex justify-center items-center rounded-xl text-white'}>*/}
                    {/*    /!*<label htmlFor="my-modal-3" className="btn">open modal</label>*!/*/}
                    {/*    <TopArtists/>*/}


                    {/*    /!*<span > 50 </span>*!/*/}
                    {/*</div>*/}

                </Section>
                <Section topTracks>
                    <div className={'relative grid grid-cols-7 col-[3_/_span_7] row-[4_/_span_6]  z-20'}>
                        <div className={'absolute top-0 left-0 leading-6'}>
                            <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                                <span className={'inline-block xl:pr-[5vh]'}>
                                    {/*<span> Grooving to </span><br/>*/}
                                    <span className={'break-normal text-green-400'}> {topArtist?.name} </span>
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

                    <TopTrackTile>
                        <TopTrackCard>
                            <TopTrackRank rank={1}/>
                            <TopTrackImage>
                                <div
                                    style={{backgroundImage: `url(${shortTermTopTracks[0]?.album?.images[0]?.url})`}}
                                    className={'absolute h-full w-full bg-cover bg-center'}>
                                </div>
                            </TopTrackImage>
                            <TopTrackInfo>
                                <h2 className={'font-bold truncate text-ellipsis text-3xl whitespace-nowrap'}>
                                    {shortTermTopTracks[0]?.name}
                                </h2>
                                <h3 className={'text-gray-400'}>
                                    <span className={''}> {shortTermTopTracks[0]?.artists[0]?.name}</span>
                                    <span>, </span>
                                    <span> {shortTermTopTracks[0]?.artists[1]?.name}</span>
                                </h3>
                            </TopTrackInfo>
                        </TopTrackCard>
                    </TopTrackTile>

                    {/* top track #2 */}
                    <div className={'grid relative row-[4_/_span_3] col-[17_/_span_3]'}>
                        <TopTrackCard>
                            <TopTrackRank rank={2}/>
                            <TopTrackImage small>
                                <div
                                    style={{backgroundImage: `url(${shortTermTopTracks[1]?.album?.images[0]?.url})`}}
                                    className={'absolute h-full w-full bg-cover bg-center'}>
                                </div>
                            </TopTrackImage>
                            <TopTrackInfo>
                                <h2 className={'font-bold truncate text-ellipsis text-3xl whitespace-nowrap'}>
                                    {shortTermTopTracks[1]?.name}
                                </h2>
                                <h3 className={'text-gray-200'}>
                                    <span className={''}> {shortTermTopTracks[1]?.artists[0]?.name}</span>
                                    <span>, </span>
                                    <span> {shortTermTopTracks[1]?.artists[1]?.name}</span>
                                </h3>
                            </TopTrackInfo>
                        </TopTrackCard>
                    </div>

                    {/* top track #3 */}
                    <div className={'grid relative row-[3_/_span_3] col-[21_/_span_3]'}>
                        <TopTrackCard>
                            <TopTrackRank rank={3}/>
                            <TopTrackImage small>
                                <div
                                    style={{backgroundImage: `url(${shortTermTopTracks[2]?.album?.images[0]?.url})`}}
                                    className={'absolute h-full w-full bg-cover bg-center'}>
                                </div>
                            </TopTrackImage>
                            <TopTrackInfo>
                                <h2 className={'font-bold truncate text-ellipsis text-3xl whitespace-nowrap'}>
                                    {shortTermTopTracks[2]?.name}
                                </h2>
                                <h3 className={'text-gray-200'}>
                                    <span className={''}> {shortTermTopTracks[2]?.artists[0]?.name}</span>
                                    <span>, </span>
                                    <span> {shortTermTopTracks[2]?.artists[1]?.name}</span>
                                </h3>
                            </TopTrackInfo>
                        </TopTrackCard>
                    </div>

                    {/*top track 4*/}
                    <div className={'grid relative row-[2_/_span_3] col-[25_/_span_3]'}>
                        <TopTrackCard>
                            <TopTrackRank rank={4}/>
                            <TopTrackImage small>
                                <div
                                    style={{backgroundImage: `url(${shortTermTopTracks[3]?.album?.images[0]?.url})`}}
                                    className={'absolute h-full w-full bg-cover bg-center'}>
                                </div>
                            </TopTrackImage>

                            <TopTrackInfo>
                                <h2 className={'font-bold truncate text-ellipsis text-3xl whitespace-nowrap'}>
                                    {shortTermTopTracks[3]?.name}
                                </h2>
                                <h3 className={'text-gray-200'}>
                                    <span className={''}> {shortTermTopTracks[3]?.artists[0]?.name}</span>
                                    <span>, </span>
                                    <span> {shortTermTopTracks[3]?.artists[1]?.name}</span>
                                </h3>
                            </TopTrackInfo>
                        </TopTrackCard>
                    </div>

                    {/*top track 5*/}
                    <div className={'grid relative row-[4_/_span_3] col-[29_/_span_3]'}>
                        <TopTrackCard>
                            <TopTrackRank rank={5}/>
                            <TopTrackImage small>
                                <div
                                    style={{backgroundImage: `url(${shortTermTopTracks[4]?.album?.images[0]?.url})`}}
                                    className={'absolute h-full w-full bg-cover bg-center'}>
                                </div>
                            </TopTrackImage>

                            <TopTrackInfo>
                                <h2 className={'font-bold truncate text-ellipsis text-3xl whitespace-nowrap'}>
                                    {shortTermTopTracks[4]?.name}
                                </h2>
                                <h3 className={'text-gray-200'}>
                                    <span className={''}> {shortTermTopTracks[4]?.artists[0]?.name}</span>
                                    <span>, </span>
                                    <span> {shortTermTopTracks[4]?.artists[1]?.name}</span>
                                </h3>
                            </TopTrackInfo>
                        </TopTrackCard>
                    </div>

                    {/* top 50 */}
                    <div className={'group relative col-[30_/_span_1] row-[8_/_span_1] bg-zinc-500/40  flex justify-center items-center rounded-xl text-white'}>
                        {/*<label htmlFor="my-modal-3" className="btn">open modal</label>*/}
                        <TopArtists/>

                    </div>
                </Section>
                <Section topGenres>
                    <div className={'relative grid grid-cols-7 col-[1_/_span_7] row-[4_/_span_6]  z-20'}>
                        <div className={'absolute top-0 left-0 leading-6'}>
                            <h1 className={'my-5 font-black text-6xl 2xl:text-7xl text-white'}>
                                <span className={'inline-block xl:pr-[5vh]'}>
                                    <span> genre </span><br/>
                                    <span className={'break-normal text-green-400'}> is truly undefeated. </span>
                                    <br/>
                                    {/*<span> has been on repeat </span><br/>*/}
                                 </span>
                            </h1>
                            <p className={'font-light text-xl text-gray-100 pr-[10vh]'}>
                                <span className={'inline-block leading-loose'}>
                                   Looks like you're a <span className={'italic'}> huge </span>
                                   genre fan! This appears in percentage of your
                                    top tracks played in the last 4 weeks.

                                </span>
                            </p>
                        </div>
                    </div>

                    <div className={'grid relative row-[3_/_span_6] col-[9_/_span_1] z-20 '}>
                        <GenreBar index={1} name={'rap'} percentage={50}/>
                    </div>
                    <div className={'grid relative row-[3_/_span_7] col-[11_/_span_1] z-20'}>
                        <GenreBar index={2} name={'genre'} percentage={32}/>
                    </div>
                    <div className={'grid relative row-[3_/_span_7] col-[13_/_span_1] z-20'}>
                        <GenreBar index={3} name={'hip hop'} percentage={26}/>
                    </div>
                    <div className={'grid relative row-[3_/_span_7] col-[15_/_span_1] z-20'}>
                        <GenreBar index={4} name={'yer'} percentage={20}/>
                    </div>
                    <div className={'grid relative row-[3_/_span_7] col-[17_/_span_1] z-20'}>
                        <GenreBar index={5} name={'Beats  '} percentage={16}/>
                    </div>


                </Section>

            </Dashboard>
        }
    </div>
  );
}

export default App;
