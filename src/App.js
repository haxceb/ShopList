import React, { useState } from 'react'
import UrlPage from './Components/UrlPage';
import Categories from './Components/Categories';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [url, setUrl] = useState(false);
  return (
    <div className="App">
      {
        url ? <UrlPage selectedCategory={selectedCategory} setUrl={setUrl} setSelectedCategory={setSelectedCategory} /> : <Categories selectedCategory={selectedCategory} setUrl={setUrl} setSelectedCategory={setSelectedCategory} />
      }
    </div>
  );
}

export default App;
