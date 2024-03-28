let audio = document.querySelector('#audio');
let songTime = document.querySelector('.song-time');
let songRange = document.querySelector('.song-range');
let songDuration = document.querySelector('.song-duration');
let forImg = document.querySelector('.for-img img');
let title = document.querySelectorAll('.title');
let playPause = document.querySelectorAll('.play-pause');
let next = document.querySelectorAll('.next');
let prev = document.querySelectorAll('.prev');
let undoFirst = document.querySelector('.undo-first');
let undoSecond = document.querySelector('.undo-second');
let audioVolume = document.querySelector('.audio-volume');
let songPlaying = false;
let songList = [
    {
        songName : 'Miyagi Captain',
        song : 'audio/miagi captain.mp3',
        picture : 'img/miyagi1.jpg'
    },
    {
        songName : 'Miyagi Hajime',
        song : 'audio/miagi hajime.mp3',
        picture : 'img/miyagi2.jpg'
    },
    {
        songName : 'Miyagi Kolibri',
        song : 'audio/miagi kolibri.mp3',
        picture: 'img/miyagi3.jpg'
    },
    {
        songName : 'Miyagi Rapapam',
        song : 'audio/miagi rapapam.mp3',
        picture: 'img/miyagi4.jpg'
    },
    {
        songName : 'Miyagi Patron',
        song : 'audio/Miyagi & Andy Panda - Патрон.mp3',
        picture : 'img/Patron.jpg'
    }
]
function audioPlay() {
    songPlaying = true;
    audio.play();
}
function audioPause() {
    songPlaying = false;
    audio.pause()
}
songRange.addEventListener('input', function() {
    audio.currentTime = audio.duration * this.value / 100
})
audioVolume.addEventListener('input', function() {
    audio.volume = this.value / 100
})
undoFirst.onclick = function() {
    audio.currentTime = audio.currentTime - 10
}
undoSecond.onclick = function() {
    audio.currentTime = audio.currentTime + 10
 }
audio.addEventListener('timeupdate', () => {
    songRange.value = audio.currentTime * 100 / audio.duration 
    let curmins = Math.floor(audio.currentTime / 60);
    let cursec = Math.floor(audio.currentTime - curmins * 60);
    let durmins = Math.floor(audio.duration / 60);
    let dursec = Math.floor(audio.duration - durmins * 60);
    if(curmins < 10){
        curmins = '0' + curmins
    }
    if(cursec < 10){
        cursec = '0' + cursec
    }
    if(durmins < 10){
        durmins = '0' + durmins
    }
    if(dursec < 10){
        dursec = '0' + dursec
    }
    if(audio.currentTime > 0.001){
        songTime.innerHTML = curmins + ':' + cursec
        songDuration.innerHTML = durmins + ':' +dursec
    }
})
function loadSong(songList){
    for(let i = 0; i < title.length; i++){
        title[i].textContent = songList.songName
    }
    audio.src = songList.song;
    forImg.src = songList.picture
}
let i = 0;
loadSong(songList[i]);
function prevSong(){
    i--;
    if(i < 0){
        i = songList.length - 1 
    }
    loadSong(songList[i]);
    audioPlay()
}
for(let p = 0; p < prev.length; p++){
    prev[p].addEventListener('click', prevSong)
}
function nextSong() {
    i++;
    if(i < songList.length - 1){
        i = 0
    }
    loadSong(songList[i]);
    audioPlay()
}
for(let n = 0; n < next.length; n++){
    next[n].addEventListener('click', nextSong)
}
for(let i = 0; i < playPause.length; i++){
    playPause[i].addEventListener('click', () => {
        if(songPlaying == false){
            audioPlay();
            playPause[i].className = 'fa fa-pause'
        }
        else{
            audioPause();
            playPause[i].className = 'fa fa-play'
        }
    })
}
let chap = document.querySelector('.btn');
let btn = document.querySelector('.but');
btn.onclick = function() {
    chap.style.top = '0';
    chap.style.transition = '1s ease-in-out'
}
btn.oncontextmenu = function() {
    chap.style.top = '-90%'
    return false
}
songList.forEach(nkar => {
    let pict = document.createElement('div');
    pict.setAttribute('class','pict');
    chap.appendChild(pict)
    pict.background = `${nkar.picture}`
})
let pict = document.querySelectorAll('.pict');
for(let i = 0; i < pict.length; i++) {
    pict[i].onclick = function() {
     if(pict[i].background == songList[i].picture) {
        loadSong(songList[i]);
        audioPlay()
     }        
    } 
}