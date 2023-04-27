//logica Ã© : identificar a onde estÃ¡ clicando(e determinar a tarefa) -> tudo vai ser a partir dos controles
//vamos captar os eventos do player(controles) que estÃ¡ na <section id="controls"> 
const controls = document.querySelector("#controls");
const btnPlay = document.querySelector("#play-control");
let index = 0;//primeira musica do player
let currentMusic;
let isPlaying = false; //padrÃ£o inicial nÃ£o estÃ¡ tocando

controls.addEventListener("click", function (event) {
    // console.log(event) mostrar o evento de cada clique

    const audios = [];//em audios teremos vÃ¡rias musicas vamos pegar as musicas atraves da linha que temos no projeto
    let music = {};// objeto vazio
    /*explicar como vai identificar as misicas na lista(HTML)*/
    
    console.log(event);

    if (event.target.id != "controls") {
        const nodelist = document.body.childNodes;
        const musics = nodelist[3].childNodes[5].childNodes[1].childNodes[3].childNodes;
        console.log(music);
        musics.forEach(function (item) {
            if (item.nodeName != "#text") {//a condiÃ§Ã£o Ã© se for diferente de #text Ã© #td
                music.name = item.childNodes[3].childNodes[0].data;//identifica o nome da musica
                music.artist = item.childNodes[5].childNodes[0].data;//identifica o artista da musica
                music.image = item.childNodes[1].childNodes[0].currentSrc;//identifica a imagem da musica
                music.audio = item.childNodes[7].childNodes[1];//identifica o audio da musica
                audios.push(music);
                music = {};
            }
        });

        //console.log(audios)// imprime os audios
    }

    function updateDataMusic() {//update nos dados da music atual
        currentMusic = audios[index];// parametro para identificar a musica atual
        document.querySelector("#currentImg").src = currentMusic.image;
        document.querySelector("#currentName").innerText = currentMusic.name;
        document.querySelector("#currentArtist").innerText = currentMusic.artist;
        document.querySelector("#volume").value = currentMusic.audio.volume * 100;//volume 100%

        const progressbar = document.querySelector("#progressbar");
        const textCurrentDuration = document.querySelector("#current-duration");
        const textTotalDuration = document.querySelector("#total-duration");

        progressbar.max = currentMusic.audio.duration;
        textTotalDuration.innerText = secondsToMinutes(currentMusic.audio.duration);

        currentMusic.audio.ontimeupdate = function () {
            textCurrentDuration.innerText = secondsToMinutes(
                currentMusic.audio.currentTime
            );
            progressbar.valueAsNumber = currentMusic.audio.currentTime;
        };

        // updateDataMusic();
    }

    if (event.target.id == "play-control") {
        if (index === 0) {
            updateDataMusic();
        }

        if (!isPlaying) {
            btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
            currentMusic.audio.play();
            isPlaying = true;
        } else {
            btnPlay.classList.replace("bi-pause-fill", "bi-play-fill");
            currentMusic.audio.pause();
            isPlaying = false;
        }
        musicEnded();
    }

    if (event.target.id == "vol-icon") {
        currentMusic.audio.muted = !currentMusic.audio.muted;
        if (currentMusic.audio.muted) {
            event.target.classList.replace(
                "bi-volume-up-fill",
                "bi-volume-mute-fill"
            );
        } else {
            event.target.classList.replace(
                "bi-volume-mute-fill",
                "bi-volume-up-fill"
            );
        }
        musicEnded();
    }

    if (event.target.id == "volume") {
        currentMusic.audio.volume = event.target.valueAsNumber / 100;
        musicEnded();
    }

    if (event.target.id == "progressbar") {
        currentMusic.audio.currentTime = event.target.valueAsNumber;
        musicEnded();
    }

    if (event.target.id == "next-control") {
        index++;

        if (index == audios.length) {
            index = 0;
        }

        currentMusic.audio.pause();
        updateDataMusic();
        currentMusic.audio.play();
        btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
        musicEnded();
    }

    if (event.target.id == "prev-control") {
        index--;

        if (index == -1) {
            index = audios.length - 1;
        }

        currentMusic.audio.pause();
        updateDataMusic();
        currentMusic.audio.play();
        btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
        musicEnded();
    }

    function musicEnded() {
        currentMusic.audio.addEventListener("ended", function () {
            index++;

            if (index == audios.length) {
                index = 0;
            }

            currentMusic.audio.pause();
            updateDataMusic();
            currentMusic.audio.play();
            btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
        });
    }
});


function secondsToMinutes(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}
