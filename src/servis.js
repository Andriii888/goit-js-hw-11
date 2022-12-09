export default class APIServis {
    constructor() {
        this.inputValue = '';
        this.pageValue = 1;
        this.BASE_URL = 'https://pixabay.com/api/';

    }
    fetchPosts() {
        console.log(this);
        const options = new URLSearchParams({
            key: '31883823-c5d59f7aa30a446f4e70a3159',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: 40,
        });
        return fetch(`${this.BASE_URL}?q=${this.inputValue}&page=${this.pageValue}&${options}`)
            .then(response => {
                if (!response.ok) {
               
                    throw new Error(response.status);
                }
                return response.json()
            }).then(seachedValue => {
       this.pageValue += 1;
   
                return seachedValue;
    })
    }
    resetPage() {
        this.pageValue = 1;
    }
    get inpValue() {
        return this.inputValue;
    }

    set inpValue(newInputValue) {
        this.inputValue = newInputValue;
    }
    get page() {
        return this.page;
    }
    set page(newPage) {
        this.page = newPage;  
    }












}

    
