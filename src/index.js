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
new SimpleLightbox('.photo-card a', {
      scrollZoom: false,
    captionsData: "alt",
    captionDelay: 250,

});
const inputValueRef = document.querySelector('#search-form');
const galleryBoxRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
// let elemForInfinitScrole = document.querySelector('.container');
// let infScroll = new InfiniteScroll( elemForInfinitScrole, {
//   // options
// //   path: '.pagination__next',
// //   append: '.post',
// //   history: false,
// });



inputValueRef.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', loadMoreImg);

async function onSearch(e) {
    try {
        e.preventDefault();
        clearContent();
        loadMoreBtn.disabled = false;
        const {
            elements: { searchQuery }
        } = e.currentTarget;
        newAPIServis.inpValue = searchQuery.value;
        newAPIServis.resetPage();
 
       await newAPIServis.fetchPosts().then(({ data }) => {
           let totalHits = data.totalHits;
            if (data.hits.length === 0) {
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
    }
           if (data.hits.length > 0) {
               Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
           }           
            newAPIServis.pageValue += 1;

           createPosts(data);
           createSmoothScroll();

           //////////////////////////////////////////
        
///////////////////////////////////
        })
    }
        catch (error) {
            console.log(error);
             Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        };

};


function createPosts(val) {
    const elementPosts = val.hits.map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads },index) => {
            return `<div class="photo-card post">
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
          
}
      
    ).join("");
   
    // lightbox.refresh();
    
     galleryBoxRef.insertAdjacentHTML('beforeend', elementPosts);
   return new SimpleLightbox('.photo-card a', {
      scrollZoom: false,
    captionsData: "alt",
    captionDelay: 250,

});
};

function clearContent() {
    galleryBoxRef.innerHTML = '';
};


async function loadMoreImg() {
    try {
        await newAPIServis.fetchPosts().then(({ data }) => {
            newAPIServis.pageValue += 1;

            createPosts(data);
            createSmoothScroll();
        })
    }
        catch (error)  {
            console.log(error.message);
            if (error.message = 400) {
            return Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);   
            }
             Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        };
};

function createSmoothScroll() {
   const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
           window.scrollBy({ top: cardHeight * 0.5, behavior: "smooth", });
};
/////////////////////////////////////////////////////////
// async function loadNextPage() {
//     try {
//         await newAPIServis.fetchPosts().then(({ data }) => {
//             newAPIServis.pageValue += 1;

//             createPosts(data);
//             createSmoothScroll();
//         })
//     }
//         catch (error)  {
//             console.log(error.message);
//             if (error.message = 400) {
//             return Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);   
//             }
//              Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
//         };
// };
// infScroll.loadNextPage();
