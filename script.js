const audio = document.getElementById('audio');
const play = document.getElementById('play');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const image = document.querySelector('img');
const playTime = document.querySelector('.play-time');
const progressContainer = document.querySelector('.progress-container');
const blackProgress = document.querySelector('.progress');
const audioDuration = document.getElementById('duration');
const songs = [
  {
    name: 'tanvir-1',
    artist: 'tanvir sohan',
    image: 'tanvir-1',
  },
  {
    name: 'tanvir-2',
    artist: 'tanvir ',
    image: 'tanvir-2',
  },
  {
    name: 'tanvir-3',
    artist: 'sohan',
    image: 'tanvir-3',
  },
  {
    name: 'metric-1',
    artist: 'tanvir ',
    image: 'metric-1',
  },
];

let isPlaying = false;
let musicTrack = 0;

function musicPlay() {
  isPlaying = true;
  audio.play();
  play.classList.replace('fa-circle-play', 'fa-circle-pause');
  play.title = 'pause';
}

function musicPause() {
  isPlaying = false;
  audio.pause();
  play.classList.replace('fa-circle-pause', 'fa-circle-play');
  play.title = 'play';
}

function loadMusic(music) {
  title.innerHTML = music.name;
  image.src = `img/${music.image}.jpg`;
  artist.innerHTML = music.artist;
  audio.src = `music/${music.name}.mp3`;
}

function nextSong() {
  musicTrack++;

  if (musicTrack > songs.length - 1) {
    musicTrack = 0;
  }

  loadMusic(songs[musicTrack]);

  musicPlay();
}

function prevSong() {
  musicTrack--;
  if (musicTrack < 0) {
    musicTrack = songs.length - 1;
  }
  loadMusic(songs[musicTrack]);
  musicPlay();
}

function updateProgressBar(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  blackProgress.style.width = `${progressPercent}%`;

  const min = `${parseInt(currentTime / 60)}`.padStart(2, '0');
  const sec = `${parseInt(currentTime) % 60}`.padStart(2, '0');

  if (!duration) return;
  const Durmin = `${parseInt(duration / 60)}`.padStart(2, '0');
  const Dursec = `${parseInt(duration % 60)}`.padStart(2, '0');

  console.log(Durmin);

  audioDuration.innerHTML = `<span>${Durmin}:${Dursec}</span>`;
  playTime.innerHTML = `<span>${min}:${sec}</span>`;
}

function skipping(e) {
  const { duration } = audio;
  const totalWidth = this.clientWidth;
  const currentWidth = e.offsetX;
  const currentPoint = (currentWidth / totalWidth) * duration;
  audio.currentTime = currentPoint;
}

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
play.addEventListener('click', () => {
  isPlaying ? musicPause() : musicPlay();
});
audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', skipping);
audio.addEventListener('ended', nextSong);
