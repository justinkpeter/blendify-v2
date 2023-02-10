export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    //TODO: remove after developing
    //token: "BQAXMJ7XJB5BHLSCJGQtSzUvC8sWa8v7XV_NUsCiVq1fakZGw1VnUAbgg8S_HCPPcLAnpbcIyPjW7Nf0FICbUcHAQxBXjOK7WQ6ZkwlMJerdLI3XuxJ_MgZ4u3vvHZIw4AX1H2HOkdde5uK66-4vytsgR2MHxjch35VR9U2JuEdvu14oUmxtEHNIDElQXkbv"
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
        case 'SET_PLAYLISTS':
            return{
                ...state,
                playlists: action.playlists
            }
        case 'SET_DISCOVER_WEEKLY':
            return{
                ...state,
                discover_weekly: action.discover_weekly
            }

        default:
            return state
    }
}

export default reducer