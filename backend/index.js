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


app.get('/api/categories', (req, res) => {
  request(
    { url: `${baseURL}/list.php?c=list` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
})

app.get('/api/ingredients', (req, res) => {
  request(
    { url: `${baseURL}/list.php?i=list` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
})

app.get('/api/findmeal', (req, res) => {
  let iname = req.query.i || "";
  request(
    { url: `${baseURL}/filter.php?i=${iname}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
})





const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})