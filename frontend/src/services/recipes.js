import axios from 'axios';

const baseURL = 'http://www.themealdb.com/api/json/v1/1';

const getCategories = () => {
    const req = axios.get(`${baseURL}/categories.php`);
    return req.then(res => res.data);
    //const categoryData = req.then(res => res.data);
    //return categoryData;
}

const callAPITest = (ingredient) => {
    const req = axios.get(`http://localhost:3001/api/findmeal?i=${ingredient}`);
    return req.then(res => res);
}

export default {getCategories, callAPITest};