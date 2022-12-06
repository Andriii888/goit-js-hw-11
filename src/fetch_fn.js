const BASE_URL = 'https://pixabay.com/api/';
const options = {
    key: '31883823-c5d59f7aa30a446f4e70a3159',
    q: `${val}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 40,
    totalHits,
};
export function fetchPost(val) {
   return fetch(`${BASE_URL}?${options}`)
       .then(response => {
           if (!response.ok) {
               
       throw new Error(response.status);
           }
           console.log(response.json());
           return response.json()
       })
        
};