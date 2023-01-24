import axios from 'axios';

const baseURL = 'https://recipe-search-wrapper-server.onrender.com';


const searchMealByIngredient = (ingredient) => {
    const req = axios.get(`${baseURL}/api/findmeal-ing?i=${ingredient}`);
    return req.then(res => res.data);
}

const searchMealByID = (id) => {
    const req = axios.get(`${baseURL}/api/findmeal-id?id=${id}`)
    return req.then(res => res.data)
}


export default { searchMealByIngredient, searchMealByID };