import React, { useState, useEffect } from 'react';
import Recipe from './recipe';

const App = () => {
  const APP_ID = "6d6687a7"
  const APP_KEY = "276a106691ab94fd9dec2d5082fe0965";
  const [name, setName] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("beef");

  const handleSubmit = (e)=>{
    e.preventDefault();
    setQuery(name);
  }

  const fetchRecipes = async () => {
    const response = await fetch      
    (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);

    const data = await response.json();
    setRecipes(data.hits);
  };

  useEffect(() => {
    fetchRecipes();
  }, [query])



  return (
    <main className='recipeContainer'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter detail" />
        <button className="btn-search" type="submit">Search</button>
      </form>

      <section className='section'>
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </section>

    </main>
  )
}

export default App;
