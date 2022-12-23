const lightBox = require('simplelightbox');
import "simplelightbox/dist/simple-lightbox.min.css";
import APIServis from './servis';
import Notiflix from 'notiflix';
import { entries } from "lodash";
const newAPIServis = new APIServis();
let throttleForScrole = require('lodash');


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

const inputValueRef = document.querySelector('#search-form');
const galleryBoxRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


inputValueRef.addEventListener('submit', onSearch);
// loadMoreBtn.addEventListener('click', loadMoreImg);
///////////////////////////////////////////////////
let options = {
    // root: document.querySelector('body'),
    threshold: 1,
    rootMargin: "100px",
};
function observerLastCardCallback(entries) {
    const lastCard = entries[0];
    console.log(lastCard.isIntersecting);
    if (!lastCard.isIntersecting) return 
    loadMoreImg();
    console.log(document.querySelector('.photo-card:last-child'));
    observerLastCard.unobserve(lastCard.target);
    
     observerLastCard.observe(document.querySelector('.photo-card:last-child'));
     console.log(document.querySelector('.photo-card:last-child'));

 

};
let observerLastCard = new IntersectionObserver(_.throttle(observerLastCardCallback,2000), options);


/////////////////////////////////////////////////////
async function onSearch(e) {
    try {
        e.preventDefault();
        clearContent();
                const {
            elements: { searchQuery }
        } = e.currentTarget;
        newAPIServis.inpValue = searchQuery.value;
        newAPIServis.resetPage();
 
        await newAPIServis.fetchPosts().then(({ data }) => {
             let totalHits = data.totalHits;
            // if (totalHits > 40) {
            //     loadMoreBtn.classList.toggle('opacity');
            // }

          
            if (data.hits.length === 0) {
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
    }
           if (data.hits.length > 0) {
               Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
           }           
            newAPIServis.pageValue += 1;

           createPosts(data);
            createSmoothScroll();
            ///////////////////////////////////
             observerLastCard.observe(document.querySelector('.photo-card:last-child'));
            ////////////////////////////////////

        })
    }
        catch (error) {
            console.log(error);
             Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        };

};

////////////////////////////////////////////////////////////////////////
function createPosts(val) {
    const elementPosts = val.hits.map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads },index) => {
            return `<div class="photo-card">
            <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
        <p class="info-item">
            <b>Likes:</br>
            ${likes}</b>
        </p>
        <p class="info-item">
            <b>Views:</br>
            ${views}</b>
        </p>
        <p class="info-item">
            <b>Comments:</br>
            ${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads:</br>
            ${downloads}</b>
        </p>
    </div>
</div>`
          
}).join("");
   
    galleryBoxRef.insertAdjacentHTML('beforeend', elementPosts);
   return new SimpleLightbox('.photo-card a', {
      scrollZoom: false,
    captionsData: "alt",
    captionDelay: 250,

}).refresh();
};
//////////////////////////////////////////////////
function clearContent() {
    galleryBoxRef.innerHTML = '';
};

/////////////////////////////////////////////
async function loadMoreImg() {
    try {
        await newAPIServis.fetchPosts().then(({ data }) => {
            newAPIServis.pageValue += 1;
            createPosts(data);
            createSmoothScroll();
             const endOfImg = data.totalHits / 40;
            if (newAPIServis.pageValue > endOfImg) {
               loadMoreBtn.classList.toggle('opacity');
                return Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
            } 
        })
    }
        catch (error)  {
            console.log(error.message);
        if (error.message = 400) {
                loadMoreBtn.disabled = true;
            return Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);   
            }
             Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        };
};
//////////////////////////////////////////////////////////
function createSmoothScroll() {
   const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
           window.scrollBy({ top: cardHeight * 1, behavior: "smooth", });
};
/////////////////////////////////////////////////////////
