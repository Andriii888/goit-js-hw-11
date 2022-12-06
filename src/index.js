import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchPosts } from './fetch_fn';
import Notiflix from 'notiflix';
// import card from './card.hbs';
const Handlebars = require("handlebars");
const axios = require('axios');

// axios({
//   method: 'get',
//   url: BASE_URL,
//   data: '',
// });

    
// let debounce = require('lodash.debounce');


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
const galleryBoxRef = document.querySelector('.gallery container');
const loadMoreBtn = document.querySelector('.load-more');

inputValueRef.addEventListener('submit', e => {
    e.preventDefault();
     const {
    elements: { searchQuery }
  } = e.currentTarget;
    let inputValue = searchQuery.value;
    fetchPosts(inputValue).then(seachedValue => {
                 console.log(seachedValue)
        return createPosts(seachedValue);
    })
        .catch((error) => {
            console.log(error);
             Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        });

});


function createPosts(val) { 
    const elementPosts = val.map((post) =>{
        let marcup = card(post)
    }
      
    ).join("");
    return listOfCountriesRef.insertAdjacentHTML('beforeend', elementPosts);
};

function clearContent() {
    boxForCountry.innerHTML = '';
    listOfCountriesRef.innerHTML = '';
}

