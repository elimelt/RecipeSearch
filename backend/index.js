const express = require('express');
const request = require('request');
const axios = require('axios');
const app = express();
const cors = require('cors')


app.use(cors());

const baseURL = 'http://www.themealdb.com/api/json/v1/1';

app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


//http://localhost:3001/api/findmeal-name?i=<ingredient>
app.get('/api/findmeal-ing', (req, res) => {
  let iname = req.query.i || "";
  request(
    { url: `${baseURL}/filter.php?i=${iname}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error });
      }
      console.log(JSON.parse(body))
      res.json(JSON.parse(body));
    }
  )
})

const processMeal = (meal) => {
  const ing = []
  for (let i = 1; i <= 20; i++) {
    const ikey = `strIngredient${i}`
    const mkey = `strMeasure${i}` 
    //console.log('ing', meal.ikey)
    if (meal[ikey] != null && 
        meal[ikey] != "" && 
        meal[ikey] != ' ') 
    { 
      ing.push({
      [meal[ikey]]: meal[mkey]
    })}
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    ingredients: ing,
    pictureURL: meal.strMealThumb,
    ytURL: meal.strYoutube
  }
}

//http://localhost:3001/api/findmeal-id?id=<id>
app.get('/api/findmeal-id', (req, res) => {
  let mid = req.query.id || '';
  request (
    { url: `${baseURL}/lookup.php?i=${mid}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error });
      }
      const data = JSON.parse(body).meals
      if (data) res.json(processMeal(data[0]));
      else res.json({})
    }
  )
})





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})