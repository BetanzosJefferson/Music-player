//Data
const songList = [
  {
    title: "When you die",
    artist: "MGTM",
    src: "1.mp3",
    cover: "cover1.jpg",
  },
  {
    title: "Smell Like Teen Spirit",
    artist: "Nirvana",
    src: "2.mp3",
    cover: "cover2.jpg",
  },
  {
    title: "Houdini",
    artist: "Foster The Peaple",
    src: "3.mp3",
    cover: "cover3.jpg",
  }
];

//DOM ELEMENTS
const titleContainer = document.querySelector(".title");
const listSongs = document.querySelector(".lists");
const container = document.querySelector(".container");
const title = document.querySelector(".title__heading");
const cover = document.querySelector(".cover-image");
const artist = document.querySelector(".artist")
const progressContainer = document.getElementById("progress-container")
const progress = document.querySelector(".progress-bar");
const prevSong = document.getElementById("prev");
const songPlay = document.getElementById("play");
const nextSong = document.getElementById("next");
const audio = document.getElementById("audio");

//Current Index
var currentIndexSong = 0;

//Listeners
/* Play or pause song */
songPlay.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    updateControls();
  } else {
    audio.pause();
    updateControls();
  }
});

//Next Song
nextSong.addEventListener("click", () => nextSongOnTrack());

//PrevSong
prevSong.addEventListener("click", function(){
  currentIndexSong--;
  if(currentIndexSong < 0){
    currentIndexSong = 0
    const lastSong = songList.length - 1
    loadSong(lastSong)
  }else{
    loadSong(currentIndexSong)
  }
})

audio.addEventListener("timeupdate", function(){
  const currentTime = audio.currentTime;
  const totalDuration = audio.duration
  const porcent = (currentTime / totalDuration) * 100
  progress.style.width = porcent + "%";
})

//EndSong
audio.addEventListener("ended", () => nextSongOnTrack())
//SetProgress

progressContainer.addEventListener("click", setProgress)

//Functions
function initPlayer() {
  songList.forEach((song, index) => {
    createSongElements(song, index);
  });
}

function createSongElements(song, index) {
  const aSongElement = document.createElement("A");
  aSongElement.textContent = song.title;
  aSongElement.href = "#";
  aSongElement.addEventListener("click", () => loadSong(index, aSongElement));
  listSongs.appendChild(aSongElement);
}

function loadSong(index, songElement) {
    cover.src = "img/" + songList[index].cover;
    title.textContent = songList[index].title;
    audio.src = "audio/" + songList[index].src;
    artist.textContent = songList[index].artist;
    currentIndexSong = index; //Get the Current Index Song
    audio.play();
    updateControls();
    changeActive(songElement, currentIndexSong);
}

function nextSongOnTrack(){
  currentIndexSong++;
  if(songList.length === currentIndexSong){
    loadSong(0)
  }else{
    loadSong(currentIndexSong)
  }
}

function updateControls() {
  if (audio.paused) {
    songPlay.classList.replace("fa-pause", "fa-play");
  } else {
    songPlay.classList.replace("fa-play", "fa-pause");
  }
}
function changeProgress() {
  const currentTime = audio.currentTime;
}

function changeActive(songElement, currentIndexSong){
  const aElements = document.querySelectorAll("a")
  aElements.forEach(element =>{
    element.classList.remove("active")
  })

  aElements[currentIndexSong].classList.add("active")
}

function setProgress(event){
const totalProgress = this.offsetWidth;
const clickProgress = event.offsetX;
let newProgress = (clickProgress / totalProgress) * audio.duration
audio.currentTime = newProgress
}

initPlayer();
