import SearchBar from './components/SearchBar'
import Results from './components/Results'
import Title from './components/Title'
import {useEffect, useState} from 'react'
import './App.css';
import recipeService from './services/recipes'




const App = () => {
  //const [apiData, setApiData] = useState([])
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  // meals[]: {id, name, pictureURL}
  const [meals, setMeals] = useState([])
  // mealInfo: {id: {id, name, ingredients[], pictureURL, ytURL}}
  const [mealInfo, setMealInfo] = useState({undef:'init'})
  const [currFilter, setCurrFilter] = useState('default')

  const filters = {
    increasing: (a, b) => a.numIngredients - b.numIngredients,
    decreasing: (a, b) => b.numIngredients - a.numIngredients
  }

  useEffect(() => {
    let mealBuffer = meals.slice()
    setMeals((currFilter === 'default') ? mealBuffer : mealBuffer.sort(filters[currFilter]))
  }, [currFilter])

  //console.log('mealInfoOut', mealInfo)
  const searchChange = (event) => {
    setQuery(event.target.value);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // console.log('before', meals);
    // console.log('before', mealInfo)
    let mealInfoBuffer = {}
    let mealBuffer = []
    let promises = []
    recipeService
      .searchMealByIngredient(query)
      .then(res => {
        mealBuffer = (res.meals.map(meal => { 
          if (meal) return {
          id: meal.idMeal,
          name: meal.strMeal, 
          pictureURL: meal.strMealThumb
        }}));
      }).then(() => {
        mealBuffer.forEach( meal => {
          const apiCall = recipeService.searchMealByID(meal.id)
          promises.push(apiCall)
          apiCall.then(mInfo => {
              mealInfoBuffer[meal.id] = { ...mInfo }
          setTimeout(() => {}, 1000)
        })}
      )
      Promise.all(promises).then(() => {
        mealBuffer = mealBuffer.map(meal => {
          meal['numIngredients'] = mealInfoBuffer[meal.id].ingredients.length
          return meal
        })
      }).then(() => {
        setMeals((currFilter === 'default') ? mealBuffer : mealBuffer.sort(filters[currFilter])) 
        setMealInfo(mealInfoBuffer)
        // console.log('after', meals);
        // console.log('after', mealInfo)
      })})
      setHasSearched(true)
      //console.log('after', meals);
  }

  //console.log('q', query, 'm', meals)
  // mealResults: array[{name: str, pictureURL: str}]
  return (
    <div>
      <Title />
      <SearchBar 
        query={query} 
        searchChange={searchChange}
        handleSubmit={handleSearchSubmit} 
        setCurrFilter={setCurrFilter} 
      />
      <Results 
        query={query}
        meals={meals}
        mealInfo={mealInfo}
        hasSearched={hasSearched}
      />
      
    </div>
  );
}

export default App;
