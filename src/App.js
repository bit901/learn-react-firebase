import './App.css';
import { Auth } from "./components/auth"
import { db } from "./config/firebase"
import { useState, useEffect } from "react"
import { getDocs, collection, addDoc } from "firebase/firestore"

function App() {
  const [movieList, setMovieList] = useState([]);
  
  // new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false)

  const moviesCollectionReference = collection(db, "movies");

  
  useEffect(() => {
    const getMovieList = async () => {
      // read data

      // set movie list
      try {
        const data = await getDocs(moviesCollectionReference);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        console.log(filteredData)
        setMovieList(filteredData)
      } catch (err) {
        console.error(err);
      }

    };
    getMovieList();
    
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionReference, {
      title: newMovieTitle,
      releaseDate: newReleaseDate,
      receivedAnOscar: isNewMovieOscar,
    });
  } catch(err) {
      console.error(err)
  }
  };
  

  return (
    <div className="App">
      <Auth />

      <div>
        <input placeholder='Movie title...' onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input placeholder='Release Date...' type='number' onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>
        <input type='checkbox' onChange={(e) => setisNewMovieOscar(e.target.value)}/>
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>


      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1>{movie.title}</h1>
            <p>Date: {movie.releaseDate} </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
