import './App.css';
import { Auth } from "./components/auth"
import { db } from "./config/firebase"
import { useState, useEffect } from "react"
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore"

function App() {
  const [movieList, setMovieList] = useState([]);
  
  // new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false)

  // update title state
  const [updatedTitle, setUpdatedTitle] = useState("")

  const moviesCollectionReference = collection(db, "movies");

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

  
  useEffect(() => {
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
  
  const deleteMovie = async (id) => {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id, ) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
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
            <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h1>
            <p>Date: {movie.releaseDate} </p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input placeholder='new title...' onChange={(e) => setUpdatedTitle(e.target.value)}/>
            <button>Update Title</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
