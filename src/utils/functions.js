export function numberWithCommas(x) {
    if(x === undefined) return 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getArtistCardId(name) {
    if(name === undefined) return 0;
    return name.replace(/\s/g, '-').toLowerCase()
}

export function getPopularity(popularity) {
    if (popularity < 20) {
        return "Underground"
    } else if (popularity < 40) {
        return "Lowkey"
    } else if (popularity < 70) {
        return "Well Known"
    } else if (popularity < 90) {
        return "Trending"
    } else {
        return "A-List"
    }
}

export function getArtistTopTrack(artistId, token) {
    return fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
        .then(data => data.tracks[0].name)
}