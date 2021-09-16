"use strict"


// Video Player ====================================================================

const videoPlayer = document.querySelector('.video-player');

if(videoPlayer) {
	const video = document.querySelector('._video'),
				playVideoBtn = document.querySelector('._play-video'),
				progressVideo = document.querySelector('._video-progress'),
				videoCurrentTime = document.querySelector('._video-current-time'),
				videoDurationTime = document.querySelector('._video-duration-time'),
				videoVolumeBtn = document.querySelector('._volume-btn'),
				videoVolumeImg = document.querySelector('._volume-img'),
				videoVolumeInput = document.querySelector('._volume-input'),
				videoFullscreenBtn = document.querySelector('._fullscreen-video');

	// Play & Pause
	function toogleVideoStatus() {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}
	playVideoBtn.addEventListener('click', toogleVideoStatus);
	video.addEventListener('click', toogleVideoStatus);

	// Video Progress
	function updateVideoProgress() {
		progressVideo.value = (video.currentTime / video.duration) * 100;
		let currentTimeVideo = Number(video.currentTime);

		// Minutes
		let minutes = Math.floor(currentTimeVideo / 60) < 10 ? '0' + Math.floor(currentTimeVideo / 60) : Math.floor(currentTimeVideo / 60);

		// Seconds
		let seconds = Math.floor(currentTimeVideo % 60) < 10 ? '0' + Math.floor(currentTimeVideo % 60) : Math.floor(currentTimeVideo % 60);

		videoCurrentTime.innerHTML = `${minutes}:${seconds}`;
	}
	video.addEventListener('timeupdate', updateVideoProgress);

	// Set Proggress Video
	function setProgressVideo() {
		video.currentTime = (progressVideo.value * video.duration) / 100;
	}
	progressVideo.addEventListener('change', setProgressVideo);

	// Duration Video
	function videoDuration() {
		let durationTime = Number(video.duration);

		// Minutes
		let minutes = Math.floor(durationTime / 60) < 10 ? '0' + Math.floor(durationTime / 60) : Math.floor(durationTime / 60);
		minutes = Number(minutes);

		// Seconds
		let seconds = Math.floor(durationTime % 60) < 10 ? '0' + Math.floor(durationTime % 60) : Math.floor(durationTime % 60);
		seconds = Number(seconds);

		videoDurationTime.innerHTML = `${minutes}:${seconds}`;
	}
	video.addEventListener('loadeddata', videoDuration);

	// Volume
	function setVideoVolume(e) {
		video.volume = e.target.value / 100;
	}
	videoVolumeInput.addEventListener('input', setVideoVolume);

	videoVolumeBtn.addEventListener('click', () => {
		videoVolumeImg.classList.toggle('video-controls__volume-img--muted');
		video.volume = Number(video.volume == 0);
		if(Number(videoVolumeInput.value == 0)) {
			Number(videoVolumeInput.value = 100);
		} else {
			Number(videoVolumeInput.value = 0);
		}
	});
	function updateVideoVolume() {
		video.volume = 1;
	}
	video.addEventListener('loadeddata', updateVideoVolume);

	// Muted
	videoVolumeInput.addEventListener('input', () => {
		if(video.volume == 0) {
			videoVolumeImg.classList.add('video-controls__volume-img--muted');
		} else {
			videoVolumeImg.classList.remove('video-controls__volume-img--muted');
		}
	})

	// Fullscreen
	function toggleFullScreen() {
		if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoPlayer.requestFullscreen();
    }
	}
	videoPlayer.addEventListener('dblclick', toggleFullScreen);
	videoPlayer.addEventListener('fullscreenchange', checkFullscreen);
	videoFullscreenBtn.addEventListener('click', toggleFullScreen);

	function checkFullscreen() {
		const isFullscreen = Boolean(document.fullscreenElement);
		videoPlayer.classList.toggle('video-player--fullscreen', isFullscreen);
	}

	// Play & Pause on Space / Arrows Left / Right
	function initVideoListeners() {
		document.addEventListener('keydown', function (e) {
			if(e.code === 'Space') {
				e.preventDefault();
				toogleVideoStatus();
			} else if (e.code === 'ArrowRight') {
				video.currentTime += 5;
			} else if (e.code === 'ArrowLeft') {
				video.currentTime -= 5;
			}
		});
	}
	initVideoListeners();

	// Show Settings
	const videoSettingsBtn = document.querySelector('.video-controls__settings-btn');
	const videoSettingsMenu = document.querySelector('.video-controls__settings-menu');

	if(videoSettingsBtn) {
		videoSettingsBtn.addEventListener('click', function () {
			videoSettingsMenu.classList.toggle('video-controls__settings-menu--hidden');
		})
	}
	
}

// ===================================================================================