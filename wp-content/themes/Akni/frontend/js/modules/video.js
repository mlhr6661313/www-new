document.addEventListener("DOMContentLoaded", function () {
  let videoBtn = document.querySelector('.js-video-play');
  let video = document.querySelector('#video video');
  if (videoBtn) {
    videoBtn.addEventListener('click', function () {
      if (this.classList.contains('is-playing')) {
        this.classList.remove('is-playing');
        video.pause();
      } else {
        this.classList.add('is-playing');
        video.play();
      }
    })
  }
});