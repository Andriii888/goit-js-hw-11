import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const options = {
    key: '31883823-c5d59f7aa30a446f4e70a3159',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 40,
    };
