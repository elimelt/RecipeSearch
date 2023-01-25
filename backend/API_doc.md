# API

server baseURL
dev   http://localhost:3001/
production    https://recipe-search-wrapper-server.onrender.com/


## endpoints

### /api/findmeal-name?i={ingredient}
Returns {meals: array of meal objects}

meal objects: {
    strMeal: name, 
    strMealThumb: url of meal picture,
    idMeal: the unique id of the meal
}


### /api/findmeal-id?id={mealID}

Returns specific info for given meal: {
    id: unique id,
    name: meal name,
    ingredients: array of ingredient objects,
  pictureURL: url of meal picture,
  ytURL url of youtube video tutorial
}

ingredient object: {ingredientName: ingredientAmount} 