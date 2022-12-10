const lightBox = require('simplelightbox');
import "simplelightbox/dist/simple-lightbox.min.css";
import APIServis from './servis';
import Notiflix from 'notiflix';
const newAPIServis = new APIServis();



Notiflix.Notify.init({
    borderRadius: '10px',
    position: 'center-center',
     warning: {
    background: '#eebf31',
    textColor: 'black',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
});
const galleryBox = new SimpleLightbox('.gallery a', {
      scrollZoom: false,
    captionsData: "alt",
    captionDelay: 250,

});

const inputValueRef = document.querySelector('#search-form');
const galleryBoxRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


inputValueRef.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', loadMoreImg);

function onSearch(e) {
    e.preventDefault();
    clearContent();
    loadMoreBtn.disabled = false;
     const {
    elements: { searchQuery }
  } = e.currentTarget;
    newAPIServis.inpValue = searchQuery.value;
    newAPIServis.resetPage();
 
    newAPIServis.fetchPosts().then(({ data }) => {
        let totalHits = data.totalHits;
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
     newAPIServis.pageValue += 1;

        createPosts(data);
    })
        .catch((error) => {
            console.log(error);
             Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        });

};


function createPosts(val) {
    if (val.hits.length === 0) {
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
    }
    if (!val.totalHits) {
        Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
    }

    const elementPosts = val.hits.map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card post">
    <a>
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
        <p class="info-item">
            <b>Likes:${likes}</b>
        </p>
        <p class="info-item">
            <b>Views:${views}</b>
        </p>
        <p class="info-item">
            <b>Comments:${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads:${downloads}</b>
        </p>
    </div>
</div>`
    }
      
    ).join("");
    // var lightbox = $('.gallery a').simpleLightbox({ /* options */ });
    return galleryBoxRef.insertAdjacentHTML('beforeend', elementPosts);
};

function clearContent() {
    galleryBoxRef.innerHTML = '';
};


function loadMoreImg() {
    newAPIServis.fetchPosts().then(({ data }) => {
                newAPIServis.pageValue += 1;

        createPosts(data);
    })
        .catch((error) => {
            console.log(error.message);
            if (error.message = 400) {
             Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);   
            }
             Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        });
}

