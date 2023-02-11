import { useEffect } from "react";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { Navbar } from "./components/Navbar";
import { Section } from "./components/Section";

import { useDataLayerValue } from "./utils/DataLayer";
import { getTokenFromUrl } from "./auth/spotify";

import SpotifyWebApi from "spotify-web-api-js";
import './styles/ArtistCard.css'

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

        console.log({shortTermTopArtists, mediumTermTopArtists, longTermTopArtists})

        await dispatchTopArtists(shortTermTopArtists, mediumTermTopArtists, longTermTopArtists)

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
                    <h1 className={'my-5 font-black text-6xl xl:text-7xl text-white'}>
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
        const [{ shortTermTopArtists, mediumTermTopArtists, longTermTopArtists }, dispatch ] = useDataLayerValue();
        const topArtist = shortTermTopArtists[0]

        return(
            <div className={'artist-card'}>
                <div className={'artist-card-title'}>
                    <span className={'text-lg font-normal'}> Your Top Artist </span>
                    <span className={'text-3xl font-bold'}> {topArtist?.name} </span>
                </div>
                <img src={topArtist?.images[0].url} alt={topArtist?.name} className={'artist-card-image'}/>
                <div className={'artist-card-image-overlay'}/>
            </div>
        )
    }


  return (
    <div>
        <Navbar/>
        { !token ? <Login/> :
            <Dashboard>
                <Section>
                    <SectionSummary/>
                    <TopArtist>
                        <TopArtistCard/>
                    </TopArtist>

                    {/*<div className={'col-[10_/_span_4] row-[3_/_span_4] bg-blue-500'}>2</div>*/}
                </Section>
            </Dashboard>
        }
    </div>
  );
}

export default App;
