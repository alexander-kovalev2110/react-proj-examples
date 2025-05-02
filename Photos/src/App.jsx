import React, {useState, useEffect} from 'react';
import './index.scss';
import Collection from './Collection';

const App = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const  cats = [
    "All",
    "Sea",
    "Mountains",
    "Architecture",
    "Cities"
  ];

  // Array for debugging, since mockapi.io does not provide the number of selected records in the DB
  const pages = [[1, 2, 3, 4], [1], [1], [1, 2], [1]];    // Number of pages for each categoryId
  const limit = 2;      // Number of elements per page

  const url = `https://67c436b4c4649b9551b2f26a.mockapi.io/photos?${categoryId ? `category=${categoryId}` : ''}&page=${page}&limit=${limit}`;

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setCollections(json))
      .catch(err => {
        console.warn(err);
        alert('Getting data error');
      })
  }, [categoryId, page]);

  const shiftPhotos = (photos, index) => {      // Shift photos in array
    const newCollection = [...collections];     // Create a new array
    newCollection[index] = { 
      ...newCollection[index], 
      photos: photos.slice(1).concat(photos.slice(0, 1))   // Create a new object
    }; 
    setCollections(newCollection);     // Passing a new array to setState
  }

  return (
    <div className="App">
      <h1>My photo collection</h1>

      <div className="top">
        <ul className="tags">
          {
            cats.map((name, i) => (
            <li 
              onClick={() => {setCategoryId(i); setPage(1); setSearchValue('')} } 
              className={categoryId === i ? 'active' : ''} 
              key={i}>
                {name}
            </li>
          ))}
        </ul>
        <input 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input" 
          placeholder="Search by name" />
      </div>

      <div className="content">
        {collections
          .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj, index) => (
            <Collection name={obj.name} images={obj.photos} key={index} 
              shiftPhotos={() => shiftPhotos(obj.photos, index)} />
          ))}
      </div>

      <ul className="pagination">
        {pages[categoryId].map((p) => (
          <li className={(page === p) ? "active" : ""} onClick={() => {setPage(p); setSearchValue('')}} key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
