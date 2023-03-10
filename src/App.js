import React, { useEffect, useState } from "react";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
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
    const dispatchTopTracks = async (shortTermTopArtistsTopTracks) => {
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
        const _token = hash.access_token
        // console.log(hash)
        if(hash.access_token){
            // set token
            dispatch({
                type: 'SET_TOKEN',
                token: _token
            })
            // set token to local storage
            window.localStorage.setItem('token', _token)
            // remove token from url
            window.location.hash = ""
            getSpotifyData(_token)

        }


        // if(_token){
        //
        //     getSpotifyData(_token)
        //
        //     // while data is being fetched, set the token
        //
        // }

    });


    const [{shortTermTopArtists, shortTermTopTracks, topGenres, playlists, isLoaded } ] = useDataLayerValue();

    const [modalDataLoading, setModalDataLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleUpdateData = async(newData) => {

        // handle errors and null data
        if(newData === null){
            setModalData(null)
            setModalOpen(false)
            console.log('clearing data')
            return
        }

        // set modal state loading to true

        if(newData.type === 'track'){
            setModalData(newData)
            setModalOpen(true)
            setModalDataLoading(true)

           // get track release date
            await spotify.getAlbum(newData.data.album.id).then((response) => {
                newData.data.release_date = response.release_date
            })

            // get track audio features, like danceability, energy, etc
            await spotify.getAudioFeaturesForTrack(newData.data.id).then((response) => {
                newData.data.audio_features = response
            })

            // get related tracks
            await spotify.getRecommendations({seed_tracks: [newData.data.id], limit: 50}).then((response) => {
                newData.data.related_tracks = response.tracks
            })

            setModalData(newData)

        }

        if(newData.type === 'artist'){

            console.log('opening artist modal')
            setModalData(newData)
            setModalOpen(true)
            setModalDataLoading(true)


            // get artist data
            await spotify.getArtist(newData.data.id).then((response) => {
                newData.data = response
            })

            // get artist top tracks
            await spotify.getArtistTopTracks(newData.data.id, 'US').then((response) => {
                newData.data.top_tracks = response.tracks
            })

            // get artist related artists
            await spotify.getArtistRelatedArtists(newData.data.id).then((response) => {
                newData.data.related_artists = response.artists
            })

            // get artist related releases
            await spotify.getArtistAlbums(newData.data.id, {limit: 50}).then((response) => {
                newData.data.related_releases = response.items
            })

        }

        // once data is fetched, set modal state loading to false
        setModalDataLoading(false)

        // display data
        setModalData(newData)
        console.log('displaying data')

    };


  return (
    <div>
        <Modal isOpen={modalOpen} loading={modalDataLoading} data={modalData} onUpdateData={handleUpdateData}/>

        { !token ? <Login/> :
            <Dashboard isLoaded={isLoaded} user={user}>
                <FavoriteArtists favoriteArtists={shortTermTopArtists} onUpdateData={handleUpdateData}/>
                <FavoriteTracks favoriteTracks={shortTermTopTracks} onUpdateData={handleUpdateData}/>
                <FavoriteGenres favoriteGenres={topGenres} />
                <StreamingAnalysis
                    user={user}
                    favoriteGenres={topGenres}
                    playlists={playlists}
                    favoriteArtists={shortTermTopArtists}
                    favoriteTracks={shortTermTopTracks}
                />
            </Dashboard>
        }
    </div>
  );
}

export default App;
