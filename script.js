const welcomeSection = document.getElementById('welcome-section');
const uploadSection = document.getElementById('upload-section');
const toUploadBtn = document.getElementById('to-upload');
const toWelcomeBtn = document.getElementById('to-welcome');
const uploadInput = document.getElementById('upload');
const uploadedImageContainer = document.getElementById('uploaded-image-container');
let uploadedImgElem = null;
const uploadInput = document.getElementById('upload');
const blackhole = document.getElementById('blackhole');
const core = blackhole.querySelector('.core');

uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    core.innerHTML = `<img src="${event.target.result}" alt="Black Hole Core" />`;
  };
  reader.readAsDataURL(file);

  blackhole.classList.remove('hidden');
});

toUploadBtn.addEventListener('click', () => {
  welcomeSection.classList.add('hidden');
  uploadSection.classList.remove('hidden');
});

toWelcomeBtn.addEventListener('click', () => {
  uploadSection.classList.add('hidden');
  welcomeSection.classList.remove('hidden');
});

uploadInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(ev) {
    const imgSrc = ev.target.result;

    if (uploadedImgElem) {
      uploadedImgElem.src = imgSrc;
      uploadedImgElem.style.display = 'block';
    } else {
      uploadedImgElem = document.createElement('img');
      uploadedImgElem.id = 'uploaded-img-home';
      uploadedImgElem.src = imgSrc;
      uploadedImageContainer.appendChild(uploadedImgElem);

      uploadedImgElem.addEventListener('click', () => {
        blackhole.classList.add('active');

        const imgRect = uploadedImgElem.getBoundingClientRect();
        const holeRect = blackhole.getBoundingClientRect();

        const translateX = holeRect.left + holeRect.width / 2 - (imgRect.left + imgRect.width / 2);
        const translateY = holeRect.top + holeRect.height / 2 - (imgRect.top + imgRect.height / 2);

        uploadedImgElem.style.transformOrigin = 'center center';

        // Move image into black hole center and shrink it
        requestAnimationFrame(() => {
          uploadedImgElem.style.transform = `translate(${translateX}px, ${translateY}px) scale(0)`;
          uploadedImgElem.style.opacity = '0';
        });

        // After 1s (image moved), expand black hole to full screen
        setTimeout(() => {
          blackhole.classList.add('expand');
        }, 50);

        // After another 1s (black hole expanded), hide image and black hole
        setTimeout(() => {
          uploadedImgElem.style.display = 'none';
          blackhole.classList.remove('active', 'expand');
          uploadedImgElem.style.transform = '';
          uploadedImgElem.style.opacity = '';
        }, 2000);
      });
    }

    uploadInput.value = '';
    uploadSection.classList.add('hidden');
    welcomeSection.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});