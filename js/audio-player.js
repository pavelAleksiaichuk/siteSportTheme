
// Audio ===================================================================================

const audioPlayer = document.querySelector('.audio-player');

if (audioPlayer) {
	const audio = document.querySelector('._audio'),
				audioTitle = document.querySelector('.audio__title'),
				audioBtnPrev = document.querySelector('.audio__btn-prev'),
				playOrPause = document.querySelector('.play-or-pause'),
				audioBtnNext = document.querySelector('.audio__btn-next'),
				audioProgressContainer = document.querySelector('.audio__progressbar-container'),
				audioProgress = document.querySelector('.audio__progressbar'),
				audioCurrentMin = document.querySelector('.audio__current-min'),
				audioCurrentSec = document.querySelector('.audio__current-sec'),
				audioDurationMin = document.querySelector('.audio__duration-min'),
				audioDurationSec = document.querySelector('.audio__duration-sec'),
				audioVolumeInput = document.querySelector('.audio__volume-input'),
				audioVolumeBtn = document.querySelector('.audio__volume-btn'),
				audioVolumeImg = document.querySelector('.audio__volume-img');

	// Songs Name
	const songs = ['audio-1', 'audio-2', 'audio-3'];

	// Defaul Song
	let songIndex = 0;

	// Init
	function loadSong (song) {
		audioTitle.innerHTML = song;
		audio.src = `audio/my-album/${song}.mp3`;
	}
	loadSong(songs[songIndex]);

	// Play
	function audioPlay() {
		playOrPause.classList.remove('audio__btn-play');
		playOrPause.classList.add('audio__btn-pause');
		audio.play();
	}

	// Pause
	function audioPause() {
		playOrPause.classList.remove('audio__btn-pause');
		playOrPause.classList.add('audio__btn-play');
		audio.pause();
	}

	playOrPause.addEventListener('click', () => {
		const isPlaying = playOrPause.classList.contains('audio__btn-play');
		if (isPlaying) {
			audioPlay();
		} else {
			audioPause();
		}
	});

	// Next Song
	function nextSong() {
		songIndex++;
		if (songIndex > songs.length - 1) {
			songIndex = 0;
		}
		loadSong(songs[songIndex]);
		audioPlay();
	}
	audioBtnNext.addEventListener('click', nextSong);
	audio.addEventListener('ended', nextSong);

	function prevSong() {
		songIndex--;
		if (songIndex < 0) {
			songIndex = songs.length - 1;
		}
		loadSong(songs[songIndex]);
		audioPlay();
	}
	audioBtnPrev.addEventListener('click', prevSong);

	// Progress Bar
	function updateProgress(e) {
		const duration = Number(audio.duration.toFixed());
		const currentTime = Number(audio.currentTime.toFixed());
		const audioProgressPercent = (currentTime / duration) * 100;
		audioProgress.style.width = `${audioProgressPercent}%`;
		audioCurrentMin.innerHTML = Math.floor(currentTime / 60) < 10 ? '0' + Math.floor(currentTime / 60) + ':' : Math.floor(currentTime / 60) + ':';
		audioCurrentSec.innerHTML = Math.floor(currentTime % 60) < 10 ? '0' + Math.floor(currentTime % 60) : Math.floor(currentTime % 60);
	}
	audio.addEventListener('timeupdate', updateProgress);

	// Set Progress
	function setAudioProgress(e) {
		let audioCurrentWidth = e.offsetX;
		let audioWidth = this.clientWidth;
		let audioDuration = audio.duration;
		audio.currentTime = (audioCurrentWidth / audioWidth) * audioDuration;
	}
	audioProgressContainer.addEventListener('click', setAudioProgress);

	function audioTimers() {
		let durationTime = Number(audio.duration.toFixed());

		audioDurationMin.innerHTML = Math.floor(durationTime / 60) < 10 ? '0' + Math.floor(durationTime / 60) + ':' : Math.floor(durationTime / 60);
		audioDurationSec.innerHTML = Math.floor(durationTime % 60) < 10 ? '0' + Math.floor(durationTime % 60) : Math.floor(durationTime % 60);
	}
	audio.addEventListener('loadeddata', audioTimers);

	// Volume
	function setVolume(e) {
		audio.volume = e.target.value / 100;
	}
	audioVolumeInput.addEventListener('input', setVolume);

	audioVolumeBtn.addEventListener('click', () => {
		audioVolumeImg.classList.toggle('audio__volume-img--muted');
		audio.volume = Number(audio.volume == 0);
		if(Number(audioVolumeInput.value == 0)) {
			Number(audioVolumeInput.value = 100);
		} else {
			Number(audioVolumeInput.value = 0);
		}
	});
	function updateVolumeValue() {
		audio.volume = 1;
	}
	audio.addEventListener('loadeddata', updateVolumeValue);

	// Muted
	audioVolumeInput.addEventListener('input', () => {
		if(audio.volume == 0) {
			audioVolumeImg.classList.add('audio__volume-img--muted');
		} else {
			audioVolumeImg.classList.remove('audio__volume-img--muted');
		}
	})
}

// =============================================================================================