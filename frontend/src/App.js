import SearchBar from './components/SearchBar'
import Results from './components/Results'
import Title from './components/Title'
import {useEffect, useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import recipeService from './services/recipes'




const App = () => {
  // State variables
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [meals, setMeals] = useState([])
  const [mealInfo, setMealInfo] = useState({undef:'init'})
  const [currFilter, setCurrFilter] = useState('default')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);

  // Sorting functions for different filters
  const filters = {
    default: (a, b) => (a.name > b.name) ? 1: -1,
    increasing: (a, b) => a.numIngredients - b.numIngredients,
    decreasing: (a, b) => b.numIngredients - a.numIngredients
  }

  // UseEffect to re-sort meals when the current filter changes
  useEffect(() => {
    let mealBuffer = meals.slice()
    console.log('filtering', currFilter)
    setMeals(mealBuffer.sort(filters[currFilter]))
  }, [currFilter])

  // Handle changes to the search input
  const searchChange = (event) => {
    setQuery(event.target.value);
  }

   
  //async function that is called when the user submits the search form. 
   const handleSearchSubmit = async (event) => {
    setError(false)
    setHasSearched(true);
    setLoading(true)
    event.preventDefault();
    try {
        const res = await recipeService.searchMealByIngredient(query);
        const mealBuffer = res.meals.map(meal => ({
          id: meal.idMeal,
          name: meal.strMeal, 
          pictureURL: meal.strMealThumb
        }));
        let mealInfoBuffer = {}
        const mealInfoPromises = mealBuffer.map(async meal => {
            const mInfo = await recipeService.searchMealByID(meal.id);
            mealInfoBuffer[meal.id] = { ...mInfo }
        });
        await Promise.all(mealInfoPromises);
        setMealInfo(mealInfoBuffer);
        setMeals(filterMeals(
          mealBuffer, 
          mealInfoBuffer, 
          currFilter, 
          filters
        ));
        setLoading(false)
    } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false)
    }
}
console.log(currFilter)

// returns filtered meals with numIngredients added 
const filterMeals = (meals, mealInfoBuffer, currentFilter, sortFunctions) => {
  const countIngredients = meal => 
    mealInfoBuffer[meal.id].ingredients.length
    
  meals.forEach(meal => {
    meal['numIngredients'] = countIngredients(meal)
  });
  return meals.sort(sortFunctions[currentFilter]);
}

  

  return (
    <div className="app-container">
      <div className="title-search-container">
        <Title className="title"/>
        <SearchBar 
          className="search-bar"
          query={query} 
          searchChange={searchChange}
          handleSubmit={handleSearchSubmit} 
          setCurrFilter={setCurrFilter} 
        />
      </div>
      <div className="result-container">
        {loading ? 
        <div className="loading-text text-center">Loading...</div> 
        : 
        <Results 
          className="results"
          query={query}
          meals={meals}
          mealInfo={mealInfo}
          hasSearched={hasSearched}
          error={error}
        />}
      </div>
      
    </div>
  );
}

export default App;
