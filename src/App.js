import { useEffect } from "react";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";

import { useDataLayerValue } from "./utils/DataLayer";
import { getTokenFromUrl } from "./auth/spotify";

import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();
function App() {

    const [{ user, token }, dispatch ] = useDataLayerValue();

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


  return (
    <div>
        {token ? <Dashboard/> : <Login />}
    </div>
  );
}

export default App;
