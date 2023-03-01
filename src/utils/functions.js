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

export function convertArtistReleaseDate(date) {
    if(date === undefined) return 0;
    const dateArr = date.split('-');

    let year = dateArr[0];
    let month = dateArr[1];
    let day = dateArr[2];

    if (month === '01') {
        month = 'January';
    }
    if (month === '02') {
        month = 'February';
    }
    if (month === '03') {
        month = 'March';
    }
    if (month === '04') {
        month = 'April';
    }
    if (month === '05') {
        month = 'May';
    }
    if (month === '06') {
        month = 'June';
    }
    if (month === '07') {
        month = 'July';
    }
    if (month === '08') {
        month = 'August';
    }
    if (month === '09') {
        month = 'September';
    }
    if (month === '10') {
        month = 'October';
    }
    if (month === '11') {
        month = 'November';
    }
    if (month === '12') {
        month = 'December';
    }
    return `${month} ${year}`
}

export function getArtistAlbumSingleCount(related_releases) {
    if(related_releases === undefined) return 0;
    else{
        let albumCount = 0;
        let singleCount = 0;
        related_releases.forEach((release) => {
            if (release.album_type === 'album') {
                albumCount++;
            } else if(release.album_type === 'single'){
                singleCount++;
            }
        })
        return `${albumCount} Albums, ${singleCount} Singles`
    }

}


// export function getQuickStatCardTitle(title){
//     switch(title){
//         default: return title;
//         case 'followers': return 'Followers';
//         case 'popularity': return 'Popularity';
//         case 'Latest releas'
//     }
// }


const handleScroll = () => {
    // get the scroll position  of the div element and console.log it
    const element = document.getElementById('scrollable');

    // get the element scroll percentage
    const scrollPercent = element.scrollTop / (element.scrollHeight - element.clientHeight);

    // console.log the scroll position
    console.log(scrollPercent)

    return (scrollPercent * 100);

}