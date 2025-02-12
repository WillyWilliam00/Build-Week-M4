const ArtisInfo = document.querySelector(".ArtistInfo")
const ArtistSongs = document.querySelector(".Top10Songs")
let number
let check  

function randomnumber() { 
    number = Math.floor(Math.random() * 5000) + 1
}

const sleep = (milliseconds=500) => new Promise(resolve => setTimeout(resolve, milliseconds)) //funzione per timing 1.5sec

async function GetSongFromRandomArtist() {  // funzione che fetcha randomicamente un artista 
    try {
        
        do {                                //ciclo do while che cicla fino a quando non trova un array pieno
            await sleep(2000)               //funzione che fa fetchare ogni 1.5sec per non intasare il server
            randomnumber()                  // funzione per avere un numero random 

            const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${number}/top?limit=10`)
            const result = await response.json()

            check = result.data

        } while ((check.length === 0))

        return check
    }
    catch(error) {
        console.log(error);
        ArtisInfo.innerHTML = `"oh oh qualcosa non va`
    } finally {
        document.querySelector(".dot-pulse").classList.add("d-none");
      }

}

async function DisplaySongFromRandomArtist(RandomArtistData) { //display random artist nella sidebar 

    ArtisInfo.innerHTML = /*html*/`
        <img src="${RandomArtistData[0].contributors[0].picture}" alt="" class="mb-3">
        <h5 class="mb-3"><a class="text-decoration-none text-light fw-bold" href="/artist/artist.html?id=${RandomArtistData[0].artist.id}">${RandomArtistData[0].artist.name}</h5>
        <hr>
    `
    ArtistSongs.innerHTML = RandomArtistData.map(Song => /*html*/`
            <div class="d-flex align-items-center py-3">
                    <img src="${Song.album.cover}" alt="" style="width: 80px; height: 80px; border-radius: 4px;" class="me-3 img-fluid">
                <div class="ms-2">
                    <p class="m-0 text-grey">Song: <span class="fw-bolder">${Song.title_short}</span></p>
                    <p class="m-0 text-grey">Album: 
                        <span class="fw-bolder">
                            <a class="text-decoration-none text-light" href="/album/album.html?id=${Song.album.id}">${Song.album.title}</a>
                        </span>
                    </p> 
                </div>
            </div>
    `
    ).join("")
}


// COPIARE NEL PROPRIO FILE.JS O AGGIUNGERE FUNZIONI AL PROPRIO WINDOW.ONLOAD
/* const RandomArtistData = await GetSongFromRandomArtist()
DisplaySongFromRandomArtist(RandomArtistData)  */
