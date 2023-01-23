import axios from 'axios';

const searchMealByIngredient = (ingredient) => {
    const req = axios.get(`http://localhost:3001/api/findmeal-ing?i=${ingredient}`);
    return req.then(res => res.data);
}

const searchMealByID = (id) => {
    const req = axios.get(`http://localhost:3001/api/findmeal-id?id=${id}`)
    return req.then(res => res.data)
}

export default { searchMealByIngredient, searchMealByID };