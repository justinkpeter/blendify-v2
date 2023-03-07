import React, { useEffect, useState } from "react";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { Navbar } from "./components/Navbar";
import { useDataLayerValue } from "./utils/DataLayer";
import { getTokenFromUrl } from "./auth/spotify";
import { Modal } from "./components/Modal";

import './styles/TopTracks.css'




import SpotifyWebApi from "spotify-web-api-js";


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
            // console.log('playlist number is: ', playlists)
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


        // get the top 5 highest frequency genres
        const sortedGenres = Object.keys(genreFrequency).sort(function(a,b){return genreFrequency[b]-genreFrequency[a]})
        const topGenres = [
            {name: sortedGenres[0], percentage: Math.round(genreFrequency[sortedGenres[0]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[1], percentage: Math.round(genreFrequency[sortedGenres[1]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[2], percentage: Math.round(genreFrequency[sortedGenres[2]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[3], percentage: Math.round(genreFrequency[sortedGenres[3]]/ shortTermTopGenres.length * 100)},
            {name: sortedGenres[4], percentage: Math.round(genreFrequency[sortedGenres[4]]/ shortTermTopGenres.length * 100)},
        ]

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
            dispatch({
                type: 'SET_SAVED_TRACKS',
                savedTracks: response.total
            })
        })

        // spotify.getMyTopArtists({time_range: 'short_term', limit:50})
        //     .then(response => console.log('response is', response))
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

    } );


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


    const [{shortTermTopArtists, shortTermTopTracks, topGenres, savedTracks, playlists, isLoaded } ] = useDataLayerValue();
    const [selectedArtist, setSelectedArtist] = useState(null);

    const handleUpdateData = async(newData) => {

        // set modal state loading to true

        // fetch new data
        if(newData){
            console.log(newData)
            // get artist data
            const artistData = await spotify.getArtist(newData.id).then((response) => {
                return response
            })

            // get artist top tracks
            const topTracks = await spotify.getArtistTopTracks(newData.id, 'US').then((response) => {
                artistData.top_tracks = response.tracks
            })

            // get artist related artists
            const relatedArtists = await spotify.getArtistRelatedArtists(newData.id).then((response) => {
                artistData.related_artists = response.artists
            })

            // get artist related releases
            const relatedReleases = await spotify.getArtistAlbums(newData.id, {limit: 50}).then((response) => {
                artistData.related_releases = response.items
            })

            setSelectedArtist(artistData)
        }


        // once data is fetched, set modal state loading to false
        setModalDataLoading(false)
    };

    const [modalDataLoading, setModalDataLoading] = useState(true);


  return (
    <div>
        <Navbar user={user}/>
        <Modal loading={modalDataLoading} artist={selectedArtist}/>

        { !token ? <Login/> :
            <Dashboard>
                <Loading isLoading={isLoaded} user={user}/>
                <FavoriteArtists favoriteArtists={shortTermTopArtists} onUpdateData={handleUpdateData}/>
                <FavoriteTracks favoriteTracks={shortTermTopTracks} />
                <FavoriteGenres favoriteGenres={topGenres} />
                <StreamingAnalysis
                    user={user}
                    favoriteGenres={topGenres}
                    playlists={playlists}
                    favoriteArtists={shortTermTopArtists}
                    favoriteTracks={shortTermTopTracks}/>
            </Dashboard>
        }
    </div>
  );
}

export default App;
