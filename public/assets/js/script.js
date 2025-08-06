'use strict';
const forms = document.getElementById('contact-form');
const result = document.getElementById('result');

forms.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(forms);
  // Add the access key to the form data
 formData.append('access_key', '98ceb187-f4ba-434a-a97c-656bd938952b');
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// project modal variables
const projectItems = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");

// project modal elements
const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalVideo = document.querySelector("[data-project-modal-video]");

// video control elements
const videoContainer = document.querySelector("[data-video-container]");
const videoControls = document.querySelector("[data-video-controls]");
const videoOverlay = document.querySelector("[data-video-overlay]");
const videoPlayBtn = document.querySelector("[data-video-play-btn]");
const videoVolumeBtn = document.querySelector("[data-video-volume-btn]");
const videoFullscreenBtn = document.querySelector("[data-video-fullscreen-btn]");
const videoProgressBar = document.querySelector("[data-video-progress-bar]");
const videoProgressFill = document.querySelector("[data-video-progress-fill]");
const currentTimeEl = document.querySelector("[data-current-time]");
const totalTimeEl = document.querySelector("[data-total-time]");
const playIcon = document.querySelector("[data-play-icon]");
const pauseIcon = document.querySelector("[data-pause-icon]");
const volumeHighIcon = document.querySelector("[data-volume-high-icon]");
const volumeMuteIcon = document.querySelector("[data-volume-mute-icon]");
const expandIcon = document.querySelector("[data-expand-icon]");
const contractIcon = document.querySelector("[data-contract-icon]");

// project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  document.body.style.overflow = projectModalContainer.classList.contains("active") ? "hidden" : "";
  
  // Pause video when modal closes
  if (!projectModalContainer.classList.contains("active")) {
    projectModalVideo.pause();
    projectModalVideo.currentTime = 0;
    resetVideoControls();
    exitFullscreen();
  }
}

// Video control functions
const resetVideoControls = function() {
  playIcon.style.display = "block";
  pauseIcon.style.display = "none";
  videoOverlay.classList.remove("hidden");
  videoProgressFill.style.width = "0%";
  currentTimeEl.textContent = "0:00";
}

const formatTime = function(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

const updateVideoProgress = function() {
  if (projectModalVideo.duration) {
    const progress = (projectModalVideo.currentTime / projectModalVideo.duration) * 100;
    videoProgressFill.style.width = progress + "%";
    currentTimeEl.textContent = formatTime(projectModalVideo.currentTime);
  }
}

const togglePlayPause = function() {
  if (projectModalVideo.paused) {
    projectModalVideo.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
    videoOverlay.classList.add("hidden");
  } else {
    projectModalVideo.pause();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }
}

const toggleMute = function() {
  projectModalVideo.muted = !projectModalVideo.muted;
  if (projectModalVideo.muted) {
    volumeHighIcon.style.display = "none";
    volumeMuteIcon.style.display = "block";
  } else {
    volumeHighIcon.style.display = "block";
    volumeMuteIcon.style.display = "none";
  }
}

const toggleFullscreen = function() {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen().then(() => {
      videoContainer.classList.add("fullscreen");
      expandIcon.style.display = "none";
      contractIcon.style.display = "block";
    }).catch(err => {
      console.log("Error attempting to enable fullscreen:", err);
    });
  } else {
    document.exitFullscreen().then(() => {
      videoContainer.classList.remove("fullscreen");
      expandIcon.style.display = "block";
      contractIcon.style.display = "none";
    }).catch(err => {
      console.log("Error attempting to exit fullscreen:", err);
    });
  }
}

const exitFullscreen = function() {
  if (document.fullscreenElement) {
    document.exitFullscreen().then(() => {
      videoContainer.classList.remove("fullscreen");
      expandIcon.style.display = "block";
      contractIcon.style.display = "none";
    });
  }
}

// add click event to all project items
for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    
    const projectImg = this.querySelector("[data-project-img]");
    const projectTitle = this.querySelector("[data-project-title]");
    const projectCategory = this.querySelector("[data-project-category]");
    const projectVideoSrc = this.getAttribute("data-project-video");
    
    // set modal content
    projectModalImg.src = projectImg.src;
    projectModalImg.alt = projectImg.alt;
    projectModalTitle.innerHTML = projectTitle.innerHTML;
    projectModalCategory.innerHTML = projectCategory.innerHTML;
    
    // set video source
    if (projectVideoSrc) {
      projectModalVideo.querySelector("source").src = projectVideoSrc;
      projectModalVideo.load(); // Reload video with new source
      videoContainer.style.display = "block";
      resetVideoControls();
      
      // Add video event listeners
      projectModalVideo.addEventListener("loadedmetadata", function() {
        totalTimeEl.textContent = formatTime(projectModalVideo.duration);
      });
      
      projectModalVideo.addEventListener("timeupdate", updateVideoProgress);
      projectModalVideo.addEventListener("ended", function() {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
        videoOverlay.classList.remove("hidden");
      });
    } else {
      videoContainer.style.display = "none";
    }
    
    projectModalFunc();
  });
}

// add click event to modal close button
projectModalCloseBtn.addEventListener("click", projectModalFunc);
projectOverlay.addEventListener("click", projectModalFunc);

// Video control event listeners
videoPlayBtn.addEventListener("click", togglePlayPause);
videoVolumeBtn.addEventListener("click", toggleMute);
videoFullscreenBtn.addEventListener("click", toggleFullscreen);
videoOverlay.addEventListener("click", togglePlayPause);

// Video progress bar click
videoProgressBar.addEventListener("click", function(e) {
  const rect = videoProgressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const progressWidth = rect.width;
  const clickPercent = clickX / progressWidth;
  projectModalVideo.currentTime = clickPercent * projectModalVideo.duration;
});

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (projectModalContainer.classList.contains("active")) {
    if (e.key === "Escape") {
      projectModalFunc();
    } else if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlayPause();
    } else if (e.key === "m") {
      e.preventDefault();
      toggleMute();
    } else if (e.key === "f") {
      e.preventDefault();
      toggleFullscreen();
    }
  }
});

// Fullscreen change event
document.addEventListener("fullscreenchange", function() {
  if (!document.fullscreenElement) {
    videoContainer.classList.remove("fullscreen");
    expandIcon.style.display = "block";
    contractIcon.style.display = "none";
  }
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}