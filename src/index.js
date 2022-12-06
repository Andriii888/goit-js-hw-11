import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const axios = require('axios');

axios({
  method: 'post',
  url: BASE_URL,
  data: '',
});

    
// let debounce = require('lodash.debounce');
import { fetchPost } from './fetch_fn';
import Notiflix from 'notiflix';

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

const DEBOUNCE_DELAY = 300;
const inputCountryRef = document.querySelector('#search-box');
const listOfCountriesRef = document.querySelector('.country-list');
const boxForCountry = document.querySelector('.country-info');

inputCountryRef.addEventListener('submit',debounce(e => {
    let name = e.target.value;
        fetchCountries(name).then(countryInf => {
            if (countryInf.length > 10) {
                clearContent();
                return Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
            };
            if (countryInf.length >= 2 && countryInf.length <= 10) {
                boxForCountry.innerHTML = '';

               return createListForCountries(countryInf);
            };
           
            if (countryInf.length = 1) {
                clearContent();
                return createCountry(countryInf);
            };
            if (!countryInf.length) {
                clearContent();
            };

        })
        .catch((error) => {
            console.log(error);
             Notiflix.Notify.failure('Oops, there is no country with that name');
        });

}, DEBOUNCE_DELAY));

function createCountry(val) { 
return boxForCountry.insertAdjacentHTML('afterbegin',
                     `<div class ="countryFlagBox">
                <img class = "imgFlagOfCountry" src="${val[0].flag}" alt="flag of ${val[0].name}" />
                 <h2 class = "titleOfCountry">${val[0].name}</h2>
                 </div>
                    <ul class = "countryList">
                      <li><p><span class = "nameOfList">Capital:</span>${val[0].capital}</p></li>
                      <li><p><span class = "nameOfList">Population:</span>${val[0].population}</p></li>
                      <li><p><span class = "nameOfList">Langueges:</span>${val[0].languages[0].name}</p></li>
                    </ul>`);
};

function createListForCountries(val) { 
 const elementCountries = val.map((country) =>
    `<li>
    <div class ="countryFlagBox">
    <img class = "imgFlagOfCountry" src="${country.flag}" alt="flag of ${country.name}">
    <p>${country.name}</p>
    </div>
    </li>`).join("");
    return listOfCountriesRef.insertAdjacentHTML('afterbegin', elementCountries);
};

function clearContent() {
    boxForCountry.innerHTML = '';
    listOfCountriesRef.innerHTML = '';
}

