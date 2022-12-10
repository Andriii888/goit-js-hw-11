import axios from 'axios';

export default class APIServis {
       constructor() {
        this.inputValue = 'dog';
        this.pageValue = 1;
           this.BASE_URL = 'https://pixabay.com/api/';
           this.options = {
            key: '31883823-c5d59f7aa30a446f4e70a3159',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: 40,
        };
    }
    fetchPosts() {
        return axios.get(`${this.BASE_URL}`,
            {
             params: {
                    key: '31883823-c5d59f7aa30a446f4e70a3159',
                 q:this.inputValue,
                 page:this.pageValue,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
                per_page: 40,
            }
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
    set incrementPage(newPage) {
        this.page = newPage;  
    }




    
}

    
