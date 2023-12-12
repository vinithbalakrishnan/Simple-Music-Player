"use strict";

var Musics = [{
  name: "Arjunaru Villu",
  author: "Sukwendher singh & Manicka Vinayagam",
  src: "./media/Arjunaru_Villu.mp3",
  cover: "./covers/music-beat.gif"
}, {
  name: "Entha Desathil",
  author: "Hasriharan",
  src: "./media/Endha_Deysathil.mp3",
  cover: "./covers/music-beat.gif"
}, {
  name: "Engayeo Partha Mayakam",
  author: "Udit narayanan",
  src: "./media/Engeyo-Partha.mp3",
  cover: "./covers/music-beat.gif"
}, {
  name: "Ennavo-Ennavo",
  author: "Hariharan & Mahalakshmi",
  src: "./media/Ennavo_Ennavo.mp3",
  cover: "./covers/music-beat.gif"
}, {
  name: "Kodi Kodi Minnalgal",
  author: "Vijay Yesudas",
  src: "./media/Kodi_Kodi_Minnalgal.mp3",
  cover: "./covers/music-beat.gif"
}];
var MusicIndex = 0; // Variables

var musicElem = document.getElementById("musicElem"),
    cover = document.getElementById("cover"),
    songName = document.getElementById("name"),
    author = document.getElementById("author"),
    infoTime = document.getElementById("infoTime"),
    play = document.getElementById("play"),
    currentTime = document.getElementById("currentTime"),
    back = document.getElementById("back"),
    prev = document.getElementById("prev"),
    next = document.getElementById("next"),
    forward = document.getElementById("forward"),
    tracker = document.getElementById("tracker"); // Functions

function checkMusic() {
  musicElem.src = Musics[MusicIndex].src;
  cover.src = Musics[MusicIndex].cover;
  songName.innerHTML = Musics[MusicIndex].name;
  author.innerHTML = Musics[MusicIndex].author;
  calculateTime();
}

function calculateTime() {
  musicElem.addEventListener("loadedmetadata", function () {
    var songTime = Math.floor(musicElem.duration);
    var sMinute = Math.floor(songTime / 60);
    var sSecond = songTime - sMinute * 60;

    if (sSecond < 10) {
      sSecond = "0" + sSecond;
    }

    infoTime.innerHTML = "".concat(sMinute, ":").concat(sSecond);
  });
} // Change With Range


tracker.addEventListener("change", function (e) {
  var rate = Math.floor(musicElem.duration) / 100;
  musicElem.currentTime = e.target.value * rate;
}); // Real Time Remaining

setInterval(function () {
  var songCurrent = Math.floor(musicElem.currentTime);
  var cMinute = Math.floor(songCurrent / 60);
  var cSecond = songCurrent - cMinute * 60;

  if (cSecond < 10) {
    cSecond = "0" + cSecond;
  }

  currentTime.innerHTML = "".concat(cMinute, ":").concat(cSecond);
  var rate = Math.floor(musicElem.duration) / 100;
  tracker.value = songCurrent / rate;
}, 500);
var isPlay = false;

function playMusic() {
  if (isPlay) {
    play.children[0].classList.replace("mdi-pause", "mdi-play");
    musicElem.pause();
    isPlay = false;
  } else {
    play.children[0].classList.replace("mdi-play", "mdi-pause");
    musicElem.play();
    isPlay = true;
  }
}

checkMusic(); // Set Event

play.addEventListener("click", playMusic); // Forward 10 Second

forward.addEventListener("click", function () {
  musicElem.currentTime += 10;
}); // Back 10 Second

back.addEventListener("click", function () {
  musicElem.currentTime -= 10;
}); // Next Song

function nextSong() {
  if (MusicIndex < Musics.length - 1) {
    MusicIndex++;
    checkMusic();
    play.children[0].classList.replace("mdi-play", "mdi-pause");
    musicElem.play();
    isPlay = true;
  }
}

next.addEventListener("click", nextSong); // Previous Song

function prevSong() {
  if (MusicIndex > 0) {
    MusicIndex--;
    checkMusic();
    play.children[0].classList.replace("mdi-play", "mdi-pause");
    musicElem.play();
    isPlay = true;
  }
}

prev.addEventListener("click", prevSong); // Keyboard Events

document.addEventListener("keyup", function (e) {
  if (e.keyCode === 32) playMusic();
  if (e.keyCode === 37) musicElem.currentTime -= 10;
  if (e.keyCode === 38) nextSong();
  if (e.keyCode === 39) musicElem.currentTime += 10;
  if (e.keyCode === 40) prevSong();
});
//# sourceMappingURL=script.dev.js.map
