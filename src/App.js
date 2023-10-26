import './App.css';
import { Auth } from "./components/auth"
import { db } from "./config/firebase"
import { useState, useEffect } from "react"
import { getDocs, collection } from "firebase/firestore"

function App() {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionReference = collection(db, "movies");

  
  useEffect(() => {
    const getMovieList = async () => {
      // read data

      // set movie list
      try {
        const data = await getDocs(moviesCollectionReference);
      } catch (err) {
        console.error(err);
      }

    }}, [])
  

  return (
    <div className="App">
      <Auth />

    </div>
  );
}

export default App;
