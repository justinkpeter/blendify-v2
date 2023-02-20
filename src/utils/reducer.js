export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    //TODO: remove after developing
    //token: "BQAXMJ7XJB5BHLSCJGQtSzUvC8sWa8v7XV_NUsCiVq1fakZGw1VnUAbgg8S_HCPPcLAnpbcIyPjW7Nf0FICbUcHAQxBXjOK7WQ6ZkwlMJerdLI3XuxJ_MgZ4u3vvHZIw4AX1H2HOkdde5uK66-4vytsgR2MHxjch35VR9U2JuEdvu14oUmxtEHNIDElQXkbv"
    shortTermTopArtists: [],
    shortTermTopTracks: [],
    mediumTermTopTracks: [],
    mediumTermTopArtists: [],
    longTermTopTracks: [],
    longTermTopArtists: [],


}
const reducer = (state, action) => {
    //Action -> type, [payload]

    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return{
                ...state,
                token: action.token
            }
            case 'shortTermTopTracks':
                return{
                    ...state,
                    shortTermTopTracks: action.shortTermTopTracks
                }
        case 'mediumTermTopTracks':
            return{
                ...state,
                mediumTermTopTracks: action.mediumTermTopTracks
            }
            case 'longTermTopTracks':
                return{
                    ...state,
                    longTermTopTracks: action.longTermTopTracks
                }
        case 'shortTermTopArtists':
            return {
                ...state,
                shortTermTopArtists: action.shortTermTopArtists
            }
        case 'shortTermTopArtistsTopTracks':{
            return {
                ...state,
                shortTermTopArtistsTopTracks: action.shortTermTopArtistsTopTracks
            }
        }
        case 'mediumTermTopArtists':
            return {
                ...state,
                mediumTermTopArtists: action.mediumTermTopArtists
            }
        case 'longTermTopArtists':
            return {
                ...state,
                longTermTopArtists: action.longTermTopArtists
            }
        default:
            return state
    }
}

export default reducer