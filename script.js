const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let readyToLoadMoreImages = false;
let imageLoadedCounter = 0;
let totalImages = 0;
let initialLoad = true;

let photo_limit = 5;
const API_KEY = "Ffm8NOw-GNlQi0ihFkpnHgXaMmCkTw6Ss1nkmQbkOnk";
let UNSPLASH_API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${photo_limit}`;

function imageLoader() {
  imageLoadedCounter++;
  if (imageLoadedCounter === totalImages) {
    loader.hidden = true;
    imageLoadedCounter = 0;
    readyToLoadMoreImages = true;
    initialLoad = false;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const image = document.createElement("img");
    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    image.addEventListener("load", imageLoader);
    // Put <img> inside <>, then put both inside image-container
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  if (!initialLoad) {
    photo_limit = 30;
  }
  try {
    const response = await fetch(UNSPLASH_API_URL);
    const data = await response.json();
    data.forEach((element) => {
      photosArray.push(element);
    });
    displayPhotos();
  } catch (error) {}
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyToLoadMoreImages
  ) {
    readyToLoadMoreImages = false;
    getPhotos();
  }
});

getPhotos();
