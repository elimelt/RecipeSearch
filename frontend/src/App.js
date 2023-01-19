import SearchBar from './components/SearchBar'
import Results from './components/Results'
import {useEffect, useState} from 'react'
import './App.css';
import recipeService from './services/recipes'

function App() {
  const [apiData, setApiData] = useState([])

  useEffect(() => {
    recipeService
      .callAPITest('chicken breast')
      .then(res => {
        setApiData(res.data)
        console.log('data', res.data);
      })
  }, [])

  return (
    <div>
      <SearchBar></SearchBar>
      <Results></Results>
      
    </div>
  );
}

export default App;
