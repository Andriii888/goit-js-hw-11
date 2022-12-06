const BASE_URL = 'https://pixabay.com/api/';
const options = new URLSearchParams({
    key: '31883823-c5d59f7aa30a446f4e70a3159',
       image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 40,
});
export function fetchPosts(val) {
   return fetch(`${BASE_URL}?q=${val}&${options}`)
       .then(response => {
           if (!response.ok) {
               
       throw new Error(response.status);
           }
           return response.json()
       })
        
};