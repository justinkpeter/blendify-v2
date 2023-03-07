import React, { useEffect, useState } from "react";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { Navbar } from "./components/Navbar";
import { useDataLayerValue } from "./utils/DataLayer";
import { getTokenFromUrl } from "./auth/spotify";


import './styles/TopTracks.css'




import SpotifyWebApi from "spotify-web-api-js";
import './styles/ArtistCard.css'


import {FavoriteArtists} from "./components/Sections/FavoriteArtists";
import {FavoriteTracks} from "./components/Sections/FavoriteTracks";
import {FavoriteGenres} from "./components/Sections/FavoriteGenres";
import {StreamingAnalysis} from "./components/Sections/StreamingAnalysis";

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
        const shortTermTopArtists = await spotify.getMyTopArtists({time_range: 'short_term', limit: 50}).then((response) => {console.log('here is the response', response); return response.items})
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

        spotify.getMyTopArtists({time_range: 'short_term', limit:50})
            .then(response => console.log('response is', response))
            // .then(data => {
            //     // Extract the artist IDs from the response
            //     const artistIds = data.items.map(item => item.id);
            //     // Use the artist IDs to make individual requests to get more information about each artist
            //     // const artistInfoUrls = artistIds.map(id => `https://api.spotify.com/v1/artists/${id}`);
            //
            //     return Promise.all(spotify.getArtists(artistIds).then(response => response.JSON()))
            //     // return Promise.all(artistInfoUrls.map(url => fetch(url, { headers: { 'Authorization': `Bearer ${accessToken}` } }).then(response => response.json())));
            // })
            // .then(artistData => {
            //     // Extract the unique artist names from the response
            //     const artistNames = [...new Set(artistData.map(artist => artist.name))];
            //     console.log(`The user has listened to ${artistNames.length} different artists within the last 4 months.`);
            // })
            // .catch(error => console.error(error));



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

    const [data, setData] = useState(null);

    const handleUpdateData = (newData) => {
        setData(newData);
        console.log('new data is, ', newData)
    };




  return (
    <div>
        <Navbar user={user}/>
        {/*<Modal artist={artistModal} id={id}/>*/}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            </div>
        </div>


        { !token ? <Login/> :
            <Dashboard>
                <Loading isLoading={isLoaded} user={user}/>
                <FavoriteArtists favoriteArtists={shortTermTopArtists} onUpdateData={handleUpdateData}/>
                <FavoriteTracks favoriteTracks={shortTermTopTracks} />
                <FavoriteGenres favoriteGenres={topGenres} />
                <StreamingAnalysis favoriteGenres={topGenres} playlists={playlists} user={user} favoriteArtists={shortTermTopArtists} favoriteTracks={shortTermTopTracks}/>
            </Dashboard>
        }
    </div>
  );
}

export default App;
